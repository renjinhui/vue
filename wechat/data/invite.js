'use strict';

const dbEvent = require('./dbEvent');
const soeasyAPI = require('../@syd/ramiel');
const redis = require('./redis');
const API = new soeasyAPI();

exports.getGiftLogByUid = (uid) => dbEvent.query('SELECT * FROM event_gift_log WHERE uid=? AND (gift_channel_code = "YQR30" OR gift_channel_code = "YQRFX10" OR gift_channel_code = "YQRFX100")', [uid])

exports.getRewardInfo = (uid, type) => {
  // AND (gift_channel_code = "YQR30" OR gift_channel_code = "YQRFX10" OR gift_channel_code = "YQRFX100")
  let sql = `SELECT * FROM event_gift_log WHERE uid=${uid}
            AND event_code = "regist-invite" `
            + ( type == 0? ``: ` AND gift_type=${type} `) +  
            `ORDER BY give_time DESC`;
  return dbEvent.query(sql);
}

exports.createInvite = (mobile, uid) => {
  const inviteChannel = 'regist-invite';
  const invitePrefix = `invite:passport:${inviteChannel}_`;
  const inviteHashid = API.sha1(mobile || uid + inviteChannel).substring(0, 12);

  let inviteInfo = {
    uid: uid || '',
    mobile: mobile || '',
    channel: inviteChannel,
    url: inviteHashid
  };
  //系统邀请
  if (uid === '10000') {
    inviteInfo.mobile = '11111111111';
  }
  console.log('[invite]: inviteinfo:%j', inviteInfo);
  redis.setCache(invitePrefix + inviteHashid, JSON.stringify(inviteInfo))
    .then(() => {
      API.request('https://passport.souyidai.com/invite', {
        invite: inviteHashid
      });
    })
    .catch((err) => {
      console.trace(err);
    });
  return inviteInfo;
};

exports.getInvite = (hashid) => {
  return redis.getCache(`invite:passport:regist-invite_${hashid}`)
};
