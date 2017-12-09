//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    noteMaxLen: 500, //备注最多字数
  },
  newArgue(e){
    // console.log('newargue e:',e)
    let text = e.detail.value.textarea
    // console.log(text)
    let fppage = app.navCache.gofbpage
    console.log('fbask fppage,', fppage)
    let arguer_id = fppage.arguer.id
    let order_id = fppage.order.id

    app.rh('newArgue', this.argueCb, { arguer_id, order_id,speaker:0,text})
  },
  argueCb(res){
    console.log('arguecb res',res)
    if(res.err===''){
      wx.navigateTo({
        url: '/pages/fb/fb',
      })
    }
    this.showTopTips()
  },
  showTopTips: function(){
    var that = this;
    this.setData({
        showTopTips: true
    });
    setTimeout(function(){
        that.setData({
            showTopTips: false
        });
    }, 3000);

  },
  bindWordLimit: function(e){
   var value = e.detail.value, len = parseInt(value.length);
   if (len > this.data.noteMaxLen) return;

   this.setData({
     currentNoteLen: len //当前字数
    //  limitNoteLen: this.data.noteMaxLen - len //剩余字数
   });
 },
 bindChooseImage: function () {
   wx.chooseImage({
     count: 5, // 最多可以选择的图片张数，默认9
     sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
     success: function(res){
       // success
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
 },
  onShareAppMessage: function () {
    return {
      title: '天地安保险师',
      path: '/pages/index/index'
    }
  },
})
