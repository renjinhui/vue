'use strict';

const mongo = require('./mongo');

let annualLoginSchema = new mongo.Schema({
  openid: {
    type: String,
    unique: true
  },
  employeeId: {
    type: String,
    unique: true
  },
  name: String,
  headimgurl: String
});

const AnnualLogin = mongo.model('AnnualLogin', annualLoginSchema);

exports.findLoginByOpenId = (openid) => {
  return AnnualLogin.find({
    'openid': openid
  }).exec();
};

exports.findLoginByEmployeeId = (employeeId) => {
  return AnnualLogin.find({
    'employeeId': employeeId
  }).exec();
};

exports.updateLoginLog = (openid, user) => {
  return AnnualLogin.update({
    'openid': openid
  }, user, {
    upsert: true
  }).exec();
};

exports.getAllLoginLog = () => {
  return AnnualLogin.find().exec()
};
