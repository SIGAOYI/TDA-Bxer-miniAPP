//index.js
//获取应用实例
const app = getApp()

Page({
data: {
    text: "This is page data."
  },
  fberDetail: function () {
    wx.navigateTo({
      url: '/pages/fberdetail/fberdetail',
    })
  },
  onReachBottom: function() {
    // Do something when page reach bottom.

  },

  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
})
