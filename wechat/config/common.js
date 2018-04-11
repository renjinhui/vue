'use strict';

const Q = require('q');
const request = require('request');
const crypto = require('crypto');

const appToken = 'f91f65e1c42d58822a94a7460361e5d7';

//app 签名
exports.appSign = function(uri) {
  let sign = appToken + uri;
  return {
    authToken: exports.md5(sign)
  };
};

//MD5
exports.md5 = (input) => {
  let md5 = crypto.createHash('md5');
  md5.update(input);
  return md5.digest('hex');
};

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