Page({
  onGoMapOverview() {
    // 跳转到开封宋迹总览地图页面
    wx.navigateTo({
      url: "/pages/map-overview/index",
    });
  },

  onGoTopicMap() {
    // 跳转到专题地图页面
    wx.navigateTo({
      url: "/pages/topic-map/index",
    });
  },

  onGoRouteMap() {
    // 跳转到全国寻宋之旅路线页面
    wx.navigateTo({
      url: "/pages/route-map/index",
    });
  },
});
