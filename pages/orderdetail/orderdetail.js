//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  flagPay: false,
  billConfirm: false,
  data: {
    progress: [
      {
        title: '咨询',
      },
      {
        title: '反辩',
      },
      {
        title: '待投保',
      },
      {
        title: '投保确认',
      },
      {
        title: '投保成功',
      }
    ],
    //     step_consult_start = 0  # 1) f1 equal created_at
    step_suggested_preinsure: 3,  // 2) f3 consulter fill suggest over, wait to insure//back modify
    // step_argue_start = 5  # 2.1) hide front show
    step_argue_over: 7,  //# 2.2) hide //equal score_at to wait pay
    step_pay_selected: 9,  // 3) hide
    step_payover_insure_confirm: 11,  // f4 投保确认--出单中  //pay finish//online or back confirm
    // step_amount_adjust = 13  # 4.1) hide  //back operate
    step_insure_success: 15,
    step_confirm_receipt: 17,
    pay_button_show: true,
    sel_offLine_after_show: false,
    step: 5,
    order: {},
    arguers: [],
    insures: [],
    insureSum: 0,
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

  },
  contact(){
    let data={}
    if(this.data.convertStep<3){
      data.bxsid = this.data.order.consulter_id
    }else{
      data.steward_id=-1
    }
    app.rh('consultStart', null, data)
  },
  onShow() {
    // console.log('onShow app.navCache.order', app.navCache.order)
    let order_id = app.navCache.order.id
    app.rh('orderinfo', this.orderCb, { order_id })
  },
  orderCb(res) {
    if (res.err != '') {
      console.log('orderCb err:', res.err)
      return
    }
    console.log('orderCb',res.data)
    let order = res.data
    let arguers = [order.arguer1, order.arguer2, order.arguer3, app.navCache.addFb].filter(function (val) {
      return !(!val || val === "");
    });
    console.log('arguers', arguers)
    let pay_button_show = this.calculatePayButton(order)
    let sel_offLine_after_show = false
    if (order.step >= this.data.step_pay_selected && order.channel == 'offline') {
      sel_offLine_after_show = true
    }
    // if(order.arguer1!==null){
    // }
    let convertStep = this.convertStep(order.step)
    this.setData({ order, arguers, pay_button_show, convertStep })
    app.rh('orderInsures', this.cbInsure, { id: order.id })
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
  calculatePayButton(order) {
    if (order.step >= this.data.step_payover_insure_confirm) {
      return false
    }
    if (order.step === this.data.step_pay_selected && order.pay_channel == "offline") {
      return false
    }
    if (order.step < this.data.step_argue_over && order.arguer1_id !== null) {
      return false
    }
    return true
  },
  cbInsure: function (res) {
    let insureSum = 0
    for (var i in res.data) {
      insureSum += res.data[i].amount
    }
    this.setData({ insures: res.data, insureSum })
    console.log('cbinsure after data', this.data)
  },
  bindFb: function (e) {
    var inx = e.currentTarget.dataset.index;
    app.navCache.gofbpage = { arguer: this.data.arguers[inx], order: this.data.order }
    console.log('bindFb', inx)
    wx.redirectTo({
      url: '/pages/fb/fb',
    })
  },
  fberList: function () {
    app.navCache.addFb = null,
      app.navCache.fb = {
        exclude_id: this.data.order.consulter_id, order_id: this.data.order.id
      }
    wx.navigateTo({
      url: '/pages/fberlist/fberlist',
    })
  },
  confirmBill: function () {
    app.rh('confirmReceipt', this.cbConfirmBill,{order_id:this.data.order.id})
  },
  cbConfirmBill(res){
    if(res.err==''){
      this.setData({ billConfirm: true })
    }
  },
  checkBillPic: function () {

  },
  payOnline() {
    this.pay('online')
  },
  payOffline() {
    this.pay('offline')
  },
  pay(channel) {
    let order_id = this.data.order.id
    app.rh('pay', this.payCb, { channel, order_id })
  },
  payCb(res) {
    console.log('paycb res', res)
    if (res.err == '') {
      this.setData({ pay_button_show: false, order: res.data.order, sel_offLine_after_show:true})
    }
  },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  },
})
