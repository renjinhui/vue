'use strict';
let config = {};

let mysql = {};

let mysql_pro = {
  develop: {
    host: '10.10.23.180',
    user: 'soeasy',
    password: 'soeasy',
    database: 'soeasy_event'
  },
  dbEvent: {
    host: 'soeasyeventdb',
    user: 'soeasy',
    password: 'soeasy',
    database: 'soeasy_event'
  },
  dbFour: {
    host: 'db4',
    user: 'report',
    password: 'soeasy2014',
    database: 'events'
  },
  dbTwo: {
    host: 'db2',
    user: 'soeasy_read',
    password: 'soeasy2014',
    // user: 'soeasy',
    // password: 'soeasy',
    database: 'soeasy_passport'
  },
  dbBillion: {
    host: 'soeasyeventdb',
    user: 'soeasy',
    password: 'soeasy',
    database: 'soeasy_tenbillion'
  }
};
let mysql_nrc = {
  develop: {
    host: '10.10.23.180',
    user: 'soeasy',
    password: 'soeasy',
    database: 'soeasy_event'
  },
  dbEvent: {
    host: 'soeasyeventdb',
    user: 'soeasy_rc_admin',
    password: 'Soeasy_rc',
    database: 'soeasy_event'
  },
  dbFour: {
    host: 'db4',
    user: 'report',
    password: 'soeasy2014',
    database: 'events'
  },
  dbTwo: {
    host: 'db2_rc.souyidai.cn',
    user: 'soeasy_rc_r',
    password: 'Soeasy_rc',
    // user: 'soeasy',
    // password: 'soeasy',
    database: 'soeasy_passport'
  },
  /*
  dbTwo: {
    host: 'db2',
    user: 'soeasy_read',
    password: 'soeasy2014',
    // user: 'soeasy',
    // password: 'soeasy',
    database: 'soeasy_passport'
  },*/
  dbBillion: {
    host: 'soeasyeventdb',
    user: 'soeasy',
    password: 'soeasy',
    database: 'soeasy_tenbillion'
  }
};

const redis = {
  develop: {
    host: '10.10.23.180',
    port: '6379',
    options: {}
  },
  rc: {
    host: '10.10.23.180',
    port: '6379',
    options: {}
  },
  nrc: [
    {host: 'session_redis_sentinel1_rc.souyidai.cn', port: 26379},
    {host: 'session_redis_sentinel2_rc.souyidai.cn', port: 26379},
    {host: 'session_redis_sentinel3_rc.souyidai.cn', port: 26379}
  ],
  product: [
    {host: 'general_sentinel1.souyidai.cn', port: 26379},
    {host: 'general_sentinel2.souyidai.cn', port: 26379},
    {host: 'general_sentinel3.souyidai.cn', port: 26379}
  ]
  /*product: {
    host: '10.10.48.37',
    port: '6379',
    options: {}
  }*/
};

const mongo = {
  develop: {
    uri: 'mongodb://localhost/soeasy-wechat',
    options: {}
  },
  rc: {
    uri: 'mongodb://10.10.133.29/soeasy-wechat',
    options: {
      "user": "soeasy",
      "pass": "soeasy"
    }
  },
  nrc: {
    uri: "mongodb://risk-mongo01_rc.souyidai.cn/soeasy-wechat,mongodb://risk-mongo02_rc.souyidai.cn/soeasy-wechat,mongodb://risk-mongo03_rc.souyidai.cn/soeasy-wechat",
    options: {
      "useMongoClient": true,
      autoReconnect: true,
      poolSize: 3,
      promiseLibrary: global.Promise
    }
  },
  product: {
    uri: 'mongodb://fangdai-mongo01.souyidai.cn/soeasy-wechat,mongodb://fangdai-mongo02.souyidai.cn/soeasy-wechat,mongodb://fangdai-mongo03.souyidai.cn/soeasy-wechat',
    options: {
      "user": "wechat_admin",
      "pass": "HRst8_b6e)oY"
    }
  }
};

if (process.argv[2] === 'dev') {
  console.log('[env] dev');
  config.redis = redis.develop;
  config.mongo = mongo.develop;
} else if (process.argv[2] === 'rc') {
  console.log('[env] rc');
  config.redis = redis.rc;
  config.mongo = mongo.rc;
  config.mysql = mysql_nrc;
} else if (process.argv[2] === 'nrc') {
  console.log('[env] nrc');
  config.redis = redis.nrc;
  config.mongo = mongo.nrc;
  config.mysql = mysql_nrc;
} else {
  console.log('[env] pro');
  config.redis = redis.product;
  config.mongo = mongo.product;
  config.mysql = mysql_pro;
}

config.subText = require('./sub-text');
config.serveText = require('./serve-text');
config.subEvent = require('./sub-event');
config.serveEvent = require('./serve-event');
config.menu = require('./menu');
config.weixin = require('./app');

module.exports = config;
