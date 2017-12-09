const app = getApp()
var pdfPath

Page({
  data: {
    filePath:'',
  },
  onLoad: function () {
    wx.downloadFile({
    url: 'https://cdn.tdacar.cn/%E5%B9%B3%E4%BF%9D%E5%AF%BF%E5%8F%91%E3%80%942017%E3%80%95296%E5%8F%B7%E9%99%84%E4%BB%B62%EF%BC%9A%E5%B9%B3%E5%AE%89%E9%99%84%E5%8A%A0%E5%AE%89%E9%91%AB%E4%BF%9D%E6%8F%90%E5%89%8D%E7%BB%99%E4%BB%98%E9%87%8D%E5%A4%A7%E7%96%BE%E7%97%85%E4%BF%9D%E9%99%A9%E6%9D%A1%E6%AC%BE_20170629170908.pdf',
    success: function (res) {
      pdfPath = res.tempFilePath
    }
  })
  },
  pdfCheck: function () {
    wx.openDocument({
          filePath: pdfPath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
},
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  }
})
