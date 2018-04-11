'use strict';

const flagPrefix = 'https://weixin.souyidai.com/euro2016/flag/';
const flagSuffix = '.png';
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

const match = [{
  matchNo: 1,
  matchStartTime: new Date('2016-05-31 00:00:00'),
  matchEndTime: new Date('2016-06-11 03:00:00'),
  team: [{
    name: '法国'
  }, {
    name: '罗马尼亚'
  }]
}, {
  matchNo: 2,
  matchStartTime: new Date('2016-06-11 06:00:00'),
  matchEndTime: new Date('2016-06-12 03:00:00'),
  team: [{
    name: '英格兰'
  }, {
    name: '俄罗斯'
  }]
}, {
  matchNo: 3,
  matchStartTime: new Date('2016-06-12 06:00:00'),
  matchEndTime: new Date('2016-06-13 03:00:00'),
  team: [{
    name: '德国'
  }, {
    name: '罗马尼亚'
  }]
}, {
  matchNo: 4,
  matchStartTime: new Date('2016-06-13 06:00:00'),
  matchEndTime: new Date('2016-06-14 03:00:00'),
  team: [{
    name: '比利时'
  }, {
    name: '意大利'
  }]
}, {
  matchNo: 5,
  matchStartTime: new Date('2016-06-14 06:00:00'),
  matchEndTime: new Date('2016-06-15 03:00:00'),
  team: [{
    name: '葡萄牙'
  }, {
    name: '冰岛'
  }]
}, {
  matchNo: 6,
  matchStartTime: new Date('2016-06-15 06:00:00'),
  matchEndTime: new Date('2016-06-16 03:00:00'),
  team: [{
    name: '法国'
  }, {
    name: '阿尔巴尼亚'
  }]
}, {
  matchNo: 7,
  matchStartTime: new Date('2016-06-16 06:00:00'),
  matchEndTime: new Date('2016-06-17 03:00:00'),
  team: [{
    name: '德国'
  }, {
    name: '波兰'
  }]
}, {
  matchNo: 8,
  matchStartTime: new Date('2016-06-17 06:00:00'),
  matchEndTime: new Date('2016-06-18 03:00:00'),
  team: [{
    name: '西班牙'
  }, {
    name: '土耳其'
  }]
}, {
  matchNo: 9,
  matchStartTime: new Date('2016-06-18 06:00:00'),
  matchEndTime: new Date('2016-06-19 03:00:00'),
  team: [{
    name: '葡萄牙'
  }, {
    name: '奥地利'
  }]
}, {
  matchNo: 10,
  matchStartTime: new Date('2016-06-19 06:00:00'),
  matchEndTime: new Date('2016-06-20 03:00:00'),
  team: [{
    name: '瑞士'
  }, {
    name: '法国'
  }]
}, {
  matchNo: 11,
  matchStartTime: new Date('2016-06-20 06:00:00'),
  matchEndTime: new Date('2016-06-21 03:00:00'),
  team: [{
    name: '俄罗斯'
  }, {
    name: '威尔士'
  }]
}, {
  matchNo: 12,
  matchStartTime: new Date('2016-06-21 06:00:00'),
  matchEndTime: new Date('2016-06-22 03:00:00'),
  team: [{
    name: '克罗地亚'
  }, {
    name: '西班牙'
  }]
}, {
  matchNo: 13,
  matchStartTime: new Date('2016-06-22 06:00:00'),
  matchEndTime: new Date('2016-06-23 03:00:00'),
  team: [{
    name: '意大利'
  }, {
    name: '爱尔兰'
  }]
}];

for (let i = 0; i < match.length; i++) {
  for (let j = 0; j < match[i].team.length; j++) {
    match[i].team[j].flagUrl = `${flagPrefix}${euroTeams[match[i].team[j].name]}${flagSuffix}`;
  }
}

module.exports = match;
