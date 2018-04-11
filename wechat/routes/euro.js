'use strict';

const router = require('express').Router();
const controller = require('../controllers').euro;

/* 跨域 DEBUG */
router.use(controller.CORSFilter);
/* POST 帐号 验证 */
router.post('/vaild', controller.userVaild);
/* POST 登录&绑定 */
router.post('/login', controller.userLogin);
/* GET 获取今日比赛信息 */
router.get('/match', controller.getMatch);
/* POST 用户竞猜 */
router.post('/match', controller.saveMatch);
/* GET 历史比赛和竞猜结果 */
router.get('/match/history', controller.getMatchHistory);

/* GET admin */
router.get('/admin', controller.getAllMatch);
/* POST admin */
router.post('/admin', controller.insertMatch);
/* post admin */
router.post('/admin/update', controller.updateMatch);
/* post admin/edit */
router.post('/admin/edit', controller.editMatch);
/* DELETE admin */
router.delete('/admin', controller.deleteMatch);

module.exports = router;
