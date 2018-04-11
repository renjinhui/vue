'use strict';

const Q = require('q');
const config = require('../config');
const redis = require('redis');
const sentinel = require('redis-sentinel');

const  endpoints = config.redis;
var opts = {}; // Standard node_redis client options
var masterName = 'mymaster';
var client = sentinel.createClient(endpoints, masterName, opts);

// let client = redis.createClient(config.redis.port, config.redis.host, config.redis.options);


client.on('ready', (err) => {
  console.log('[data]: redis ready');
});
client.on("error", (err) => {
  console.log("[data]: redis error" + err);
});

//redis promise 封装
exports.setCache = (key, val) => {
  let deferred = Q.defer();
  client.set(key, val, (err, results) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
};
exports.getCache = (key) => {
  let deferred = Q.defer();
  client.get(key, (err, results) => {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(results);
    }
  });
  return deferred.promise;
};
