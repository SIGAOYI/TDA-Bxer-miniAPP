//logs.js
const util = require('../../utils/util.js')
const app = getApp()

const starArr = new Array(5).fill(1)

Page({
  data: {
    flag: true,
    flag2: -1,
    starArr
  },
  noScroll: function () {
    return false
  },
  showMask: function () {
    this.setData({ flag: false })
  },
  hideMask: function () {
    this.setData({ flag: true })
  },
  bindAsk: function() {
    wx.navigateTo({
      url: '/pages/fbask/fbask',
    })
  },
  changeColor (e) {
    const index = e.currentTarget.dataset.index
    this.setData( {
        flag2: index
    });
  },
  changeColor12:function(){
        var that = this;
        that.setData( {
            flag2:2
        });
    },
  changeColor13:function(){
        var that = this;
        that.setData( {
            flag2: 3
        });
    },
  changeColor14:function(){
        var that = this;
        that.setData( {
            flag2:4
        });
    },
  changeColor15:function(){
        var that = this;
        that.setData( {
            flag2: 5
        });
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
