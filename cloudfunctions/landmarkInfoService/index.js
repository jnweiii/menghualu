const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

async function getLandmarkByName(event) {
  const targetName = event && event.name ? String(event.name).trim() : '';
  const collectionCandidates = Array.isArray(event && event.collectionCandidates)
    ? event.collectionCandidates.filter((item) => typeof item === 'string' && item.trim())
    : ['landmark_info', 'landmarkInfo', 'landmark-info'];

  if (!targetName) {
    return {
      success: false,
      errMsg: 'name is required'
    };
  }

  const triedCollections = [];
  for (let i = 0; i < collectionCandidates.length; i += 1) {
    const collectionName = collectionCandidates[i];
    triedCollections.push(collectionName);
    try {
      const queryResult = await db.collection(collectionName).where({ name: targetName }).limit(1).get();
      if (queryResult && Array.isArray(queryResult.data) && queryResult.data.length > 0) {
        return {
          success: true,
          data: queryResult.data[0],
          collectionName
        };
      }
    } catch (error) {
      // 某个集合不存在或权限异常时，继续尝试下一个候选集合
    }
  }

  return {
    success: true,
    data: null,
    collectionName: '',
    triedCollections
  };
}

async function getTempFileURLByAdmin(event) {
  try {
    const fileList = Array.isArray(event && event.fileList) ? event.fileList : [];
    if (!fileList.length) {
      return {
        success: true,
        fileList: []
      };
    }

    const result = await cloud.getTempFileURL({
      fileList
    });

    return {
      success: true,
      fileList: result.fileList || []
    };
  } catch (error) {
    return {
      success: false,
      errMsg: error && error.message ? error.message : String(error),
      fileList: []
    };
  }
}

exports.main = async (event) => {
  const action = event && event.action ? event.action : '';
  switch (action) {
    case 'getLandmarkByName':
      return getLandmarkByName(event);
    case 'getTempFileURLByAdmin':
      return getTempFileURLByAdmin(event);
    default:
      return {
        success: false,
        errMsg: `unsupported action: ${action}`
      };
  }
};
