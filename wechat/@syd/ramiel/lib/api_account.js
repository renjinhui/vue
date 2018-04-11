'use strict';

/**
 * passport 安全中心接口
 * @url /app/account/safecenter
 */

exports.safeCenter = function(form) {
  const url = '/app/account/safecenter';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 短信验证码接口
 * @url /app/account/securitysms
 * @param {String} username
 */

exports.sendSecuritySms = function(form) {
  const url = '/app/account/securitysms';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 实名认证
 * @url /app/account/id5
 * @param {String} id5
 * @param {String} realName
 */

exports.id5Auth = function(form) {
  const url = '/app/account/id5';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 实名认证状态
 * @url /app/account/id5Status
 */

exports.id5Status = function(form) {
  const url = '/app/account/id5Status';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 资金明细
 * @url /app/account/capital/detail
 * @param {String} pageNo
 * @param {String} pageSize
 */

exports.capitalDetail = function(form) {
  const url = '/app/account/capital/detail';
  return this.request(this.appPrefix + url + this.form2query(form), form, this.appSign(url), 'GET');
};

/**
 * account 资金概览
 * @url /app/1.1/mycapital/chart
 */

exports.capitalOverview = function(form) {
  const url = '/app/1.1/mycapital/chart';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 我的投资列表
 * @url /app/1.1/account/invest/list
 */

exports.myInvestList = function(form) {
  const url = '/app/1.1/myinvest/list';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * account 我的投资详情
 * @url /app/myaccount/invest/detail
 * @param {String} bidId
 */

exports.myInvestItem = function(form) {
  const url = '/app/myaccount/invest/detail';
  return this.request(this.appPrefix + '/app/myaccount/invest/detail', form, this.appSign(url));
};

/**
 * account 资金概览
 * @url /app/1.1/myaccount/earning/chart
 */

exports.myaccountOverview = function(form) {
  const url = '/app/1.1/myaccount/earning/chart';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};
