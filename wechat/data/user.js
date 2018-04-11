'use strict';

const mongo = require('./mongo');

let userSchema = new mongo.Schema({
  souyidai_uid: {
    type: Number,
    unique: true
  },
  souyidai_username: String,
  openid_sub: String,
  openid_serve: String,
  unionid: String,
  subscribe: {
    type: Boolean,
    default: false
  },
  nickname: String,
  sex: Number,
  language: String,
  country: String,
  province: String,
  city: String,
  headimgurl: String,
  subscribe_time: Date,
  update_time: {
    type: Date,
    default: Date.now
  },
  enable: Boolean
});
const User = mongo.model('User', userSchema);

// 查询用户by openid
exports.findUserByOpenId = (openid) => {
  return User.find({
    $or: [{
      'openid_sub': openid
    }, {
      'openid_serve': openid
    }]
  }).exec();
};
//通过unionid查找绑定用户
exports.findUserByUnionId = (unionid) => {
  return User.find({
    'unionid': unionid,
    'enable': true
  }).exec();
};
//通过unionid查找用户
exports.findByUnionId = (unionid) => {
  return User.find({
    'unionid': unionid
  }).exec();
};
//通过openid查找绑定用户
exports.findEnableUserByOpenId = (openid) => {
  return User.find({
    $or: [{
      'openid_sub': openid
    }, {
      'openid_serve': openid
    }],
    'enable': true
  }).exec();
};
//通过unionid查找绑定用户
exports.findEnableUserByUnionId = (unionid) => {
  return User.find({
    'unionid': unionid,
    'enable': true
  }).exec();
};
//通过一组unionid查找用户
exports.findUserByUnionIdArray = (unionidArray) => {
  return User.find({
    'unionid': {
      $in: unionidArray
    }
  }).exec();
};
//通过搜易贷uid查找绑定用户
exports.findUserByUid = (uid) => {
  return User.find({
    'souyidai_uid': uid
  }).exec();
};
// 绑定用户帐号整合方法
exports.addAndUpdateUser = (openid, type, uid, username) => {
  return User.find({
      $or: [{
        'openid_sub': openid
      }, {
        'openid_serve': openid
      }]
    })
    .exec()
    .then((users) => {
      if (users.length !== 0) {
        let id = users[0]._id;
        return User.update({
          '_id': id
        }, {
          'enable': true,
          'souyidai_uid': uid,
          'souyidai_username': username
        }).exec();
      } else {
        if (type === 'sub') {
          return User.create({
            'openid_sub': openid,
            'souyidai_uid': uid,
            'souyidai_username': username,
            'enable': true
          });
        } else {
          return User.create({
            'openid_serve': openid,
            'souyidai_uid': uid,
            'souyidai_username': username,
            'enable': true
          });
        }
      }
    });
};
// 绑定用户帐号
exports.addUser = (openid, type, uid, username) => {
  if (type === 'sub') {
    return User.create({
      'openid_sub': openid,
      'souyidai_uid': uid,
      'souyidai_username': username,
      'enable': true
    });
  } else {
    return User.create({
      'openid_serve': openid,
      'souyidai_uid': uid,
      'souyidai_username': username,
      'enable': true
    });
  }
};
// 更新已有用户帐号
exports.updateUser = (id, souyidaiUser) => {
  return User.update({
    '_id': id
  }, {
    'enable': true,
    'souyidai_uid': souyidaiUser.uid,
    'souyidai_username': souyidaiUser.username
  }).exec();
};
// 解绑之前的微信绑定搜易贷的帐号
exports.unbindByOpenid = (openid) => {
  return User.update({
    'openid_serve': openid
  }, {
    $set: { 'enable': false }
  }, {
    multi: true
  }).exec();
};
// 更新已有用户帐号
exports.updateUserByUid = (id, souyidaiUser) => {
  return User.update({
    '_id': id
  }, {
    'enable': true,
    'souyidai_uid': souyidaiUser.uid,
    'souyidai_username': souyidaiUser.username,
    'openid_serve': souyidaiUser.openid
  }).exec();
};
// 通过unionid绑定帐号
exports.addUserByUnionId = (unionid, userInfo) => {
  return User.update({
    'unionid': unionid
  }, {
    $set: userInfo
  }).exec();
};
// 存储微信信息
exports.updateUserFromWeixin = (userInfo) => {
  if (userInfo.subscribe_time) {
    userInfo.subscribe_time = userInfo.subscribe_time * 1000;
  }
  return User.update({
    $or: [{
      'openid_sub': userInfo.openid
    }, {
      'openid_serve': userInfo.openid
    }, {
      'unionid': userInfo.unionid
    }]
  }, userInfo, {
    upsert: true
  }).exec();
};
// 用户解除绑定
exports.disableUser = (openid) => {
  return User.update({
    $or: [{
      'openid_sub': openid
    }, {
      'openid_serve': openid
    }]
  }, {
    'enable': false
  }).exec();
};
