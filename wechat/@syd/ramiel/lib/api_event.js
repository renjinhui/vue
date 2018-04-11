'use strict';

/**
 * shake 摇一摇 操作
 * @url /shakelottery/do
 */

exports.shakeDo = function(form, cookies) {
  const url = '/shakelottery/do';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * shake 摇一摇 分享结果
 * @url /shakelottery/share
 */

exports.shakeShare = function(form, cookies) {
  const url = '/shakelottery/share';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * shake 摇一摇 查询次数
 * @url /shakelottery/num_of_chance
 */

exports.shakeChance = function(form, cookies) {
  const url = '/shakelottery/num_of_chance';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * shake 摇一摇 奖品列表
 * @url /shakelottery/goods
 */

exports.shakeGoods = function(form, cookies) {
  const url = '/shakelottery/goods';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * shake 摇一摇 注册成功调用
 * @url /shakelottery/regist_success
 * @param {String} mobile 注册用户手机号
 * @param {String} unionid 微信unionId
 */

exports.shakeRegist = function(form) {
  const url = '/shakelottery/regist_success';
  return this.request(this.eventPrefix + url, form);
};

/**
 * shake 摇一摇 用户状态查询
 * @url /shakelottery/check_user_status
 * @param {String} mobile 注册用户手机号
 * @param {String} unionid 微信unionId
 */

exports.shakeUserStatus = function(form) {
  const url = '/shakelottery/check_user_status';
  return this.request(this.eventPrefix + url, form);
};

/**
 * c 活动 用户状态接口
 * @url /c/user/show
 * @param {String} is_help 是否助力模式
 * @param {String} friend_uid 好友微信unionId
 */

exports.cUserShow = function(form, cookies) {
  const url = '/c/user/show';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url + this.form2query(form), form, headers, 'GET');
};

/**
 * c 活动 用户奖品信息
 * @url /c/user/reward
 */

exports.cUserReward = function(form, cookies) {
  const url = '/c/user/reward';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers, 'GET');
};

/**
 * c 活动 兑换用户奖励
 * @url /c/user/reward
 * @param {String} type 兑换类型
 * @param {String} money 兑换金额
 */

exports.cUserRewardAdd = function(form, cookies) {
  const url = '/c/user/reward';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * c 活动 用户好友助力明细
 * @url /c/user/reward/list
 * @param {String} is_help 是否显示自己记录
 */

exports.cUserRewardList = function(form, cookies) {
  const url = '/c/user/reward/list';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url + this.form2query(form), form, headers, 'GET');
};

/**
 * c 活动 添加游戏记录
 * @url /c/user/play
 * @param {String} is_help 是否助力模式
 * @param {String} friend_uid 好友微信unionId
 * @param {String} money 游戏金额
 */

exports.cUserPlay = function(form, cookies) {
  const url = '/c/user/play';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * c 活动 实物判断
 * @url /c/init
 * @param {String} is_help 是否助力模式
 * @param {String} friend_uid 好友微信unionId
 */

exports.cInit = function(form, cookies) {
  const url = '/c/init';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.eventPrefix + url, form, headers);
};

/**
 * 直接对用户发送红包
 * @url /timecoupon/givecoupon
 * @param {String} uid 用户uid
 * @param {String} channelName 红包渠道
 */

exports.giveCoupon = function(form) {
  const url = '/timecoupon/givecoupon';
  console.log('[coupon]: 红包发放 user: %s channel: %s', form.uid, form.channelName);
  return this.request(this.eventPrefix + url, form);
};
