//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movies:[
    {url:'http://ww3.sinaimg.cn/large/0060lm7Tly1fkgs67glagj30ku06uadb.jpg'} ,
    {url:'http://ww2.sinaimg.cn/large/0060lm7Tly1fkgs67btmlj30ku06uglj.jpg'}
    ]
   },
      //事件处理函数
    bindConsult: function() {
      wx.navigateTo({
        url: "/pages/bxerlist/bxerlist"
      })
    },
    bindArtical: function() {
        wx.navigateTo({
          url: '/pages/commonartical/commonartical'
        })
      },
    onLoad: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    onShareAppMessage: function () {
      return {
        title: '天地安保险师',
        path: '/pages/index/index'
      }
    },
    getUserInfo: function(e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
})
