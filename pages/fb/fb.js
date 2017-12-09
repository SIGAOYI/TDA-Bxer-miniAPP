//logs.js
const util = require('../../utils/util.js')
const app = getApp()

const starArr = new Array(5).fill(1)

Page({
  data: {
    evaluateFinish:false,
    flag: true,
    flag2: -1,
    starArr,
    argueList: [],
    order: {},
    arguer:{},
    title: ['用户追问', '反辩师建议','保险师建议'],
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
  onShow() {
    console.log('fb onShow in app.navCache.gofbpage', app.navCache.gofbpage)
    let fbpage = app.navCache.gofbpage
    console.log('fb onShow: fppage,', fbpage)
    let evaluateFinish=false
    if(fbpage.order.step>=7){
      evaluateFinish=true
    }
    this.setData({ order: fbpage.order, arguer: fbpage.arguer, evaluateFinish })
    let arguer_id = fbpage.arguer.id
    let order_id = fbpage.order.id
    app.rh('arguePage', this.cbFbPage, { arguer_id, order_id })
  },
  cbFbPage: function (res) {
    console.log('cbFbPage,res:', res.data)
    this.setData({ argueList: res.data })
  },
  evaluate(e){
    console.log('evaluate e:', e)
    let text = e.detail.value.textarea
    console.log(text)
    let fppage = app.navCache.gofbpage
    console.log('evaluate fppage,', fppage)
    let arguer_id = fppage.arguer.id
    let order_id = fppage.order.id
    let score=(this.data.flag2+1)//*2
    app.rh('evaluate', this.evaluateCb, { arguer_id, order_id, text, score })
  },
  evaluateCb(res){
    if(res.err===''){
      this.setData({ evaluateFinish: true, flag: true })
      // app.navCache.order.step = 7
      // app.navCache.order=res.data.order
      wx.redirectTo({
        url: '/pages/orderdetail/orderdetail',
      })
    }

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
  bindAsk: function () {
    
    wx.navigateTo({
      url: '/pages/fbask/fbask',
    })
  },
  changeColor(e) {
    const index = e.currentTarget.dataset.index
    console.log('changeColor index',index)
    this.setData({
      flag2: index
    });
  },
  changeColor12: function () {
    var that = this;
    that.setData({
      flag2: 2
    });
  },
  changeColor13: function () {
    var that = this;
    that.setData({
      flag2: 3
    });
  },
  changeColor14: function () {
    var that = this;
    that.setData({
      flag2: 4
    });
  },
  changeColor15: function () {
    var that = this;
    that.setData({
      flag2: 5
    });
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  },
})
