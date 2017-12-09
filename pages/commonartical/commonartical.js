//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: [{
    mode: 'aspectFit',
    text: 'aspectFit'
    }, ],
    ppt: [
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8701.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8702.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8703.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8704.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8705.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8706.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8707.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8708.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8709.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8710.jpg',
    },
    {
      pptUrl:'https://cdn.tdacar.cn/%E5%B9%BB%E7%81%AF%E7%89%8711.jpg',
    }
    ],
    rp: {},
    rpUrl: {},
    danmuList: [
      {
        text: '保险师好贴心负责！！',
        color: '#ff0000',
        time: 1
      },
      {
        text: '天地安保险师真的很专业！',
        color: '#ff00ff',
        time: 2
      }],
    poster: '',
    pc:"",
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onLoad: function (options) {
    this.setData({pc:options.pc})
  },
  onShow(options) {
    // let rp = app.navCache.richPage
    console.log('commonartical onShow options', options)
    let rpUrl = app.navCache.rpUrl
    console.log('rpUrl', rpUrl)
    this.setData({ rpUrl })
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    // { { rpUrl } } #wechat_redirect
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
