"use strict";
var wechatInit = function() {
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
};
wx.ready(function() {
  wx.onMenuShareTimeline({
    title: '送你搜易贷大红包，大家伙儿一起赚钱一起发！',
    link: data.url,
    imgUrl: 'https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg',
    success: function() {},
    cancel: function() {}
  });
  wx.onMenuShareAppMessage({
    title: '送你搜易贷大红包，大家伙儿一起赚钱一起发！',
    desc: '我在搜易贷投资，感觉棒棒哒，邀你一起来赚钱！',
    link: data.url,
    imgUrl: 'https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg',
    type: 'link',
    success: function() {},
    cancel: function() {}
  });
});
var syd_auth = getCookie('syd_auth_verify');
if (syd_auth !== null && syd_auth !== '') {
  window.uid = syd_auth.split('|')[0]
}
var data = {
  title: "送你搜易贷大红包，大家伙儿一起赚钱一起发！",
  description: "我在搜易贷投资，感觉棒棒哒，邀你一起来赚钱！",
  url: "https://weixin.souyidai.com/page/invite_coupon/",
  imageUrl: "https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg"
};
var shareConfig = {
    title: "送你搜易贷大红包，大家伙儿一起赚钱一起发！",
    message: "我在搜易贷投资，感觉棒棒哒，邀你一起来赚钱！",
    url: "https://weixin.souyidai.com/page/invite_coupon/",
    img: "https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg"
  },
  uid = window.uid || "";
uid = uid.toString(), void 0 !== location.pathname.split("/")[3] && (uid = location.pathname.split("/")[3]), void 0 === uid || null == uid || "" === uid || ($(".invite-href").attr("href", "/page/invite/" + uid), $.ajax({
  url: "/page/invite",
  type: "POST",
  dataType: "json",
  data: {
    uid: uid
  },
  success: function(i) {
    i.errorCode || (shareConfig.url = shareConfig.url + i.inviteUrl, data.url = data.url + i.inviteUrl, wechatInit(), (i.giftSum || i.ticketSum) && ($(".invite-href").show(), $(".invite-money-no").hide(),  $("#money").text("¥" + i.giftSum), $(".ticket").text(i.ticketSum + '张'), $(".invite-money").show()))
  }
}));
$(function() {
  $(".tab-list li").on("click", function() {
    $(".tab-list li").removeClass("tab-active"), $(this).addClass("tab-active"), $(".detail-container").hide().eq($(".tab-list li").index($(this))).show()
  })
});
$(function() {
  $("#wechat_share,.btn-red").on("click", function() {
    if (isClient) {
      if (isAndroid) {
        data.imageUrl = 'https://help.souyidai.com/upload/2015/03/10/1425984813181.png';
      }
      window.shareContent = shareConfig.title + "|" + shareConfig.message + "|" + shareConfig.url + "|" + shareConfig.img;
      SYDBridge.openNative('share', data);
    }
    if (isWechat) {
      $('.share-overlay').show();
    }
  });
  $('.share-overlay').on('click', function() {
    $(this).hide();
  });
});
