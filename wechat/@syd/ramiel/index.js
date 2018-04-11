'use strict';
var API = require('./lib/api_common');

// util方法
API.mixin(require('./utils'));

// passport相关接口
API.mixin(require('./lib/api_passport'));
// account相关接口
API.mixin(require('./lib/api_account'));
// recharge相关接口
API.mixin(require('./lib/api_recharge'));
// bid相关接口
API.mixin(require('./lib/api_bid'));
// event相关接口
API.mixin(require('./lib/api_event'));
// connect相关接口
API.mixin(require('./lib/api_connect'));
// billion相关接口
API.mixin(require('./lib/api_billion'));

module.exports = API;
