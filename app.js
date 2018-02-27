//app.js
App({
  onLaunch: function () {
    this.initData()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  initData() {
    wx.setEnableDebug({
      enableDebug: false
    })

    // var jwt = wx.getStorageSync('jwt');
    // if (!jwt.access_token) { //检查 jwt 是否存在 如果不存在调用登录
    //   this.login();
    // } else {
    //   console.log(jwt.account_id);
    // }

    this.wxLogin(this.prepareToLogin)
    // this.wxGetSetting(this.userInfoReadyCallback)
    this.getWxUser(this.prepareToLogin)
  },
  globalData: {
    userInfo: null,
    domain: 'bxs.tdacar.cn',
    // domain: 'www.tdacar.cn:8000',
    // domain:'ohoyes.com:8000',
    // path: 'https://tdacar.cn/',
    wxFullInfo: undefined,
    user: undefined,
    account: {
      useable: undefined,
      coupons: [],
      couponNum: 0,
    },
    socketOpen: false,
  },
  reqMsg: [],
  wxLoginCode: undefined,
  cookieHeader: undefined,
  isLogin: false,
  loginStart:false,
  hostpath:'',
  navCache:{
    common:{},
    fb:{
      exclude_id:null,
      order_id:null,
    },
    fber:{},
    order:{},
    gofbpage:{
      arguer:null,
      order: null,
    },
    richPage:{},
    rpUrl:'',
    orderListProcessing:true,
    addFb:null,
  },
  getWxUser(cb) {
    console.log('getWxUser in')
    if (this.globalData.wxFullInfo) {
      console.log('wxFullInfo in,', this.globalData.wxFullInfo)
      typeof cb == "function" && cb(this.globalData.wxFullInfo.userInfo)
    } else {
      this.wxGetSetting(cb)
    }
  },
  wxGetSetting(userInfoReadyCallback){
    let that=this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('getSettion res:',res)
     /*
     * res.authSetting = {
     *   "scope.userInfo": true,
     *   "scope.userLocation": true
     * }
     */
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.info('getuserinfo res:')
              console.table(res)
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              that.globalData.wxFullInfo = res //res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (userInfoReadyCallback) {
                userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }else{
          console.warn('authSetting scope.userInfo false')
          that.reqWxUserAuth()
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success() {
          //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          //     // wx.startRecord()
          //     console.log('authorize success')
          //     that.wxGetUserInfo(that.prepareToLogin)
          //   },
          //   fail() {
          //     console.log('fail in')
          //     // that.reqWxUserAuth()
          //   }
          // })
        }
      }
    })
  },
  reqWxUserAuth(){
    console.log('reqWxUserAuth in')
    let that=this
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord()
        console.log('authorize success',res)
        that.wxGetUserInfo(that.prepareToLogin)
      },
      fail(res) {
        console.log('fail in',res)
        // that.reqWxUserAuth()
      }
    })
  },
  wxGetUserInfo(userInfoReadyCallback){
    let that=this
    wx.getUserInfo({
      success: res => {
        console.info('getuserinfo res:')
        console.table(res)
        // 可以将 res 发送给后台解码出 unionId
        // this.globalData.userInfo = res.userInfo
        that.globalData.wxFullInfo = res //res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (userInfoReadyCallback) {
          console.log('to callback', userInfoReadyCallback)
          userInfoReadyCallback(res.userInfo)
        }
      }
    })
  },
  userInfoReadyCallback(res){
    // this.globalData.userInfo = res.userInfo
    console.log('userInfoReadyCallback inininin,',res)
  },
  wxLogin(sucFunc) {
    console.log('wxlogin in')
    let that = this
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.login({
      success(res) {
        console.log('wx.login success res:', res)
        if (res.code) {
          that.wxLoginCode = res.code
          // if(typeof sucFunc !== "function"){
          //   sucFunc = that.wxLoginSuc
          // }
          // sucFunc(res.code)
          if (sucFunc) {
            sucFunc()
          }
        } else {
          console.log('wx.login res fail:' + res.err)
        }
        // if (!that.globalData.wxFullInfo) {
        //   that.getWxFullInfo(sucFunc, cbUserInfo);
        // } else {
        //   if (typeof sucFunc === 'function') {
        //     sucFunc()
        //   }
        // }
      },
      fail(res) {
        console.log('wx -------login fail', res);
      }
    });
  },
  prepareToLogin() {
    console.log("prepareToLogin in ", "loginCode", this.wxLoginCode, 'wxFullInfo', this.globalData.wxFullInfo)

    if (!this.wxLoginCode || this.globalData.wxFullInfo === undefined) {
      console.log("prepareToLogin wxLoginCode or wxFullInfo is false")
      // let that = this
      // this.loginStart = false
      // this.wxLogin(function () {
      //   that.login(sucFunc, extraParams)
      // });
      return
    }
    if (this.loginStart || this.isLogin) {
      console.log("!!alreadyLogin or is logining")
      return
    } else {
      console.log("loginstart to true")
      this.loginStart = true
    }
    this.login(this.loginSuc)
  },
  login(sucFunc, extraParams) {
    console.log("login in extraParams", extraParams, "loginCode", this.wxLoginCode, 'wxFullInfo',       this.globalData.wxFullInfo)
    let payload = { code: this.wxLoginCode, userFull: this.globalData.wxFullInfo }
    if (extraParams) {
      object.assign(payload, extraParams)
    }
    this.rh('login', sucFunc, payload)
  },

  loginSuc(res) {//backlogin
    console.log("loginSuc res:", res)
    this.isLogin = true;
    this.loginStart = false;
    this.cookieHeader = res.data.trd_session;
    this.globalData.user = res.data.user
    // this.globalData.lastOrder=res.order
    // wx.setStorage({
    //   key: "jwt",
    //   data: res.data
    // });
    // this.rh('user')
    console.log("loginsuc msgLength", this.reqMsg.length, this.reqMsg)
    for (var i = 0; i < this.reqMsg.length; i++) {
      console.log("loginsuc reReq for requestHttp path------:",i, this.reqMsg[i])
      this.rh(this.reqMsg[i].api, this.reqMsg[i].successfunc, this.reqMsg[i].dataobj);
      // this.reqMsg.pop()
    }
    this.reqMsg=[]
  },
  wrapSuc(sucFunc, name) {
    let that = this
    return function (res) {
      console.log("###req suc for:" + name, res)
      let resp = res.data
      if (resp.err !== "") {
        console.log("--resp err:", resp.err)
        // alert(resp.err)
      }
      if (name === 'login') {
        that.loginSuc(resp)
        return
      }
      if (typeof sucFunc === 'function') {
        sucFunc(resp)
      }
    }
  },

  rh(api, successfunc, dataobj) {
    console.log("----#rh in api:", api, "dataobj:", dataobj,'islogin:',this.isLogin)
    // var path = "https://" + this.globalData.domain + "/f/" + api;
    // if(!this.isLogin){

    //   return
    // }
    this.hostpath = "https://" + this.globalData.domain
    var path = this.hostpath + "/f/" + api;
    var ch = this.cookieHeader;
    console.log('---rh ch:', ch, "islogin:", this.isLogin)
    if (api !== 'login' && api!=='index' && (ch === undefined || this.isLogin === false)) {
      console.log("rh not login push to login")
      console.log('push before reqMsg-------:', this.reqMsg)
      // this.reqMsg.push({ api, successfunc, dataobj });
      this.reqMsg = [{ api, successfunc, dataobj},...this.reqMsg]
      // this.login(this.loginSuc);
      console.log('reqMsg-------:',this.reqMsg)
    } else {
      this.request(path, ch, this.wrapSuc(successfunc, api), dataobj);
    }
  },

  // wx.request
  request(path, ch, successfunc, dataobj) {
    console.log("###request in,dataobj,successfunc:", dataobj, successfunc)
    wx.request({
      url: path,
      header: {
        'content-type': 'application/json',
        'Cookie': ch
      },
      data: { data: dataobj },
      method: 'POST',
      success: successfunc,
      fail(res) {
        console.log('request fail for' + path + ':', res);
      }
    });
  },
  setGlobalData(globalVarName) {
    return function (aVar) {
      that.globalData.globalVarName = aVar
    }
  },
  setPageData(page, name) {
    return function (data) {
      console.log("setPageData name,data", name, data)
      page.setData({ [name]: data })
    }
  },
  pageDataSet(page) {
    return function (res) {
      // page.setData({ ...res.data })
    }
  },
  tools: {
    stampToTimeStr: stampToTimeStr,
  },
  showErr(title) {
    wx.showToast({
      title: title,
      // image: '../../lib/img/icon/error.png'
    })
  },
  onShow: function (options) {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  onError: function (msg) {
    console.log("app onerror msg:", msg)
  },
})

function stampToTimeStr(stamp) {
  var date = new Date();
  date.setTime(stamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();

  var md = mapArr([year, month, day]);
  var hm = mapArr([hour, minute]);
  function mapArr(arr) {
    var maparr = arr.map((item) => {
      if (item < 10) {
        item = '0' + item;
        return item;
      } else {
        return item;
      }
    });
    return maparr;
  }
  var str = md.join('-') + ' ' + hm.join(':');
  return str;
}
