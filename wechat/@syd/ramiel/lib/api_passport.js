'use strict';

/**
 * passport 登录接口
 * @url /appLogin
 * @param {String} username
 * @param {String} password
 * @param {String} kaptcha
 * @param {String} smscode
 * @param {String} sign
 * @param {String} version
 */

exports.login = function(form) {
  const url = '/appLogin';
  form.sign = this.passportSign(form);
  form.version = this.passportVersion;
  return this.request(this.passportPrefix + url, form);
}

/**
 * passport 注册接口
 * @url /appRegister
 * @param {String} username
 * @param {String} password
 * @param {String} confirmPassword
 * @param {String} smscode
 * @param {String} sign
 * @param {String} version
 */

exports.regist = function(form) {
  const url = '/appRegister';
  form.sign = this.passportSign(form);
  form.version = this.passportVersion;
  //微信渠道统计ID
  let headers = {
    'Cookie': 'SYD_YY_CHID=102290001',
    'Referer': 'https://weixin.souyidai.com/',
    'User-Agent': 'Wechat souyidai'
  };
  return this.request(this.passportPrefix + url, form, headers);
}

/**
 * passport 短信验证码接口
 * @url /appSendValidatorCode
 * @param {String} username
 */

exports.sendSms = function(form) {
  const url = '/appSendValidatorCode';
  form.sign = this.passportSign(form);
  form.version = this.passportVersion;
  return this.request(this.passportPrefix + url, form);
}

/**
 * passport 微信登录接口
 * @url /app/wxlogin
 * @param {String} url
 * @param {Number} uid
 */

exports.wxLogin = function(form) {
  const url = '/app/wxlogin';
  form.hash = this.sha1(form.uid + this.wxAuthToken)
  return this.request(this.passportPrefix + url, form);
}

/**
 * passport 验证手机号是否注册
 * @url /appCheckMobile
 * @param {String} mobile
 */

exports.vaildUsername = function(form) {
  const url = '/appCheckMobile';
  if (form.hasOwnProperty('username')) {
    form = {
      mobile: form.username
    };
  }
  form.sign = this.passportSign(form);
  form.version = this.passportVersion;
  return this.request(this.passportPrefix + url, form);
}

/**
 * passport 修改登录密码
 * @url /changePassword
 * @param {String} uid
 * @param {String} username
 * @param {String} oldpassword
 * @param {String} newpassword
 * @param {String} confirmPassword
 * @param {String} sign
 * @param {String} version
 */

exports.changePassword = function(form) {
  const url = '/changePassword';
  form.sign = this.passportSign(form);
  form.version = this.passportVersion;
  return this.request(this.passportPrefix + url, form);
}
