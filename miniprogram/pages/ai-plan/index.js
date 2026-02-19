Page({
  data: {
    // 天数状态 - 单选
    dayActive1: false,
    dayActive2: false,
    dayActive3: false,
    dayActive4: false,
    
    // 偏好状态 - 多选
    prefActive1: false,
    prefActive2: false,
    prefActive3: false,
    prefActive4: false,
    prefActive5: false,
    
    // 添加一个标记，表示当前是否选中了"特种兵打卡"
    isSpecialForcesSelected: false
  },

  onLoad() {
    // 重置所有状态
    this.setData({
      dayActive1: false,
      dayActive2: false,
      dayActive3: false,
      dayActive4: false,
      prefActive1: false,
      prefActive2: false,
      prefActive3: false,
      prefActive4: false,
      prefActive5: false,
      isSpecialForcesSelected: false
    })
  },

  // 天数选择 - 单选
  selectDay1() {
    this.setData({
      dayActive1: true,
      dayActive2: false,
      dayActive3: false,
      dayActive4: false
    })
  },
  selectDay2() {
    this.setData({
      dayActive1: false,
      dayActive2: true,
      dayActive3: false,
      dayActive4: false
    })
  },
  selectDay3() {
    this.setData({
      dayActive1: false,
      dayActive2: false,
      dayActive3: true,
      dayActive4: false
    })
  },
  selectDay4() {
    this.setData({
      dayActive1: false,
      dayActive2: false,
      dayActive3: false,
      dayActive4: true
    })
  },

  // 偏好选择 - 修改为特殊逻辑
  togglePref1() {
    // 轻松游乐 - 普通多选
    // 如果当前选中了"特种兵打卡"，则不允许再选其他
    if (this.data.isSpecialForcesSelected) {
      wx.showToast({
        title: '特种兵打卡不能与其他偏好同时选择',
        icon: 'none'
      })
      return
    }
    this.setData({
      prefActive1: !this.data.prefActive1
    })
  },
  
  togglePref2() {
    // 特种兵打卡 - 特殊处理
    if (!this.data.prefActive2) {
      // 正在选中特种兵打卡
      // 取消所有其他已选中的偏好
      this.setData({
        prefActive1: false,
        prefActive2: true,
        prefActive3: false,
        prefActive4: false,
        prefActive5: false,
        isSpecialForcesSelected: true
      })
    } else {
      // 取消选中特种兵打卡
      this.setData({
        prefActive2: false,
        isSpecialForcesSelected: false
      })
    }
  },
  
  togglePref3() {
    // 文化深度 - 普通多选
    // 如果当前选中了"特种兵打卡"，则不允许再选其他
    if (this.data.isSpecialForcesSelected) {
      wx.showToast({
        title: '特种兵打卡不能与其他偏好同时选择',
        icon: 'none'
      })
      return
    }
    this.setData({
      prefActive3: !this.data.prefActive3
    })
  },
  
  togglePref4() {
    // 亲子研学 - 普通多选
    // 如果当前选中了"特种兵打卡"，则不允许再选其他
    if (this.data.isSpecialForcesSelected) {
      wx.showToast({
        title: '特种兵打卡不能与其他偏好同时选择',
        icon: 'none'
      })
      return
    }
    this.setData({
      prefActive4: !this.data.prefActive4
    })
  },
  
  togglePref5() {
    // 摄影采风 - 普通多选
    // 如果当前选中了"特种兵打卡"，则不允许再选其他
    if (this.data.isSpecialForcesSelected) {
      wx.showToast({
        title: '特种兵打卡不能与其他偏好同时选择',
        icon: 'none'
      })
      return
    }
    this.setData({
      prefActive5: !this.data.prefActive5
    })
  },

  // 跳转结果页
  goToPlanResult() {
    // 获取选中的天数
    let days = 0
    if (this.data.dayActive1) days = 1
    if (this.data.dayActive2) days = 2
    if (this.data.dayActive3) days = 3
    if (this.data.dayActive4) days = 4
    
    // 获取选中的偏好
    let preferences = []
    if (this.data.prefActive1) preferences.push('轻松游乐')
    if (this.data.prefActive2) preferences.push('特种兵打卡')
    if (this.data.prefActive3) preferences.push('文化深度')
    if (this.data.prefActive4) preferences.push('亲子研学')
    if (this.data.prefActive5) preferences.push('摄影采风')
    
    // 验证
    if (days === 0) {
      wx.showToast({
        title: '请选择天数',
        icon: 'none'
      })
      return
    }
    
    if (preferences.length === 0) {
      wx.showToast({
        title: '请选择偏好',
        icon: 'none'
      })
      return
    }

    // 跳转
    wx.navigateTo({
      url: `/pages/ai-plan-result/index?days=${days}&preferences=${preferences.join(',')}`
    })
  }
})