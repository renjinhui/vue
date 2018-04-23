const {Myaccount} = require('./myaccount.component');
const {CapitalMain} = require('./capital/capital.component');
const {BankCard} = require('./bankCard/bankCard');
//充值部分
const {rechargeMain} = require('./recharge/recharge.component');
const {rechargeBox} = require('./recharge/recharge-Main');
const {LCHistory} = require('./recharge/recharge-lc-history');
const {WDHistory} = require('./recharge/recharge-wd-history');
// 理财部分
const {LcLendMain} = require('./lc/index.component');
const {LclistNormal} = require('./lc/normalList/list-normal.component');
const {LclistOpen} = require('./lc/openList/list-open.component');
const {LclistOver} = require('./lc/overList/list-over.component');
const {LclistDrain} = require('./lc/drainList/list-drain.component');

// 网贷部分
const {WdLendMain} = require('./wd/index.component');
const {WdlistNormal} = require('./wd/normalList/list-normal.component');
const {WdlistOpen} = require('./wd/openList/list-open.component');
const {WdlistOver} = require('./wd/overList/list-over.component');
const {WdlistDrain} = require('./wd/drainList/list-drain.component');

//日日盈部分
const {RryModal} = require('./rry/rry-components');
const {RryIncome} = require('./rry/rry-income');
const {RryOutput} = require('./rry/rry-output');
const {RryProfit} = require('./rry/rry-profit');

module.exports = {
    Myaccount,
    CapitalMain,
    BankCard,
    rechargeMain,
    rechargeBox,
    LCHistory,
    WDHistory,
    LcLendMain,
    LclistNormal,
    LclistOpen,
    LclistOver,
    LclistDrain,
    WdLendMain,
    WdlistNormal,
    WdlistOpen,
    WdlistOver,
    WdlistDrain,
    RryModal,
    RryIncome,
    RryOutput,
    RryProfit
};