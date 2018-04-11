'use strict';

const router = require('express').Router();
const controller = require('../controllers').m;

/* 登录拦截 */
router.get('*', controller.loginInterceptor);
/* GET 注册页面 */
router.get('/regist', controller.registView);
/* POST 注册操作-短信 */
router.post('/registsms', controller.registSms);
/* POST 注册操作-注册 */
router.post('/regist', controller.regist);
/* GET 注册结果页面 */
router.get('/regist_result', controller.registResultView);
/* GET 实名认证 */
router.get('/id5_auth', controller.id5AuthView);
/* GET 实名认证提示 */
router.get('/id5_tip', controller.id5TipView);
/* POST 实名认证-接口 */
router.post('/id5_auth', controller.id5Auth);
/* GET 首页 */
router.get('/', controller.indexView);
/* GET 更多项目 */
router.get('/more', controller.moreView);
/* GET 安全中心 */
router.get('/safe_center', controller.safeCenterView);
/* GET 我的资金-概览 */
// router.get('/my_money', controller.myMoneyView);
router.get('/my_money', controller.myMoneyTotalView);
/* GET 我的资金-概览 */
// router.get('/my_money_total', controller.myMoneyTotalView);
/* GET 我的资金-详情 */
router.get('/my_money/detail', controller.myMoneyDetailView);
/* POST 我的资金-详情-列表 */
router.post('/my_money/detail', controller.myMoneyDetail);
/* GET 我的投资-列表 */
router.get('/my_invest', controller.myInvestView);
/* GET 我的投资-详情 */
router.get('/my_invest/:bid_id', controller.myInvestItemView);
/* GET 买入项目 */
router.get('/invest/:bid_id', controller.id5AuthInterceptor);
router.get('/invest/:bid_id', controller.investView);
/* POST 买入项目 */
router.post('/invest', controller.invest);
/* GET 绑定卡 */
router.get('/bind_card', controller.bindCardView);
/* POST 银行卡信息 */
router.post('/card_info', controller.cardInfo);
/* GET 充值 */
router.get('/recharge', controller.id5AuthInterceptor);
router.get('/recharge', controller.rechargeView);
/* POST 充值-操作 */
router.post('/recharge', controller.recharge);
/* GET 投资结果 */
router.get('/invest_result', controller.investResultView);
/* GET 分享 */
router.get('/share/:unionid', controller.shareView);
/* GET 邀请好友 */
router.get('/invite', controller.inviteView);
/* GET 关于搜易贷 */
router.get('/about', controller.aboutView);


module.exports = router;
