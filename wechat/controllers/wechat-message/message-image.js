'use strict';
const config = require('../../config');

module.exports = (message, type) => {
  if (type === 'sub') {
    // return config.subText['default'];
    return '图片收到咯~么么哒~';
  } else {
    // return config.subText['default'];
    return '图片收到咯~么么哒~';
  }
};
