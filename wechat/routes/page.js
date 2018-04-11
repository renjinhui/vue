'use strict';

const router = require('express').Router();
const controller = require('../controllers').page;

/* GET 帐号绑定 */
router.get('/account', controller.accountView);
/* POST 帐号绑定验证接口 */
router.post('/account', controller.accountBind);
/* POST 帐号取消绑定 */
router.post('/account_disable', controller.accountBindDisable);
/* GET 退出 */
router.get('/logout', controller.logOut);

/* GET 微信邀请-app */
router.get('/invite', controller.inviteAppView);
/* POST 微信邀请-app 邀请信息 */
router.post('/invite', controller.inviteAppInfo);
/* GET 微信邀请-app-详情 */
router.get('/invite/:uid', controller.inviteAppDetailView);
/* GET 邀请好友-app-邀请人奖励详细信息 */
router.post('/invite/reward', controller.inviteRewardInfo);
/* GET 微信邀请-weixin */
router.get('/invite_coupon/:inviteUrl', controller.inviteCouponView);
/* POST 微信邀请-weixin 检查受邀请人*/
router.post('/invite_coupon', controller.inviteCouponCheck);
/* GET 微信邀请-weixin-分享 */
router.get('/invite_share/:mobile', controller.inviteShareView);
/* POST 微信邀请-weixin-分享 生成分享*/
router.post('/invite_share', controller.inviteShareGenerate);
/* POST 年会登录*/
router.post('/annual', controller.annualLogin);


router.post('/bindwx', controller.accountBindNew);
router.post('/my_money_new', controller.myAccountMoney);
router.get('/getinfobyuid', controller.getInfoByUid);

module.exports = router;
