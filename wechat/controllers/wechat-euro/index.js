'use strict';

const Data = require('../../data');
const soeasyAPI = require('../../@syd/ramiel');
const matchConfig = require('./match');

const API = new soeasyAPI();

// CORS DEBUG
exports.CORSFilter = (req, res, next) => {
  const reqOrigin = req.get('origin');
  if (/(\.souyidai\.com)|(localhost)/.test(reqOrigin)) {
    res.header('Access-Control-Allow-Origin', reqOrigin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

//POST /vaild 用户校验
exports.userVaild = (req, res) => {
  const username = req.body.username;
  console.log('[euro]: user vaild: %s', username);
  let resJSON = {};
  Data.euro.getUserPassport(username)
    .then((users) => {
      resJSON.errorCode = 0;
      resJSON.resCode = users.length === 0 ? 0 : 1;
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
};

//POST /login 用户登录
exports.userLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const unionid = req.cookies.syd_event_id;
  console.log('[euro]: user login: %s unionid: %s', username, unionid);
  API.login({
    username: username,
    password: password
  })
    .then((results) => {
      if (results.body.errorCode === 0) {
        const uid = results.body.data.userId;
        const name = `${username.substring(0, 3)}*****${username.substring(8, 11)}`;
        res.cookie('syd_auth_id', uid, {
          expires: 0,
          domain: '.souyidai.com'
        });
        res.cookie('syd_auth_name', name, {
          expires: 0,
          domain: '.souyidai.com'
        });
        Data.user.addUserByUnionId(unionid, {
          enable: true,
          souyidai_uid: uid,
          souyidai_username: name
        });
      }
      res.send(results.body);
    })
};

//GET /match 获取比赛信息
exports.getMatch = (req, res) => {
  const date = new Date();
  const uid = parseInt(req.cookies.syd_auth_id) || 0;
  console.log('[euro]: get match: %s', uid);
  let resJSON = {};
  Data.euro.getMatchByDate(date)
    .then((matchs) => {
      if (!matchs.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '没有比赛信息';
        res.send(resJSON);
        return;
      }
      resJSON.errorCode = 0;
      resJSON.data = matchs[0].toObject();
      resJSON.time = new Date().getTime();
      if (uid) {
        Data.euro.getUserGuessByNo(matchs[0].matchNo, uid)
          .then((userGuess) => {
            if (!userGuess.length) {
              resJSON.data.guessStatus = 0; // 未竞猜
            } else {
              resJSON.data.guessStatus = userGuess[0].status;
            }
            res.send(resJSON);
          }, (err) => {
            console.trace(err);
            resJSON.errorCode = 1;
            resJSON.errorMessage = '系统繁忙';
            res.send(resJSON);
          })
      } else {
        res.send(resJSON);
      }
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
};

//POST /match 存储比赛信息
exports.saveMatch = (req, res) => {
  const matchNo = parseInt(req.body.matchNo) || 0;
  const status = parseInt(req.body.status) || 0;
  const uid = parseInt(req.cookies.syd_auth_id) || 0;
  const unionid = req.cookies.syd_event_id || '';
  console.log('[euro]: guess match: %s no: %s status: %s', uid, matchNo, status);
  let resJSON = {};
  if (!uid || !status || !matchNo) {
    res.send({
      errorCode: 1,
      errorMessage: '参数错误'
    });
    return;
  }
  Data.euro.getUserGuessByNo(matchNo, uid)
    .then((userGuess) => {
      if (userGuess.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '你已经竞猜过本场比赛了';
        res.send(resJSON);
        return;
      }
      Data.euro.saveGuess(uid, matchNo, unionid, status)
      resJSON.errorCode = 0;
      resJSON.matchNo = matchNo;
      resJSON.status = status;
      res.send(resJSON);
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
};

//GET /match/history 历史比赛和竞猜
exports.getMatchHistory = (req, res) => {
  const date = new Date();
  const uid = parseInt(req.cookies.syd_auth_id) || 0;
  console.log('[euro]: match history: %s', uid);
  let resJSON = {};
  Data.euro.getMatchListByDate(date)
    .then((matchs) => {
      if (!matchs.length) {
        resJSON.errorCode = 1;
        resJSON.errorMessage = '没有比赛信息';
        res.send(resJSON);
        return;
      }
      resJSON.errorCode = 0;
      resJSON.data = matchs.map((el) => el.toObject());
      if (uid) {
        Data.euro.getGuessByUid(uid)
          .then((userGuess) => {
            if (userGuess.length) {
              for (let i = 0; i < userGuess.length; i++) {
                resJSON.data[userGuess[i].matchNo - 1].guessStatus = userGuess[i].status;
              }
            }
            resJSON.data.reverse();
            res.send(resJSON);
          }, (err) => {
            console.trace(err);
            resJSON.errorCode = 1;
            resJSON.errorMessage = '系统繁忙';
            res.send(resJSON);
          })
      } else {
        resJSON.data.reverse();
        res.send(resJSON);
      }
    }, (err) => {
      console.trace(err);
      resJSON.errorCode = 1;
      resJSON.errorMessage = '系统繁忙';
      res.send(resJSON);
    })
};


// GET 获取比赛列表
exports.getAllMatch = (req, res) => {
  Data.euro.getAllMatch(matchConfig)
    .then((matchs) => {
      res.send(matchs);
    }, (err) => {
      console.trace(err);
    })
};

const euroTeams = {
  '阿尔巴尼亚': 'ALB',
  '奥地利': 'AUT',
  '比利时': 'BEL',
  '克罗地亚': 'CRO',
  '捷克共和国': 'CZE',
  '英格兰': 'ENG',
  '法国': 'FRA',
  '德国': 'GER',
  '匈牙利': 'HUN',
  '冰岛': 'ISL',
  '意大利': 'ITA',
  '北爱尔兰': 'NIR',
  '波兰': 'POL',
  '葡萄牙': 'POR',
  '爱尔兰': 'IRL',
  '罗马尼亚': 'ROU',
  '俄罗斯': 'RUS',
  '斯洛伐克': 'SVK',
  '西班牙': 'ESP',
  '瑞典': 'SWE',
  '瑞士': 'SUI',
  '土耳其': 'TUR',
  '乌克兰': 'URK',
  '威尔士': 'WAL',
};
const md5Valid = '2a695ee25636fecd7ca80ae5222dc6cd';
// POST /admin/insert 插入比赛
exports.insertMatch = (req, res) => {
  var _md5 = req.cookies.syd_euro_admin_id;
  if(_md5 != md5Valid){
    res.send({
      errorCode: 1,
      errorMessage: '你没有操作权限！'
    });
    return;
  }

  let _matchNo = req.body.matchNo;
  let _startTime = req.body.matchStartTime;
  let _endTime = req.body.matchEndTime;
  let _name1 = req.body.team1_name;
  let _name2 = req.body.team2_name;
  let _team = [{ "name": _name1, "flagUrl": "https://weixin.souyidai.com/euro2016/flag/" + euroTeams[_name1] + ".png"},
              { "name": _name2, "flagUrl": "https://weixin.souyidai.com/euro2016/flag/" + euroTeams[_name2] + ".png"}];

  console.log('[euro] insert matchNo: %s, matchStartTime: %s, matchEndTime: %s, team1_name: %s, team2_name: %s', _matchNo, _startTime, _endTime, _name1, _name2);
  if(!_matchNo || !_startTime || !_endTime || !_name1 || !_name2){
    res.send({
      errorCode: 1,
      errorMessage: '参数错误'
    });
    return;
  }
  Data.euro.insertMatch([{
    matchNo: _matchNo,
    matchStartTime: _startTime,
    matchEndTime: _endTime,
    team: _team,
    result: 0
  }])
    .then((result) => {
      console.log('[euro] insert_success matchNo: %s, matchStartTime: %s, matchEndTime: %s, team1_name: %s, team2_name: %s', _matchNo, _startTime, _endTime, _name1, _name2);
      res.send({
        errorCode: 0
      });
    }, (err) => {
      console.trace(err);
      res.send({
          errorCode: -1,
          errorMessage: '插入比赛信息失败'
      });
    })
};

// POST /admin/update 更新比赛结果
exports.updateMatch = (req, res) => {
  console.log('[euro] update match result matchNo: %s', req.body.matchNo);
  var _md5 = req.cookies.syd_euro_admin_id;
  if(_md5 != md5Valid){
    res.send({
      errorCode: 1,
      errorMessage: '你没有操作权限！'
    });
    return;
  }

  Data.euro.getMatchByNo(req.body.matchNo)
    .then((matchs) => {
      if(!matchs.length){
        res.send({
          errorCode: 1,
          errorMessage: '没有查询到数据，请检查场次信息是否正确！'
        });
        return;
      }
      let _curMatch = matchs[0];
      let _matchNo = req.body.matchNo;
      _curMatch.result = req.body.result;
      console.log('[euro] update match result matchNo: %s, result: %s', _matchNo, _curMatch.result);
      Data.euro.updateMatch(req.body.matchNo, _curMatch)
      .then((result) => {
        console.log('[euro] update match result success matchNo: %s, result: %s', _matchNo, _curMatch.result);
        res.send({
          errorCode: 0
        });
      }, (err) => {
        console.trace(err);
        res.send({
            errorCode: -1,
            errorMessage: '更新比赛信息失败'
        });
      });

    });



};


// POST /admin/editMatch 更新比赛信息（不包含结果）
exports.editMatch = (req, res) => {
  console.log('[euro] edit match matchNo: %s', req.body.matchNo);

  var _md5 = req.cookies.syd_euro_admin_id;
  if(_md5 != md5Valid){
    res.send({
      errorCode: 1,
      errorMessage: '你没有操作权限！'
    });
    return;
  }

  Data.euro.getMatchByNo(req.body.matchNo)
    .then((matchs) => {
      if(!matchs.length){
        res.send({
          errorCode: 1,
          errorMessage: '没有查询到数据，请检查场次信息是否正确！'
        });
        return;
      }
      let _curMatch = matchs[0];
      let _matchNo = req.body.matchNo;
      _curMatch.result = req.body.result;
      _curMatch.matchStartTime = req.body.matchStartTime;
      _curMatch.matchEndTime = req.body.matchEndTime;
      _curMatch.team[0].name = req.body.name1;
      _curMatch.team[0].flagUrl = "https://weixin.souyidai.com/euro2016/flag/" + euroTeams[req.body.name1] + ".png";
      _curMatch.team[1].name = req.body.name2;
      _curMatch.team[1].flagUrl = "https://weixin.souyidai.com/euro2016/flag/" + euroTeams[req.body.name2] + ".png";

      console.log('[euro] edit match matchNo: %s, matchStartTime: %s, matchEndTime: %s, team1_name: %s, team1_flagurl: %s, team2_name: %s, team2_flagurl: %s', _matchNo, _curMatch.matchStartTime, _curMatch.matchEndTime, _curMatch.team[0].name, _curMatch.team[0].flagUrl, _curMatch.team[1].name, _curMatch.team[1].flagUrl);
      Data.euro.updateMatch(req.body.matchNo, _curMatch)
      .then((result) => {
        console.log('[euro] edit match success matchNo: %s, result: %s', _matchNo, _curMatch.result);
        res.send({
          errorCode: 0
        });
      }, (err) => {
        console.trace(err);
        res.send({
            errorCode: -1,
            errorMessage: '更新比赛信息失败'
        });
      });

    });



};

// DELETE 删除比赛记录
exports.deleteMatch = (req, res) => {
  Data.euro.deleteMatch(matchConfig)
    .then((result) => {
      res.send(result);
    }, (err) => {
      console.trace(err);
    })
};
