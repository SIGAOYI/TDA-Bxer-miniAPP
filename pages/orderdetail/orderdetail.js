//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
  },
  bindFb: function () {
    wx.navigateTo({
      url: '/pages/fb/fb',
    })
  },
  fberList: function () {
    wx.navigateTo({
      url: '/pages/fberlist/fberlist',
    })
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
      path: '/pages/index/index'
    }
  },
})
