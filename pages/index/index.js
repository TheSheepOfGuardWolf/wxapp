//index.js
//获取应用实例
const app = getApp()
var currentProc = 0
var yesText = ['爱你呦',
               '当然爱你啦',
               '小笨蛋，当然爱你啦',
               '嘿嘿嘿，小笨蛋最爱你哒']
var redPacket = '\n 送你一个大红包'
var yesResponse = ['我也爱你哟',
                   '最爱大宝贝啦',
                   '大宝贝，我也好爱你呀',
                   '我就知道老婆还是爱我哒',
                   ]
var noText = ['才不爱你呢',
              '不爱不爱，哼',
              '就不爱，就不爱',
              '我再考虑考虑',
              ]
var mainText = ['大宝贝，你爱我嘛',
                '哼，再给你一个机会',
                '呜呜呜，这次不算再给你一次机会',
                '你确定不爱这个机智勇敢的大老公吗T.T',
                ]
var maxProc = 3



Page({
  data: {
    motto: '宝贝，请点击你的头像',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowMomo: false,
    buttonYesText: '',
    buttonNoText: '',
    disText: '',  
    momoUrl: '',
    isDisabled: false,   
    isYes: false,
  },
  localUrl:'',
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  
 
    const that = this
    wx.downloadFile({
      url: 'https://www.codetiger.top/picture/' + currentProc + '.gif',
      that: this,
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res.statusCode)
        if (res.statusCode === 200) {
          that.setData({
            momoUrl: res.tempFilePath
          })
        }
      }
    })

    this.setData({
      isShowMomo: true,
      buttonYesText: yesText[currentProc],
      buttonNoText: noText[currentProc],
      disText: mainText[currentProc],
      // momoUrl: "../picture/" + currentProc + ".gif",
      // momoUrl: localUrl
    })
  },
  onClickYes: function() {
    const that = this
    
    wx.downloadFile({
      url: 'https://www.codetiger.top/picture/1.'+currentProc+'.gif', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

        if (res.statusCode === 200) {
          that.setData({
            momoUrl: res.tempFilePath,
          })
        }
      }
    })
    this.setData({
      buttonYesText: yesText[currentProc],
      buttonNoText: noText[currentProc],
      disText: yesResponse[currentProc]+redPacket,
      // momoUrl: "../picture/1."+currentProc+".gif",
      isYes: true,
    })
  },
  onClickNo: function() {
    currentProc ++
    const that = this
    wx.downloadFile({
      url: 'https://www.codetiger.top/picture/2.'+currentProc+'.gif', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {
          that.setData({
            momoUrl: res.tempFilePath,
          })
        }
      }
    })
    this.setData({
      buttonYesText: yesText[currentProc],
      buttonNoText: noText[currentProc],
      disText: mainText[currentProc],
      // momoUrl: "../picture/2."+currentProc+".gif",

    })
    if(currentProc === maxProc){
      this.setData({
        isDisabled: true,
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  sendRed: function() {
    console.log(app.globalData.hasUserInfo)
    // const name = this.data.userInfo.nickName
    var name = this.data.userInfo.nickName
    const that = this
    wx.request({
      url: 'https://www.codetiger.top/getmoney.php', //仅为示例，并非真实的接口地址
      data: {
        user: name,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
    
        console.log(res.data)
        if(res.data.flagTime){
          that.setData({
            disText: "恭喜你成功获得"+res.data.money+"元\n稍后打开微信查看吧",
          })
        }else{
          var leftHour = 23 - res.data.hour
          var leftmin = 59 - res.data.minute
          var leftsec = 60 - res.data.second
          that.setData({
            disText: "你已领过红包，请在\n"+leftHour+":"+leftmin+":"
                      +leftsec+"\n之后再来领取红包吧",
          })
        }
      }
    })
    // console.log("success")
    // this.setData({
    //   disText: "success",
    // })
    
  }, 
})
