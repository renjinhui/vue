/**
 * Created by brain_000 on 2015/12/18.
 */
(function(){
    var api = fishGame.API = {

    };

    var BASE_URL = '/event/c/';

    var get = function(url, params, cb){
        $.ajax({
            url: BASE_URL + url,
            type: 'get',
            data: params||{},
            dataType: 'json',
            success: function(resp){
                /*逻辑失败*/
                if(resp.errorCode != 0){
                    alert(resp.errorMessage);
                    cb && cb(false);
                    return;
                }

                cb && cb(true, resp.data);
            },
            error: function(){
                alert('出错啦,联网失败,请稍后再试吧');
                cb && cb(false);
            }
        })
    };

    var post = function(url, params, cb){
        $.ajax({
            url: BASE_URL + url,
            type: 'post',
            data: params||{},
            dataType: 'json',
            success: function(resp){
                /*逻辑失败*/
                if(resp.errorCode != 0){
                    alert(resp.errorMessage);
                    cb && cb(false);
                    return;
                }

                cb && cb(true, resp.data);
            },
            error: function(){
                alert('出错啦,联网失败,请稍后再试吧');
                cb && cb(false);
            }
        })
    }

    /**
     * @return
     * 获得自己信息
     * uid          当前用户ID
     * is_bind      是否绑定手机
     * count_play   可玩游戏次数
     */
    api.getUserInfo = function(cb){
        get('user/show', {'is_help': 0}, cb);
    };

    /*
    * 获得邀请者信息
    * uid               当前用户ID
    * is_bind           是否绑定手机
    * count_play        可玩游戏次数
    * picture           用户头像
    * uername          用户昵称
    * friend_picture    好友用户头像
    * friend_uername   好友用户昵称
    * */
    api.getInviterInfo = function(uid, cb){
        get('user/show', {
           'is_help': 1,
           'friend_uid': uid
        }, cb)
    };

    /**
     * 获取用户奖励信息
     * money_usable     可兑换金额
     * money_use        已兑换金额
     * money_self       自理金额
     * money_friend     还有助力金额
     * is_cash_self     是否可兑换自力金额
     * is_cash_friend   是否可兑换助力金额
     */
    api.getRewards = function(cb){
        get('user/reward', {}, cb);
    };

    /**
     * 获取好友助力明细
     * [
     *  {
     *      username: 昵称
     *      picture: 头像
     *      money: 助力金额
     *  }
     * ]
     */
    api.getFriendRewards = function(cb){
        get('user/reward/list', {}, cb);
    };

    /**
     * 写入用户奖励
     */
    api.setReward = function(type, money, phone, award_id, cb){
        post('user/reward', {
            type: type, /*兑换类型 1:自立更生, 2:好友助力*/
            money: money,
            phone: phone,
            award_id: award_id || null
        }, cb);

        //cb(true);
    };

    /**
     * 写入游戏记录
     * @param isHelp        是否助力模式
     * @param uid           好友用户ID
     * @param money         奖励金额
     * @param cb
     */
    api.setRecord = function(isHelp, uid, money, arwardId, cb){
        post('user/play', {
            'is_help': isHelp||0,
            'friend_uid': uid,
            'money': money,
            'award_id': arwardId || null
        }, cb);
        //cb(true);
    };

    /**
     * 获取实物奖励
     */
    api.getGift = function(cb){
        post('init',{
            'is_help': fishGame.HELP.is_help,
            'friend_uid': fishGame.HELP.uid
        },cb);
        //cb(true, {
        //
        //})
    };

    api.setGift = function(cb){

    };

    /*获取图片验证码*/
    api.getImgCode = function(cb){
        //cb(true, '图片验证码地址');

        cb(true, '/captcha.jpg');
    };

    /*获取短信验证码*/
    api.getCode = function(){
        cb(true);
    };

    /*
    * 绑定手机
    * captcha   短信验证码
    * phone     手机号码
    * password  用户密码
    * money     兑换奖励金额
    * */
    api.register = function(params, cb){
        post('user/reg', params ,cb);
        //cb(true);
    };

    /**
     * 判断新老用户
     * phone    手机号
     * captcha  短信验证码
     * money    兑换奖励金额
     */
    api.verify = function(params, cb){
        post('user/bind', params ,cb);
        //cb(true, {is_bind: 1});
    };

    api.wxConfig = function(config) {
        if(typeof(wx) !== 'undefined'){
            wx.config(config);
        }
    };

    var WX_DEFAULT_SHARE = {
        'title': '这个游戏太DIAO了！',
        'desc': '干掉便便，赚红包、京东卡、红米Note3、苹果表！！多劳多得~',
        'timelineDesc': '这是一个讨厌圣诞礼物的人不会点开的游戏！',
        'imgUrl': 'https://weixin.souyidai.com/christmas/share.jpg',
        'link': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ff6c76bdf3b5cce&redirect_uri=http%3A%2F%2Fweixin.souyidai.com%2Foauth%2F&response_type=code&scope=snsapi_userinfo&state=christmas_help_' + getCookie('syd_event_id') + '#wechat_redirect',
        'callback': null,
        'api': [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    };

    api.setupShare = function(){
        if(typeof(wx) == 'undefined')return;

        wx.ready(function(){
            wx.onMenuShareTimeline({
                title: WX_DEFAULT_SHARE.timelineDesc,
                link: WX_DEFAULT_SHARE.link,
                imgUrl: WX_DEFAULT_SHARE.imgUrl,
                success: function(){
                    if(WX_DEFAULT_SHARE.callback){
                        WX_DEFAULT_SHARE.callback();
                    }
                }
            });
            wx.onMenuShareAppMessage({
                title: WX_DEFAULT_SHARE.title,
                desc: WX_DEFAULT_SHARE.desc,
                link: WX_DEFAULT_SHARE.link,
                imgUrl: WX_DEFAULT_SHARE.imgUrl,
                success: function(){
                    if(WX_DEFAULT_SHARE.callback){
                        WX_DEFAULT_SHARE.callback();
                    }
                }
            });
        });
    };



    api.setShare = function(share){
        if(share){
            if(share.desc){
                WX_DEFAULT_SHARE.desc = share.desc;
                WX_DEFAULT_SHARE.timelineDesc = share.desc;
            }
            if(share_info.timelineDesc){
                WX_DEFAULT_SHARE.timelineDesc = share.timelineDesc;
            }

            if(share_info.title){
                WX_DEFAULT_SHARE.title = share.title;
            }

            if(share_info.imgUrl){
                WX_DEFAULT_SHARE.imgUrl = share.imgUrl;
            }

            if(share_info.link){
                WX_DEFAULT_SHARE.link = share.link;
            }

            if(share_info.callback){
                WX_DEFAULT_SHARE.callback = share.callback;
            }
        }
    };
    $.ajax({
      url: '/serve/jssign',
      type: 'GET',
      dataType: 'json',
      data: {
        url: location.href
      },
      success: function(res) {
        if (res.errorCode === 0) {
          wx.config(res.result);
        }
      }
    });
    wx.ready(function(){
      wx.onMenuShareTimeline({
        title: WX_DEFAULT_SHARE.timelineDesc,
        link: WX_DEFAULT_SHARE.link,
        imgUrl: WX_DEFAULT_SHARE.imgUrl,
        success: function(){
          _paq.push(['trackEvent', 'christmas', 'share', 'timeline']);
          if(WX_DEFAULT_SHARE.callback){
              WX_DEFAULT_SHARE.callback();
          }
        }
      });
      wx.onMenuShareAppMessage({
        title: WX_DEFAULT_SHARE.title,
        desc: WX_DEFAULT_SHARE.desc,
        link: WX_DEFAULT_SHARE.link,
        imgUrl: WX_DEFAULT_SHARE.imgUrl,
        success: function(){
          _paq.push(['trackEvent', 'christmas', 'share', 'message']);
          if(WX_DEFAULT_SHARE.callback){
            WX_DEFAULT_SHARE.callback();
          }
        }
      });
    });
})();
