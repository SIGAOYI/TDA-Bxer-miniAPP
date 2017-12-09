//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: "This is page data.",
    bxs:{

    }
  },
  onLoad: function (options) {
    console.log('bxerdetail onLoad options:',options)
  },
  onShow: function (options){
    console.log('bxerdetail onShow options:', options)
    console.log(app.navCache.common)
    this.setData({bxs:app.navCache.common})
  },
  consultStart:function(){
    console.log('consultStart........')
    let bxsid=this.data.bxs.id
    app.rh('consultStart',null,{bxsid})
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})
