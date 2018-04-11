'use strict';
const config = require('../../config');

module.exports = (message, type, api) => {
  const textConfig = config[`${type}Text`];
  const content = message.Content;

  let regStr = '';
  let regArr = [];
  for (let key in textConfig) {
    regStr = regStr + `(${key})|`;
    regArr.push(key);
  };
  regStr = regStr.substring(0, regStr.length - 1);
  const searchReg = new RegExp(regStr);
  const result = content.match(searchReg);
  if (!result) {
    return textConfig['default'];
  } else {
    for (let i = 1; i < result.length; i++) {
      if (result[i] === result[0]) {
        return textConfig[regArr[i - 1]];
      }
    };
  }
};
