'use strict';

const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');

const API = new soeasyAPI();

const userData = (syd_auth_verify, body) => {
  let data = {
    from: 'wechat'
  };
  let auth_cookie = syd_auth_verify || '';
  if (auth_cookie !== '') {
    data.uid = auth_cookie.split('|')[0];
    data.sydaccesstoken = auth_cookie.split('|')[1];
  }
  for (let i in body) {
    data[i] = body[i];
  };
  return data;
};

//POST / 标的列表
exports.getBidList = (req, res) => {
  const data = userData(req.cookies.syd_auth_verify, req.body);
  API.bidList(data)
    .then((results) => {
      res.send(results.body);
    });
};
