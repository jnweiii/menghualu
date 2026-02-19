const cloud = require('wx-server-sdk');
const https = require('https');
const { URL } = require('url');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 允许的路线模式，和腾讯 Direction API 保持一致。
 */
const SUPPORTED_ROUTE_MODES = new Set(['driving', 'walking', 'bicycling', 'transit']);

/**
 * 默认策略：你要求“最短路线”优先，驾车模式走 LEAST_TIME。
 */
const DEFAULT_POLICY_BY_MODE = {
  driving: 'LEAST_TIME',
  walking: '',
  bicycling: '',
  transit: 'LEAST_TIME'
};

/**
 * 腾讯位置服务基础地址。
 */
const DIRECTION_BASE_URL = 'https://apis.map.qq.com/ws/direction/v1';

/**
 * 云函数入口。
 */
exports.main = async (event = {}) => {
  const action = typeof event.action === 'string' ? event.action : '';

  switch (action) {
    case 'getRouteByWaypoints':
      return getRouteByWaypoints(event);
    default:
      return {
        success: false,
        errMsg: `unsupported action: ${action}`
      };
  }
};

/**
 * 主业务：将多个景点点位转为真实导航路径。
 *
 * 说明：
 * - points 至少 2 个。
 * - 为保证不同 mode 的兼容性（尤其 transit），这里统一按“相邻点分段请求”再拼接。
 * - 每段失败不会直接中断，最终会降级为直线片段，保证前端永远有可画的路线。
 */
async function getRouteByWaypoints(event = {}) {
  const mode = normalizeMode(event.mode);
  const policy = normalizePolicy(mode, event.policy);
  const points = normalizePoints(event.points);

  if (!SUPPORTED_ROUTE_MODES.has(mode)) {
    return {
      success: false,
      errMsg: `unsupported mode: ${mode}`
    };
  }

  if (points.length < 2) {
    return {
      success: false,
      errMsg: 'points must contain at least 2 coordinates'
    };
  }

  const apiKey = getTencentMapKey();
  if (!apiKey) {
    return {
      success: false,
      errMsg: 'missing Tencent map key, please set TENCENT_MAP_KEY in cloud function environment'
    };
  }

  let totalDistance = 0;
  let totalDuration = 0;
  let failedSegmentCount = 0;
  const mergedPolylinePoints = [];

  for (let index = 0; index < points.length - 1; index += 1) {
    const from = points[index];
    const to = points[index + 1];

    try {
      const segmentRoute = await fetchDirectionSegment({
        mode,
        policy,
        from,
        to,
        apiKey
      });

      totalDistance += segmentRoute.distance;
      totalDuration += segmentRoute.duration;
      mergePolylinePoints(mergedPolylinePoints, segmentRoute.polylinePoints);
    } catch (error) {
      failedSegmentCount += 1;
      totalDistance += estimateDirectDistanceByDegree(from, to);
      mergePolylinePoints(mergedPolylinePoints, [from, to]);
    }
  }

  return {
    success: true,
    mode,
    policy,
    distance: Math.round(totalDistance),
    duration: Math.round(totalDuration),
    polylinePoints: mergedPolylinePoints,
    failedSegmentCount
  };
}

/**
 * 调用腾讯 Direction API 获取单段导航结果。
 */
async function fetchDirectionSegment({ mode, policy, from, to, apiKey }) {
  const requestUrl = buildDirectionUrl({ mode, policy, from, to, apiKey });
  const response = await requestJsonByHttps(requestUrl);

  if (!response || response.status !== 0 || !response.result || !Array.isArray(response.result.routes) || !response.result.routes.length) {
    const status = response && typeof response.status !== 'undefined' ? response.status : 'unknown';
    const message = response && response.message ? response.message : 'unknown error';
    throw new Error(`direction api failed status=${status} message=${message}`);
  }

  const route = response.result.routes[0];
  const distance = Number(route.distance || 0);
  const duration = Number(route.duration || 0);
  const polylinePoints = extractPolylinePointsByMode(mode, route);

  if (!polylinePoints.length) {
    throw new Error('empty polyline from direction api');
  }

  return {
    distance,
    duration,
    polylinePoints
  };
}

/**
 * 构造 Direction API 请求 URL。
 */
function buildDirectionUrl({ mode, policy, from, to, apiKey }) {
  const url = new URL(`${DIRECTION_BASE_URL}/${mode}/`);
  url.searchParams.set('from', `${from.latitude},${from.longitude}`);
  url.searchParams.set('to', `${to.latitude},${to.longitude}`);
  url.searchParams.set('output', 'json');
  url.searchParams.set('key', apiKey);

  if (policy) {
    url.searchParams.set('policy', policy);
  }

  return url.toString();
}

/**
 * 发起 HTTPS GET 并解析 JSON。
 */
function requestJsonByHttps(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`http status ${response.statusCode}`));
          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error(`invalid json response: ${error.message}`));
        }
      });
    });

    request.setTimeout(10000, () => {
      request.destroy(new Error('direction api request timeout'));
    });

    request.on('error', reject);
  });
}

/**
 * 根据 mode 解析路线点串。
 *
 * - driving / walking / bicycling：优先读取 route.polyline。
 * - transit：通常是 steps 内分段 polyline，逐段解压并拼接。
 */
function extractPolylinePointsByMode(mode, route) {
  if (Array.isArray(route.polyline) && route.polyline.length >= 2) {
    return decodeTencentPolyline(route.polyline);
  }

  if (mode !== 'transit' || !Array.isArray(route.steps)) {
    return [];
  }

  const points = [];
  route.steps.forEach((step) => {
    if (!step || typeof step !== 'object') {
      return;
    }

    if (step.mode === 'WALKING' && Array.isArray(step.polyline) && step.polyline.length >= 2) {
      mergePolylinePoints(points, decodeTencentPolyline(step.polyline));
      return;
    }

    if (step.mode === 'TRANSIT' && Array.isArray(step.lines) && step.lines.length) {
      const firstLine = step.lines[0];
      if (firstLine && Array.isArray(firstLine.polyline) && firstLine.polyline.length >= 2) {
        mergePolylinePoints(points, decodeTencentPolyline(firstLine.polyline));
      }
    }
  });

  return points;
}

/**
 * 腾讯 polyline 解压：
 * 从第 3 个数字开始，按“前向差分 + 1e6”还原坐标。
 */
function decodeTencentPolyline(rawPolyline) {
  const coordinates = rawPolyline.map((value) => Number(value));
  const DIVISOR = 1000000;

  for (let index = 2; index < coordinates.length; index += 1) {
    coordinates[index] = coordinates[index - 2] + coordinates[index] / DIVISOR;
  }

  const points = [];
  for (let index = 0; index < coordinates.length; index += 2) {
    const latitude = coordinates[index];
    const longitude = coordinates[index + 1];
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      points.push({ latitude, longitude });
    }
  }

  return points;
}

/**
 * 将片段点串合并进总点串，并避免重复点。
 */
function mergePolylinePoints(targetPoints, incomingPoints) {
  if (!Array.isArray(incomingPoints) || !incomingPoints.length) {
    return;
  }

  incomingPoints.forEach((point, index) => {
    if (!isValidLatLng(point)) {
      return;
    }

    if (!targetPoints.length) {
      targetPoints.push(point);
      return;
    }

    const lastPoint = targetPoints[targetPoints.length - 1];
    const isSamePoint = Math.abs(lastPoint.latitude - point.latitude) < 1e-8
      && Math.abs(lastPoint.longitude - point.longitude) < 1e-8;

    if (!isSamePoint) {
      targetPoints.push(point);
      return;
    }

    // 只有当 incoming 不是首点且重复时才跳过；这样能保证线段衔接不产生锯齿断点。
    if (index > 0) {
      return;
    }
  });
}

/**
 * 点位清洗：只保留合法经纬度并转换为 number。
 */
function normalizePoints(points) {
  if (!Array.isArray(points)) return [];

  return points
    .map((point) => ({
      latitude: Number(point && point.latitude),
      longitude: Number(point && point.longitude)
    }))
    .filter(isValidLatLng);
}

function isValidLatLng(point) {
  if (!point) return false;
  const { latitude, longitude } = point;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

function normalizeMode(mode) {
  if (typeof mode !== 'string') return 'driving';
  const cleaned = mode.trim().toLowerCase();
  return SUPPORTED_ROUTE_MODES.has(cleaned) ? cleaned : 'driving';
}

function normalizePolicy(mode, policy) {
  if (typeof policy === 'string' && policy.trim()) {
    return policy.trim();
  }
  return DEFAULT_POLICY_BY_MODE[mode] || '';
}

function getTencentMapKey() {
  return process.env.TENCENT_MAP_KEY || process.env.QQ_MAP_KEY || process.env.MAP_KEY || '';
}

/**
 * 兜底估算：当 API 失败时，用经纬度直线近似米数（粗略）。
 */
function estimateDirectDistanceByDegree(from, to) {
  const LAT_FACTOR = 111320;
  const midLatitude = ((from.latitude + to.latitude) / 2) * Math.PI / 180;
  const LNG_FACTOR = Math.cos(midLatitude) * LAT_FACTOR;

  const deltaLat = (to.latitude - from.latitude) * LAT_FACTOR;
  const deltaLng = (to.longitude - from.longitude) * LNG_FACTOR;

  return Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
}
