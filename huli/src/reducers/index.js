/* @flow weak */
const combineReducers = require('redux').combineReducers;
// const overview = require('./myaccount/overviewReducer')['default'];
const userLogin = require('./login/loginReducer').getLoginData;
const userBase = require('./userBase/userBaseReducer').UserBaseInfo;
const capitalInfo = require('./myaccount/capital/capitalReducer').getCapitalInfo;
const userLevelInfo = require('./myaccount/userSafeLevel/userSafeLevelReducer').getUserLevelInfo;
// const scoreTotal = require('./myaccount/integral/scoreTotalReducer').getScoreTotal;
const signTodayData = require('./myaccount/integral/signTodayReducer').getSingToday;
const isSign = require('./myaccount/integral/signInReducer').getSignInData;
const welfareData = require('./myaccount/welfare/welfareReducer').getWelfareInfo;
const calendarMonth = require('./myaccount/calendar/calendarMonthReducer').getcalendarMonth;
const calendarDay = require('./myaccount/calendar/calendarDayReducer').getcalendarDay;
const investingList = require('./investList/investing/investingReducer').getInvestingList;
const completeList = require('./investList/complete/completeReducer').getCompleteList;
const questionList = require('./questions/questionsReducer').getQuestionList;
const rankingList = require('./ranking/rankingReducer').getRankingList;
const bannerData = require('./banner/bannerReducer').getbannerData;
const notcieData = require('./notice/noticeReducer').getNoticeList;
const userHeadData = require('./userHead/userHeadReducer').getUserHead;
const xjgData = require('./myaccount/xjg/myaccountXjgReducer').xjgDataList;
const xjgTabList = require('./myaccount/xjg/tabList/myaccountXjgTabReducer').xjgtabList;
const hqDetail = require('./xjg/xjgReducer').getHQDetail;
const popup = require('./popup/popupReducer').popup;
const xjgChartData = require('./xjgChart/xjgChartReducer').getXJGChartData;
// const welfarePopupData = require('./welfarePopup/welfarePopupReducer').getWelfarePopup;
// const birthdayPopupData = require('./birthdayPopup/birthdayPopupReducer').getBirthdayPopup;
const monthBillData = require('./monthbill/monthbillReducer').monthBillData;
const monthBillHeadList = require('./monthbill/monthbillReducer').monthBillHeadList;
const monthBillPostData = require('./monthbill/monthbillReducer').monthBillPostData;
const sysTimeData = require('./sysTime/sysTimeReducer').getSysTime;
const lcPopup = require('./popup/lcpop/lcPopupReducer').lcPopup;
const lcData = require('./myaccount/lc/myaccountLcReducer').lcDataList;
const wdPopup = require('./popup/wdpop/wdPopupReducer').wdPopup;
const wdData = require('./myaccount/wd/myaccountWdReducer').wdDataList;
const newPop = require('./popup/newpop/newpopReducer').newpop;
const takeNowData = require('./collocation/takeNowReducer').getTakeNowData;
const lcDetailsData = require('./details_jjs/detailsReducer').LcDetailsData;
const UserLevelData = require('./details_jjs/detailsReducer').userLevelData;
const CalculateData = require('./details_jjs/detailsReducer').CalculateData;
const sureBuy = require('./details_jjs/detailsReducer').sureBuy;
const sureBuyTrans = require('./details_jjs/detailsReducer').sureBuyTrans;
const investPerList = require('./details_jjs/detailsReducer').investPerList;
const buyState = require('./details_jjs/detailsReducer').buyState;
const popBanner = require('./details_jjs/detailsReducer').popBanner;
const JjsPopData = require('./details_jjs/detailsReducer').JjsPopData;
const userFuli = require('./details_jjs/detailsReducer').userFuli;
const TransLeftTime = require('./details_jjs/detailsReducer').TransLeftTime;
const openAccountData = require('./collocation/openAccountReducer').openAccountData;
const changeCardData = require('./collocation/changeCardReducer').changeCardData;
const bankCardData = require('./myaccount/bankCard/bankCardReducer').bankCardData;
const risk = require('./risk/riskReducer').risk;

const rootReducer = combineReducers({
  userLogin,
  // overview,
  capitalInfo,
  userLevelInfo,
  bannerData,
  userBase,
  signTodayData,
  isSign,
  calendarMonth,
  welfareData,
  investingList,
  completeList,
  questionList,
  rankingList,
  calendarDay,
  notcieData,
  userHeadData,
  xjgData,
  hqDetail,
  popup,
  xjgChartData,
  xjgTabList,
  // welfarePopupData,
  // birthdayPopupData,
  monthBillData,
  monthBillHeadList,
  monthBillPostData,
  sysTimeData,
  lcPopup,
  lcData,
  wdPopup,
  wdData,
  takeNowData,
  lcDetailsData,
  UserLevelData,
  CalculateData,
  JjsPopData,
  openAccountData,
  changeCardData,
  sureBuy,
  sureBuyTrans,
  buyState,
  investPerList,
  newPop,
  userFuli,
  TransLeftTime,
  popBanner,
  bankCardData,
  risk
});

module.exports = {
  rootReducer
};
// export default rootReducer;
