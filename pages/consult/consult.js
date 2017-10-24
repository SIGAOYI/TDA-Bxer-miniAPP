//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    flag: true,
    progress: [
      {
        name: '曾老大',
        order: 123123,
        avatar: 'http://image.lawootrip.com/bxshi.png',
        money: 123.12,
        step: 1,
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
        ]
      },
    ],
  },
  orderDetail: function() {
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail',
    })
  },
  bindConsult () {
    wx.navigateTo({
      url: '../../pages/bxerlist/bxerlist',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  },
})
