'use strict';

const Q = require('q');
const request = require('request');
const crypto = require('crypto');

//SHA1
exports.sha1 = (input) => {
  let sha1 = crypto.createHash('sha1');
  sha1.update(input);
  return sha1.digest('hex');
};
//MD5
exports.md5 = (input) => {
  let md5 = crypto.createHash('md5');
  md5.update(input);
  return md5.digest('hex');
};
//request promise 封装
exports.request = (url, form, headers, method) => {
  let deferred = Q.defer();
  request({
    url: url,
    method: method || 'POST',
    form: form,
    headers: headers,
    gzip: true
  }, (err, httpResponse, body) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      let res = {
        errorCode: 99,
        errorMessage: '系统繁忙'
      };
      try {
        res = JSON.parse(body);
      } catch (err) {
        console.error(body);
        console.trace(err);
        deferred.reject(new Error(err));
      }
      deferred.resolve({
        resp: httpResponse,
        body: res
      });
    }
  });
  return deferred.promise;
};
//passport 签名
exports.passportSign = function(params) {
  let sign = '';
  for (let i in params) {
    sign = sign + params[i];
  };
  sign = sign + this.passportVersion + this.passportToken;
  return exports.md5(sign);
};
//app 签名
exports.appSign = function(uri) {
  let sign = this.appToken + uri;
  return {
    authToken: exports.md5(sign)
  };
};
//form to querystring
exports.form2query = function(form) {
  let queryString = '?';
  for (let i in form) {
    queryString += i + '=' + encodeURIComponent(form[i]) + '&';
  }
  return queryString;
}
