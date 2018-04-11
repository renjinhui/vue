'use strict';

const router = require('express').Router();
const controller = require('../controllers').billion;

/* GET 成交额数据 */
router.get('/api/sydIndexData', controller.sydIndexData);
/* GET 投资排行榜 */
router.get('/api/investRankList', controller.investRankList);
/* POST 百亿竞猜活动 */
router.post('/guess/userVaild', controller.userVaild);
/* POST 百亿竞猜活动 */
router.post('/guess', controller.guess);
/* POST 邀请好友活动 验证 */
router.post('/invite/userVaild', controller.inviteUserVaild);
/* POST 邀请好友活动 登录 */
router.post('/invite/login', controller.inviteLogin);
/* POST 邀请好友活动 关系链 */
router.post('/invite/relation', controller.inviteRelation);
/* POST 邀请好友活动 关系链 激活*/
router.post('/invite/relation/active', controller.inviteRelationActive);
// 0状态
router.post('/api/stateOfZeros', controller.stateOfZeros);
// 激活第十个0
router.post('/api/exchange', controller.exchange);
// 拿到积分
router.post('/api/getScore', controller.getScore);
// 拿到帮你投资的朋友
router.post('/api/getInvestedFriends', controller.getInvestedFriends);
// 拿到帮你点亮0的微信粉丝
router.post('/api/getWechatFans', controller.getWechatFans);
// 拿到瓜分资金
router.post('/api/getTotalPrize', controller.getTotalPrize);
// 拿到帮你点亮0的微信粉丝
router.post('/api/getLoginLog', controller.getLoginLog);
// 拿到瓜分资金
router.post('/api/insertLoginLog', controller.insertLoginLog);

module.exports = router;
