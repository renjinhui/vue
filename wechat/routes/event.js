'use strict';

const router = require('express').Router();
const controller = require('../controllers').event;

/* GET 活动首页 */
router.get('/', controller.indexView);
/* GET 活动首页 微信版本 */
router.get('/index_wechat', controller.indexWechatView);
/* POST 活动首页 */
router.post('/', controller.indexData);
/* GET 摇一摇页面 */
router.get('/shake', controller.shakeView);
/* GET 摇一摇获奖 */
router.get('/shake/gift', controller.shakeGiftView);
/* GET 摇一摇奖品页 微信版本 */
router.get('/shake/gift_wechat', controller.shakeGiftWechatView);
/* POST 摇一摇获奖 */
router.post('/shake', controller.shakeDo);
/* POST 摇一摇分享 */
router.post('/shake/share', controller.shakeShare);
/* POST 摇一摇注册成功 */
router.post('/shake/regist', controller.shakeRegist);
/* POST 摇一摇 用户状态检查 */
router.post('/shake/user_status', controller.shakeUserStatus);
/* GET 摇一摇 注册结果页 微信版本 */
router.get('/shake/result_wechat', controller.shakeResultView);
/* GET 活动 用户状态 */
router.get('/c/user/show', controller.cUserShow);
/* GET 活动 用户奖品信息 */
router.get('/c/user/reward', controller.cUserReward);
/* POST 活动 添加用户奖品 */
router.post('/c/user/reward', controller.cUserRewardAdd);
/* GET 活动 好友助力明细 */
router.get('/c/user/reward/list', controller.cUserRewardList);
/* POST 活动 添加游戏记录 */
router.post('/c/user/play', controller.cUserPlay);
/* POST 活动 验证用户以及下发短信 */
router.post('/c/user/bind', controller.cUserBind);
/* POST 活动 重复发送短信 */
router.post('/c/user/resend', controller.cUserResend);
/* POST 活动 注册 */
router.post('/c/user/reg', controller.cUserReg);
/* POST 活动 初始化 */
router.post('/c/init', controller.cInit);
/* POST 325活动 */
router.post('/eventnew', controller.eventNew);

module.exports = router;
