Page({
  data: {
    // 引导页停留时长（毫秒）
    stayDurationMs: 3000,
  },

  onLoad() {
    // 启动计时器，时间到后进入首页（Tab 页）
    this.startRedirectTimer();
  },

  onUnload() {
    // 页面卸载时清理计时器，避免重复触发跳转
    if (this.redirectTimerId) {
      clearTimeout(this.redirectTimerId);
      this.redirectTimerId = null;
    }
  },

  startRedirectTimer() {
    // 防止重复启动计时器
    if (this.redirectTimerId) return;

    this.redirectTimerId = setTimeout(() => {
      // 使用 switchTab 进入首页，确保 TabBar 状态正确
      wx.switchTab({
        url: "/pages/home/index",
      });
    }, this.data.stayDurationMs);
  },
});
