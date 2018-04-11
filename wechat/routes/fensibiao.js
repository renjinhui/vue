'use strict';

const router = require('express').Router();
const controller = require('../controllers').fensibiao;

/* POST 获取新手标 */
router.post('/', controller.getBidList);
router.get('/', controller.getBidList);

module.exports = router;
