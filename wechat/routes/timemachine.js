'use strict';

const router = require('express').Router();
const controller = require('../controllers').timemachine;

/* POST 获取用户数据 */
router.post('/', controller.getUserData);
/* POST 用户分享记录 */
router.post('/share', controller.createUserEvent);
/* POST 验证手机号 */
router.post('/share/vaild', controller.vaildUserName);
/* POST 注册 */
router.post('/share/regist', controller.regist);
/* POST 登录 */
router.post('/share/login', controller.login);
/* POST 帮助好友 */
router.post('/share/help', controller.helpFriend);

module.exports = router;
