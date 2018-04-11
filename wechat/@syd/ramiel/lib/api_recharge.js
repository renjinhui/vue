'use strict';

/**
 * recharge 银行卡信息接口
 * @url /account/pay/card_info
 */

exports.cardInfo = function(form, cookies) {
  const url = '/account/pay/card_info';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.mPrefix + url, form, headers);
};

/**
 * recharge 连连充值接口
 * @url /account/pay/do_recharge
 * @param {String} amount
 */

exports.recharge = function(form, cookies) {
  const url = '/account/pay/do_recharge';
  let headers = {
    Cookie: cookies
  };
  return this.request(this.mPrefix + url, form, headers);
};
