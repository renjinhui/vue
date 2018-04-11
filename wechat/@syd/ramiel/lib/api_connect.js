'use strict';

/**
 * connect 提供头像接口
 * @url /connect/user/head/upload
 * @param {String} uid
 * @param {String} url
 */

exports.HeadUpload = function(form) {
  const url = '/connect/user/head/upload';
  return this.request(this.connectPrefix + url, form);
}
