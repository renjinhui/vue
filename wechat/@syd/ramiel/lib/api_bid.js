'use strict';

/**
 * bid 标的进度接口
 * @url /app/bid/progress
 * @param {String} bidId 标ID
 */

exports.bidProgress = function(form) {
  const url = '/app/bid/progress';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * bid 投标接口
 * @url /app/bid/dobid
 * @param {String} bidId 标ID
 * @param {String} bidAmount 投标金额
 * @param {String} serverVersion 1.1
 * @param {String} interestTicketId 加息券ID
 */

exports.bid = function(form) {
  const url = '/app/bid/dobid';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};

/**
 * bid 标的列表接口
 * @url /app/1.1/bid/list/wx
 * @param {String} type 类型 more
 */

exports.bidList = function(form) {
  const url = '/app/1.1/bid/list/wx';
  return this.request(this.appPrefix + url, form, this.appSign(url));
};
