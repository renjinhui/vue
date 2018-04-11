"use strict";
var modalShow = function(o) {
    var o = $(o),
      e = $(".modal-overlay");
    e.show(), o.removeClass("hideModal"), o.addClass("showModal"), o.show()
  },
  modalHide = function(o) {
    var o = $(o),
      e = $(".modal-overlay");
    e.hide(), o.removeClass("showModal"), o.addClass("hideModal");
    setTimeout(function() {
      o.hide()
    }, 200)
  };
$(function() {
  $(".close,.modal-close").on("click", function(o) {
    o.stopPropagation(), modalHide($(".showModal"))
  }), $(".hb-btn").on("click", function() {
    $.ajax({
      url: "/page/invite_coupon",
      type: "POST",
      dataType: "json",
      data: {
        username: $("#mobile").val()
      },
      success: function(o) {
        modalShow(o.data === "REGISTERED" ? $("#modal-old") : $("#modal-get"))
      }
    })
  }), $(".invite-btn").on("click", function() {
    location.href = "https://weixin.souyidai.com/page/invite_share/" + $("#mobile").val()
  }), $(".regist-btn").on("click", function() {
    location.href = "" === location.search ? "https://events.souyidai.com/info/589.htm?invite=" + location.pathname.split("/").pop() + "&mobile=" + $("#mobile").val() : "https://events.souyidai.com/info/589.htm" + location.search + "&invite=" + location.pathname.split("/").pop() + "&mobile=" + $("#mobile").val()
  }), $.ajax({
    url: "/serve/jssign",
    type: "GET",
    dataType: "json",
    data: {
      url: location.href
    },
    success: function(o) {
      0 === o.errorCode ? wx.config(o.result) : console.log("msg")
    }
  }), $(".btn-share").on("click", function() {
    $(".share-overlay").height($(document).height());
    $(".share-overlay").show()
  }), $(".share-overlay").on("click", function() {
    $(this).hide()
  }), wx.ready(function() {
    wx.onMenuShareTimeline({
      title: "送你搜易贷大红包，大家伙儿一起赚钱一起发！",
      link: "https://weixin.souyidai.com/page/invite_coupon/" + inviteUrl,
      imgUrl: "https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg",
      success: function() {},
      cancel: function() {}
    }), wx.onMenuShareAppMessage({
      title: "送你搜易贷大红包，大家伙儿一起赚钱一起发！",
      desc: "我在搜易贷投资，感觉棒棒哒，邀你一起来赚钱！",
      link: "https://weixin.souyidai.com/page/invite_coupon/" + inviteUrl,
      imgUrl: "https://help.souyidai.com/upload/2015/03/10/1425984762809.jpg",
      type: "link",
      success: function() {},
      cancel: function() {}
    })
  }), wx.error(function(o) {
    console.log(o)
  })
});
var parserUrl = function(o) {
  var e = document.createElement("a");
  e.href = o;
  var i = function(o) {
    if (!o) return {};
    var e = {};
    o = o.slice(1).split("&");
    for (var i, n = 0; n < o.length; n++) i = o[n].split("="), e[i[0]] = i[1];
    return e
  };
  return {
    protocol: e.protocol,
    host: e.host,
    hostname: e.hostname,
    pathname: e.pathname,
    search: i(e.search),
    hash: e.hash
  }
};
