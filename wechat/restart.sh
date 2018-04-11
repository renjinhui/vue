#!/bin/bash

cd /opt/vhost/ol.static.wechat.souyidai.com/@syd/captcha/
npm install --registry=https://registry.npm.taobao.org
cd /opt/vhost/ol.static.wechat.souyidai.com/@syd/ramiel/
npm install --registry=https://registry.npm.taobao.org
cd /opt/vhost/ol.static.wechat.souyidai.com/
npm install --registry=https://registry.npm.taobao.org
pm2 startOrRestart processesPRO.json
