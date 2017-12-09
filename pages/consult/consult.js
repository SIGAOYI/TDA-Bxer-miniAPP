//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    flag: true,
    progress: [
      {
        name: '曾老大',
        order_no: 123123,
        avatar: 'http://image.lawootrip.com/bxshi.png',
        amount_insure_proposed: 123.12,
        step: 1,
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
        ]
      },
    ],
    left:{},
  },
  onLoad: function (options) {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    console.log('consult onLoad options', options)
  },
  onShow: function (options) {
    console.log('consult onShow options', options)
    let processing = app.navCache.orderListProcessing
    if (!processing) {
      app.navCache.orderListProcessing = true
    }
    console.log('processing', processing)
    app.rh('consultList', this.cbList, { processing })
  },
  cbList: function (res) {
    console.log('consultList', res.data)
    let left = res.data.left
    let list = res.data.list
    for (var i = 0; i < list.length; i++) {
      if (list[i].amount_insure_proposed == null) {
        list[i].amount_insure_proposed = 0
      }
      // progress: this.data.progress[0].progress,
      let convertStep = this.convertStep(list[i].step)
      console.log('res.data[i].step,convertStep', list[i].step, convertStep)
      let progress = this.data.progress[0].progress
      list[i] = Object.assign(list[i], {
        convertStep, progress
        // progress: this.data.progress[0].progress,
        // name: res.data[i].consulter.name, avatar: res.data[i].consulter.headimg
      })
    }
    this.setData({ progress: [...list], left })
    console.log(this.data.progress)
  },
  convertStep(step) {
    let step_suggested_preinsure = 3;// 2) f3 consulter fill suggest over, wait to insure//back modify
    // step_argue_start = 5  # 2.1) hide front show
    // step_argue_over = 7  # 2.2) hide //equal score_at to wait pay
    let step_pay_selected = 9;  // 3) hide
    let step_payover_insure_confirm = 11;  // f4 投保确认--出单中  //pay finish//online or back confirm
    // step_amount_adjust = 13  # 4.1) hide  //back operate
    let step_insure_success = 15;
    let step_confirm_receipt = 17;
    if (step < step_suggested_preinsure) {
      return 0
    }
    if (step < step_payover_insure_confirm) {
      return 2
    }
    if (step < step_insure_success) {
      return 3
    }
    if (step >= step_insure_success) {
      return 4
    }
    // switch (step) {
    //   case step_suggested_preinsure:
    //     return 0
    //   case step_pay_selected:
    //     return 0
    //   default:
    //     return 0
    // }
  },
  orderDetail: function (e) {
    var inx = e.currentTarget.dataset.index;
    console.log('inx', inx, e)
    app.navCache.order = this.data.progress[inx]
    console.log(app.navCache.order)
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail',
    })
  },
  bindConsult() {
    wx.navigateTo({
      url: '../../pages/bxerlist/bxerlist',
    })
  },

  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  },
})
