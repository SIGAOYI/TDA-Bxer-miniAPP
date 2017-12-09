//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: [],
    progress: [
      {
        title: '咨询',
        date: '10-01'
      },
      {
        title: '反辩',
        date: '10-02'
      },
      {
        title: '待投保',
        date: '10-03'
      },
      {
        title: '投保确认',
        date: '10-04'
      },
      {
        title: '投保成功',
        date: '10-05'
      }
    ],
    step: -1
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    wx.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      this.setData({
        step: 2
      })
      wx.hideLoading()
    }, 500)
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/indexindex'
    }
  },
})
