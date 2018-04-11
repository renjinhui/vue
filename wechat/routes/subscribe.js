'use strict';

const router = require('express').Router();
const controller = require('../controllers').subscribe;

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

module.exports = router;
