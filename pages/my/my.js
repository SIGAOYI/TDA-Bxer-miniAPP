//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    wxUserInfo: null,
    userData:{

    },
  },
  bindConsult: function (processing=true) {
    // console.log('bindConsult processing', processing)
    // app.navCache.orderListProcessing=processing
    wx.switchTab({
      url: '/pages/consult/consult',
    })
  },
  bindOrderList(){
    console.log('bindOrderList111111')
    app.navCache.orderListProcessing = false
    wx.switchTab({
      url: '/pages/consult/consult',
    })
  },
  onLoad: function () {
    console.log(app.globalData)
    console.log('my getwx')
    app.getWxUser(app.setPageData(this, 'wxUserInfo'))
    console.log('this data userinfo', this.data.wxUserInfo)
  },
  onShow(){
    app.rh('userCenter',this.cbCenter,{})
  },
  cbCenter(res){
    console.log('cbCenter res',res)
    this.setData({ userData:res.data})
  },
  tomybxer(){
    console.log('this.data',this.data)
  },
  consultStart: function () {
    console.log('consultStart........')
    let steward_id = this.data.userData.steward_id
    app.rh('consultStart', null, { steward_id })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '专业-安心-便捷',
      path: '/pages/index/index',
      imageUrl: 'http://image.lawootrip.com/test-share.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
