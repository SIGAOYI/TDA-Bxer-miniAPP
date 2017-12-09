//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bxer: [
      {
        id:0,
        status: 1,
        name: '曾老大',
        headimg: 'http://image.lawootrip.com/bxshi.png',
        university: '厦门大学',
        major: '金融学',
        degree: '学士',
        adept: '家庭保障组合',
        tag: ['保险', '保险123',
          // {
          //   tag1: '保险',
          // },
          // {
          //   tag1: '保险123',
          // },
        ],
        performance: '123123123',
        consult_num: '888',
      }
    ],
    raw:[],
    showOnline:false,
    showPerformance:false,
    hostpath:'',
    my:false,
  },
  onLoad: function (options) {
    console.log('onLoad options', options)
    let my=false
    if (options.my==='true'){
      // this.setData({ my:true })
      my=true
    }
    app.rh('bxerList', this.cbList, { my })
    this.setData({hostpath:app.hostpath})
  },
  onShow(options){
    console.log('onShow options', options)
  },
  cbList:function(res){
    console.log('bxerList', res.data)
    console.log('befer', this.data.bxer)//...this.data.bxer,
    this.data.raw=res.data
    this.setData({ bxer: [ ...res.data] })
    console.log(this.data.bxer)
  },
  onLine(){
    this.data.showOnline = !this.data.showOnline
    let bxer=this.data.raw
    if(this.data.showOnline){
      bxer = this.data.raw.filter(function (item) {
        return item.logined
      })
    }
    this.setData({ bxer })
  },
  performance(){
    this.data.showPerformance = !this.data.showPerformance
    let sortflag=-1
    if(this.data.showPerformance){
      sortflag=1
    }
    let compare = function (x, y) {//比较函数
      if (x.performance < y.performance) {
        return sortflag;
      } else if (x.performance > y.performance) {
        return -sortflag;
      } else {
        return 0;
      }
    }
    let bxer = this.data.raw.sort(compare)
    this.setData({ bxer })
  },
  bindDetail: function (e) {
    var inx = e.currentTarget.dataset.index;
    app.navCache.common=this.data.bxer[inx]
    console.log(app.navCache.common)
    wx.navigateTo({
      url: '/pages/bxerdetail/bxerdetail',
    })
  },
  onReachBottom: function () {
    // Do something when page reach bottom.

  },
})
