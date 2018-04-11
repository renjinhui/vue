'use strict';

/**
 * 首页交易额数据
 * @url /export/invest/portalData2
 */

exports.sydIndexData = function() {
  const url = '/export/invest/portalData2';
  const form = {
    t: new Date().getTime()
  }
  return this.request(this.prefix + url, form);
};

/**
 * 投资排行榜数据
 * @url /ranking/100y/
 */

exports.investRankList = function(form) {
  const url = `/ranking/100y/${form}`;
  return this.request(this.prefix + url, {t: form});
};
