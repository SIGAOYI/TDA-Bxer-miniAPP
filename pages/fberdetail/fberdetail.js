//logs.js
const util = require('../../utils/util.js')
const app = getApp()

import { $wuxRater } from '../../components/wux'

Page({
  data: {
    logs: [],
    progress: [
      {
        title: '咨询',
        date: '10-01'
      },
      {
        title: '反辩',
        date: '10-02'
      },
      {
        title: '待投保',
        date: '10-03'
      },
      {
        title: '投保确认',
        date: '10-04'
      },
      {
        title: '投保成功',
        date: '10-05'
      }
    ],
    step: -1,
    fber:{},
    evaluates:[],
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    // wx.showLoading({
    //   title: '加载中...'
    // })
    // setTimeout(() => {
    //   this.setData({
    //     step: 2
    //   })
    //   wx.hideLoading()
    // }, 500)
    $wuxRater.init('decimal', {
      value: 3.1,
      disabled: !0,
    })
  },
  onShow:function(){
    let fber = app.navCache.fber
    console.log('fber:',fber)
    app.rh('evaluateList', this.evaluatesCb, { aid: fber.id})
    this.setData({ fber})
  },
  evaluatesCb(res){
    console.log('res',res)
    for (var i in res.data) {
      let score = res.data[i].score
      score = score.toFixed(1)
      res.data[i].index=i
      console.log('score:', score)
      $wuxRater.init('dec' + i, {
        value: score,
        disabled: !0,
      })
    }
    this.setData({ evaluates: res.data })
  },
  argueStart:function(){
    let fb = app.navCache.fb
    if (fb.order_id !== null) {
      fb.arguer_id=this.data.fber.id
      app.rh('argueStart', this.aStartCb, fb)
    }else{
      console.log('argueStart err params fb:',fb)
    }
  },
  aStartCb:function(res){
    if(res.err!==''){
      console.log('astart reserr:',res.err)
    }else{
      app.navCache.addFb = this.data.fber
      wx.navigateTo({
        url: '/pages/orderdetail/orderdetail',
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/nidex'
    }
  },
})
