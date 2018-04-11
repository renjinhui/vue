'use strict';

const router = require('express').Router();
const controller = require('../controllers').service;

/* GET 服务签名校验 */
router.get('/', controller.checkSignature);
/* POST 消息接受 */
router.post('/', controller.messageReplay);
/* GET 微信JSSDK签名 */
router.get('/jssign', controller.jsSignature);
/* GET 获取自定义菜单 */
router.get('/getmenu', controller.getMenu);
/* POST 设置自定义菜单 */
router.get('/setmenu', controller.setMenu);
/* GET 获取用户基本信息 */
router.get('/getuser', controller.getUserInfo);
/* POST 服务号发送消息 */
router.post('/message', controller.sendMessage);
/* GET 获取模板消息列表 */
router.get('/gettemplate', controller.getTemplate);
/* GET 获取二维码 */
router.get('/getqrcode', controller.getQRCode);

// 解绑搜易贷账号与微信
router.post('/unbindwx', controller.unbindWx);

module.exports = router;
