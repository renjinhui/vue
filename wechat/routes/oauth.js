'use strict';

const router = require('express').Router();
const controller = require('../controllers').oauth;

/* GET 用户OAuth */
router.get('/', controller.OAuth);

router.get('/authlink', controller.authLink);
router.get('/geturl', controller.getUrl);

router.get('/huliaccount', controller.huliAccount);

// 17.8.11 九宫格活动
// router.get('/ninegame', controller.activityLink);

// 17.8.20 三周年品牌活动
router.get('/wxactivity', controller.threeParty);
router.get('/partytask', controller.threePartyTask);

module.exports = router;
