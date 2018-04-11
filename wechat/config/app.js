'use strict';

const config = {
  weixin: {
    subscribe: {
      appid: 'wxf151d5d3f466a2b7',
      appsecret: '41cc7a1d4c34d488c5318b5ff190796c',
      token: 'mPAMBEP9y00Yw3WfGiUfwAyFAabrwW5',
      encodingAESKey: '8yGP2HsZ2h1MGFCgAZvMdefCIVYCThsyxGDWJriOkRk'
    },
    service: {
      appid: 'wx5ff6c76bdf3b5cce',
      appsecret: 'efa2c7f87cd9de1983f7d804506d76c4',
      token: 'HRhaWkvmDdPKuZrgnimL5rKULweffw',
      encodingAESKey: 'HRhaWkvmDdPKuZrgnimL5rKULweffw8P2VRmZeKDOsx'
    }
  }
};

const config_nrc = {
  service: {
      appid: 'wxcd81ae19eafa1201',
      appsecret: '0b468f7cffb00b8ed2fccd145f372837',
      token: 'liuxuewentestwechattoken',
      encodingAESKey: 'HRhaWkvmDdPKuZrgnimL5rKULweffw8P2VRmZeKDOsx'
    }
}

if (process.argv[2] === 'nrc') {
  console.log('[env] nrc');
  config.weixin.service = config_nrc.service;
} else {
  console.log('[env] pro');
}

module.exports = config.weixin;