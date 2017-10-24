//index.js
//获取应用实例
const app = getApp()

Page({
data: {
    bxer: [
      {
        status: 1,
        name: '曾老大',
        avatar: 'http://image.lawootrip.com/bxshi.png',
        college: '厦门大学',
        specialty: '金融学',
        degree: '学士',
        advance: '家庭保障组合',
        tag: [
          {
            tag1: '保险',
          },
          {
            tag1: '保险123',
          },
        ],
        amount: '123123123',
        times: '888',
      }
    ],
  },
  bindDetail: function() {
    wx.navigateTo({
      url: '/pages/bxerdetail/bxerdetail',
    })
  },
  onReachBottom: function() {
    // Do something when page reach bottom.

  },
})
