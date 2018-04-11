'use strict';
const mysql = require('mysql');
const config = require('../config');
const Q = require('q');

let connect = () => {
  pool = mysql.createPool(config.mysql.dbFour);
  pool.on('error', errorHandle);
};

let errorHandle = (err) => {
  if (err) {
    // 如果是连接断开，自动重新连接
    connect();
    console.error('[data]: mysql error' + err.stack || err);
  }
};

let pool;
connect();

//mysql promise 封装
exports.query = (sql, params) => {
  let deferred = Q.defer();
  pool.query(sql, params, (err, results) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
};
