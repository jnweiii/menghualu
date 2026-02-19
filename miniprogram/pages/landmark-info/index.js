// pages/landmark-info/index.js
// 统一维护云环境 ID，避免路径和环境配置不一致
const CLOUD_ENV_ID = 'cloud1-8gv020gg3bbd30af.636c-cloud1-8gv020gg3bbd30af-1398617426';
// 本地占位图：云文件无权限或不存在时统一回退，避免白屏
const LOCAL_PLACEHOLDER_IMAGE = '/images/landmark-placeholder.svg';
// 地标业务云函数（按模块独立）
const LANDMARK_SERVICE_FUNCTION = 'landmarkInfoService';
// 兼容不同命名风格的集合名，按顺序尝试
const LANDMARK_COLLECTION_CANDIDATES = ['landmark_info', 'landmarkInfo', 'landmark-info'];
// 云函数调用必须使用“短环境 ID”，避免 INVALID_ENV
const CLOUD_FUNCTION_ENV = CLOUD_ENV_ID.includes('.') ? CLOUD_ENV_ID.split('.')[0] : CLOUD_ENV_ID;

Page({
  data: {
    landmarkName: '加载中...',
    landmarkType: '',
    imgUrls: [],
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.6)',
    indicatorActiveColor: '#ffffff',
    autoplay: true,
    interval: 4000,
    duration: 500,
    currentImageIndex: 0,
    coordinateData: {
      x: '',
      y: '',
      location: ''
    },
    introData: '',
    literatureData: [],
    officialInfoData: [],
    speculativeBasisData: '',
    scrollPercent: 0,
    isDragging: false,
    dragStartY: 0,
    dragStartPercent: 0,
    containerHeight: 0,
    contentHeight: 0,
    scrollTop: 0
  },

  onLoad(options) {
    console.log('详情页参数:', options);

    if (options && options.name) {
      const name = decodeURIComponent(options.name);
      this.loadLandmarkData(name);
    } else {
      this.setDefaultData();
    }

    setTimeout(() => {
      this.calculateHeights();
    }, 500);
  },

  // 统一将 cloud fileID 规范化到当前云环境，并兼容历史路径
  normalizeCloudFileId(fileId) {
    if (!fileId || typeof fileId !== 'string') return '';
    if (!fileId.startsWith('cloud://')) return fileId;

    let normalizedFileId = fileId.replace(/^cloud:\/\/[^/]+\//, `cloud://${CLOUD_ENV_ID}/`);
    const isLegacyThirdLevelPath = normalizedFileId.includes('/images/third-level/');
    const isLegacyImagesPath = normalizedFileId.includes('/images/');
    if (isLegacyThirdLevelPath || isLegacyImagesPath) {
      const fileName = normalizedFileId.split('/').pop() || '';
      if (fileName === 'placeholder.jpg' || fileName === 'placeholder.png') {
        return `cloud://${CLOUD_ENV_ID}/landmark-images/${fileName}`;
      }
      const folderName = fileName.replace(/\d+\.[^.]+$/, '').replace(/\.[^.]+$/, '');
      if (folderName) {
        normalizedFileId = `cloud://${CLOUD_ENV_ID}/landmark-images/${folderName}/${fileName}`;
      }
    }

    return normalizedFileId;
  },

  // 校验链接是否可直接给 image 组件使用
  isUsableImageUrl(url) {
    return typeof url === 'string' && /^https?:\/\//.test(url);
  },

  // 客户端直接获取临时链接（有权限时最快）
  fetchCloudTempFileUrls(fileList = []) {
    return new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList,
        success: (res) => resolve(res),
        fail: (error) => reject(error)
      });
    });
  },

  // 客户端无权限时，通过地标模块云函数获取管理员态临时链接
  fetchCloudTempFileUrlsByFunction(fileList = []) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: LANDMARK_SERVICE_FUNCTION,
        config: {
          env: CLOUD_FUNCTION_ENV
        },
        data: {
          action: 'getTempFileURLByAdmin',
          fileList
        },
        success: (res) => {
          const result = res && res.result ? res.result : {};
          if (!result.success) {
            reject(new Error(result.errMsg || 'landmarkInfoService getTempFileURLByAdmin failed'));
            return;
          }
          resolve({
            fileList: Array.isArray(result.fileList) ? result.fileList : []
          });
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },

  // 将 cloud:// 文件 ID 转换为临时可访问链接
  async resolveImageUrls(rawImageList = []) {
    const normalizedImageList = (rawImageList || [])
      .map((imagePath) => this.normalizeCloudFileId(imagePath))
      .filter(Boolean);

    if (!normalizedImageList.length) return [LOCAL_PLACEHOLDER_IMAGE];

    const cloudFileIds = normalizedImageList.filter((imagePath) => imagePath.startsWith('cloud://'));
    if (!cloudFileIds.length) {
      const safeImageList = normalizedImageList.map((imagePath) => {
        if (this.isUsableImageUrl(imagePath) || imagePath.startsWith('/')) return imagePath;
        return LOCAL_PLACEHOLDER_IMAGE;
      });
      return safeImageList.length ? safeImageList : [LOCAL_PLACEHOLDER_IMAGE];
    }

    const tempUrlMap = {};
    const failedCloudFileList = [];

    try {
      const { fileList = [] } = await this.fetchCloudTempFileUrls(cloudFileIds);
      fileList.forEach((item) => {
        if (!item || !item.fileID) return;
        const hasUsableTempUrl = this.isUsableImageUrl(item.tempFileURL);
        tempUrlMap[item.fileID] = hasUsableTempUrl ? item.tempFileURL : '';
        if (!hasUsableTempUrl) {
          failedCloudFileList.push({
            fileID: item.fileID,
            status: item.status,
            errMsg: item.errMsg || ''
          });
        }
      });
    } catch (error) {
      cloudFileIds.forEach((fileID) => failedCloudFileList.push({ fileID, status: -1, errMsg: String(error) }));
    }

    if (failedCloudFileList.length) {
      try {
        const retryFileIds = failedCloudFileList.map((item) => item.fileID).filter(Boolean);
        const retryResult = await this.fetchCloudTempFileUrlsByFunction(retryFileIds);
        retryResult.fileList.forEach((item) => {
          if (item && item.fileID && this.isUsableImageUrl(item.tempFileURL)) {
            tempUrlMap[item.fileID] = item.tempFileURL;
          }
        });
      } catch (retryError) {
        console.warn('云函数获取临时链接失败，使用本地占位图兜底:', retryError);
      }
    }

    const resolvedImageList = normalizedImageList.map((imagePath) => {
      if (!imagePath.startsWith('cloud://')) {
        return this.isUsableImageUrl(imagePath) || imagePath.startsWith('/')
          ? imagePath
          : LOCAL_PLACEHOLDER_IMAGE;
      }
      return tempUrlMap[imagePath] || LOCAL_PLACEHOLDER_IMAGE;
    });

    return resolvedImageList.length ? resolvedImageList : [LOCAL_PLACEHOLDER_IMAGE];
  },

  // 通过地标模块云函数按名称读取数据库记录
  fetchLandmarkFromDatabase(name) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: LANDMARK_SERVICE_FUNCTION,
        config: {
          env: CLOUD_FUNCTION_ENV
        },
        data: {
          action: 'getLandmarkByName',
          name,
          collectionCandidates: LANDMARK_COLLECTION_CANDIDATES
        },
        success: (res) => {
          const result = res && res.result ? res.result : {};
          if (!result.success) {
            reject(new Error(result.errMsg || 'landmarkInfoService getLandmarkByName failed'));
            return;
          }
          resolve(result);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },

  // 加载地标数据：完全依赖数据库记录，不再使用前端内嵌大对象
  async loadLandmarkData(name) {
    try {
      const queryResult = await this.fetchLandmarkFromDatabase(name);
      const detail = queryResult && queryResult.data ? queryResult.data : null;
      if (!detail) {
        console.warn('数据库未命中地标记录，回退默认数据:', {
          name,
          triedCollections: queryResult && queryResult.triedCollections ? queryResult.triedCollections : []
        });
        await this.setDefaultData(name);
        return;
      }

      const isThirdLevel = detail.type === '主题景区' || detail.type === '文博场馆' ||
        detail.type === '历史街区' || detail.type === '现代地标' ||
        detail.type === '体验服务';

      const rawImages = Array.isArray(detail.images) && detail.images.length
        ? detail.images
        : [`cloud://${CLOUD_ENV_ID}/landmark-images/placeholder.jpg`];
      const resolvedImageUrls = await this.resolveImageUrls(rawImages);

      this.setData({
        landmarkName: detail.name || name,
        landmarkType: detail.type || '遗址/考古点类',
        imgUrls: resolvedImageUrls,
        coordinateData: detail.coordinate || { x: '', y: '', location: '' },
        introData: detail.intro || '',
        literatureData: isThirdLevel ? [] : (detail.literature || []),
        officialInfoData: isThirdLevel ? (detail.officialInfo || []) : [],
        speculativeBasisData: detail.speculativeBasisData || ''
      });
    } catch (error) {
      console.error('加载数据库地标数据失败:', error);
      wx.showToast({
        title: '地标数据加载失败',
        icon: 'none',
        duration: 1800
      });
      await this.setDefaultData(name);
    }
  },

  // 默认兜底数据（数据库无记录或请求失败）
  async setDefaultData(targetName = '未指定遗址') {
    const defaultImages = [`cloud://${CLOUD_ENV_ID}/landmark-images/placeholder.jpg`];
    const resolvedDefaultImageUrls = await this.resolveImageUrls(defaultImages);

    this.setData({
      landmarkName: targetName,
      landmarkType: '遗址/考古点类',
      imgUrls: resolvedDefaultImageUrls,
      coordinateData: {
        x: '114.350844°',
        y: '34.790644°',
        location: '开封市区'
      },
      introData: '该遗址的详细资料正在整理中，更多信息敬请期待。',
      literatureData: ['相关资料整理中...'],
      officialInfoData: [],
      speculativeBasisData: ''
    });
  },

  calculateHeights() {
    const query = wx.createSelectorQuery();
    query.select('.content-container').boundingClientRect();
    query.selectViewport().scrollOffset();

    query.exec((res) => {
      if (!res[0]) return;
      const systemInfo = wx.getSystemInfoSync();
      const windowHeight = systemInfo.windowHeight;
      const containerHeight = windowHeight - 600;
      const contentHeight = res[0].height;

      this.setData({
        containerHeight,
        contentHeight
      });
    });
  },

  swiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },

  onPageScroll(e) {
    if (this.data.isDragging) return;

    const scrollTop = e.detail.scrollTop;
    const containerHeight = this.data.containerHeight;
    const contentHeight = this.data.contentHeight;

    if (contentHeight > containerHeight) {
      const maxScroll = contentHeight - containerHeight;
      const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      this.setData({
        scrollPercent: percent,
        scrollTop
      });
    }
  },

  onScrollBarTouchStart(e) {
    this.setData({
      isDragging: true,
      dragStartY: e.touches[0].clientY,
      dragStartPercent: this.data.scrollPercent
    });
  },

  onScrollBarTouchMove(e) {
    if (!this.data.isDragging) return;

    const deltaY = e.touches[0].clientY - this.data.dragStartY;
    const containerHeight = this.data.containerHeight;
    const deltaPercent = (deltaY / containerHeight) * 100;
    let newPercent = this.data.dragStartPercent + deltaPercent;
    newPercent = Math.max(0, Math.min(newPercent, 100));

    const contentHeight = this.data.contentHeight;
    if (contentHeight > this.data.containerHeight) {
      const maxScroll = contentHeight - this.data.containerHeight;
      const scrollTop = (newPercent / 100) * maxScroll;
      this.setData({
        scrollPercent: newPercent,
        scrollTop
      });
    }
  },

  onScrollBarTouchEnd() {
    this.setData({
      isDragging: false,
      dragStartY: 0,
      dragStartPercent: 0
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: `${this.data.landmarkName} - 开封历史遗址`,
      path: `/pages/landmark-info/index?name=${encodeURIComponent(this.data.landmarkName)}`,
      imageUrl: this.data.imgUrls[0] || ''
    };
  }
});
