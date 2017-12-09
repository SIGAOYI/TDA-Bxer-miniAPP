//index.js
//获取应用实例
const app = getApp()
import { $wuxRater } from '../../components/wux'
Page({
  data: {
    text: "This is page data.",
    fber: [],
    showOnline: false,
    showPerformance: false,
    raw:[],
  },
  onLoad() {
    // $wuxRater.init('dic5', {
    //   value: 3.0,
    //   disabled: !0,
    // })
  },
  onShow() {
    let fb = app.navCache.fb
    let data = {}
    if (fb.exclude_id !== null && fb.order_id!==null) {
      data = fb
    }
    app.rh('bxerList', this.cbList, data)
  },
  cbList: function (res) {
    console.log('fberList', res.data)
    // console.log('befer', this.data.bxer)
    this.data.raw = res.data
    for (var i in res.data) {
      let score = 0
      if (res.data[i].score_num>0){
        score=res.data[i].score / res.data[i].score_num
      }
      score = score.toFixed(1)
      res.data[i].average_score = score
      console.log('score:',score)
      $wuxRater.init('dec'+res.data[i].id, {
        value: score,
        disabled: !0,
      })
    }
    this.setData({ fber: [...res.data] })
    console.log(this.data.fber)
  },
  onLine() {
    this.data.showOnline = !this.data.showOnline
    let fber = this.data.raw
    if (this.data.showOnline) {
      fber = this.data.raw.filter(function (item) {
        return item.logined
      })
    }
    this.setData({ fber })
  },
  performance() {
    this.data.showPerformance = !this.data.showPerformance
    let sortflag = -1
    if (this.data.showPerformance) {
      sortflag = 1
    }
    let compare = function (x, y) {//比较函数
      if (x.average_score < y.average_score) {
        return sortflag;
      } else if (x.average_score > y.average_score) {
        return -sortflag;
      } else {
        return 0;
      }
    }
    let fber = this.data.fber.sort(compare)
    this.setData({ fber })
  },
  fberDetail: function (e) {
    // console.log('fberDetail e',e)
    var inx = e.currentTarget.dataset.index;
    app.navCache.fber = this.data.fber[inx]
    wx.navigateTo({
      url: '/pages/fberdetail/fberdetail',
    })
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
})
