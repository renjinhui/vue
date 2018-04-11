'use strict';

class API {
  constructor() {
    this.prefix = 'http://www.souyidai.com';
    this.appPrefix = 'http://app.souyidai.com';
    this.passportPrefix = 'http://passport.souyidai.com';
    this.mPrefix = 'http://m.souyidai.com';
    this.eventPrefix = 'http://mevents.souyidai.com';
    this.passportVersion = '1.0';
    this.passportToken = 'j7dAuXMhpE76LRrETe8bTQ';
    this.appToken = 'f91f65e1c42d58822a94a7460361e5d7';
    this.connectPrefix = 'http://weixin.souyidai.com/wx-ws';
    this.wxAuthToken = 'Cz8WZj4lf9FPQRXH2TfGI199sf55vc8dbAhGJDPEsxH';
  }
};

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * // 媒体管理（上传、下载）
 * API.mixin(require('./lib/api_media'));
 * ```
 * @param {Object} obj 要合并的对象
 */
API.mixin = function(obj) {
  for (let key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: ' + key);
    }
    API.prototype[key] = obj[key];
  }
};

module.exports = API;
