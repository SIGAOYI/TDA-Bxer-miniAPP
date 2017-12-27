//index.js
//获取应用实例
// const app = getApp()
var app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
import { $wuxToast } from '../../components/wux'
Page({
  data: {
    movies: [
      // { urlpath: 'http://ww3.sinaimg.cn/large/0060lm7Tly1fkgs67glagj30ku06uadb.jpg' },
      // { urlpath: 'http://ww2.sinaimg.cn/large/0060lm7Tly1fkgs67btmlj30ku06uglj.jpg' }
    ],
    wxUserInfo:null,
    news:[],
    ordergonum:3,
    toView: 'red',
    scrollTop: 100,
  },
  onLoad: function () {
    console.log(app.globalData)
    console.log('index getwx')
    // app.getWxUser(app.setPageData(this, 'wxUserInfo'))
  },
  onShow(){
    app.rh('newsList', this.cbNews, {})
  },
  cbNews(res){
    // console.log('cbNews data',res)
    this.setData({ news: res.data.news,'movies':res.data.banners,'ordergonum':res.data.ordergonum})
  },
  //事件处理函数
  bindConsult: function () {
      wx.navigateTo({
        url: "/pages/bxerlist/bxerlist"
      })
  },
  showToastErr() {
    $wuxToast.show({
      type: 'forbidden',
      timer: 2500,
      color: '#fff',
      text: '抱歉，同时只能咨询3位保险师',
      success: () => console.log('禁止操作')
    })
  },
  bindArtical: function (e) {
    var inx = e.currentTarget.dataset.index;
    // app.navCache.richPage=this.data.news[inx]
    let news = this.data.news[inx]
    app.navCache.rpUrl = this.data.news[inx].url
    this.toComP('n'+inx)
  },
  toProducts(){
    wx.navigateTo({
      url: '/pages/products/products'
    })
  },
  toCommonPage(e){
    var inx = e.currentTarget.dataset.index;
    if(inx==='3'){
      return
    }
    this.toComP(inx)
  },
  toComP(inx){
    wx.navigateTo({
      url: '/pages/commonartical/commonartical?pc=' + inx
    })
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
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
