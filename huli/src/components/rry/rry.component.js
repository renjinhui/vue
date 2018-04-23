const React = require('react');
const cs = require('classnames');
const _ = require('lodash');
const tools = require('./../../common/tool');
const util = require('./../../common/util');
const { connect } = require('react-redux');
const { Popup } = require('./../popup/index.popup');
const PopupCommon = require('../popup/common/index');
const { RiskQuestion } = require('../popup/risk/risk-questions.component');
const { RiskResult } = require('../popup/risk/risk-result.component');
const { RiskTestTip } = require('../popup/risk/risk-test.component');
const RryPopup = require('./rry-popup').RryPopupMain;
const RryInvest = require('./rry-invest').investMask;
const RrySuc = require('./rry-result').rrySucMask;
const userBaseActions = require('../../reducers/userBase/userBaseActions');
const Risk = require('../../reducers/risk/riskActions');
const RryCharts = require('./rry-echarts').RryCharts;
const Const = require('./../../common/const');
const DocumentTitle = require('react-document-title');

class RryDOMMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsState: 0,
            rateLists: [],
            startTime: '',
            endTime: '',
            promptText: '',
            chargeMaskState: false,
            rryIncomeMaskState: false,
            balanceObj: {},
            userOperaType: 1, //1 转入 2 转出 对应弹框状态传参
            investMoney: '',
            safeMaskState: false,
            showRiskQuestion: false,
            openMaskState:false,
            userStatus:{},
            directCard:{},
            rightDateInfo:{
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            transferStatus:{
                checkTransferIn:true,
                checkTransferOut:true
            },
            investObj:{
                type: 0,
                applyAmount:0,
                valiState:false
            },
            errorMessage:'',
            showError:false,
            rryInvestSucState:false,
            ajaxState:true,
            showRiskResult:false,
            riskSource:'',
            chargeResultState:false,
            showLogin: false,
            openMaskPwdState:false
        }
    }

    componentWillMount() {
        this.getInvestDate()
        this.getTransferStatus()
        this.initInfo()
        util.cookie.get('syd_name') && this.props.dispatch(userBaseActions.getUserBaseUserStatus());
        this.props.dispatch(userBaseActions.rateListData());
    }

    initInfo(){
        // this.getBalance();
        if(util.cookie.get('syd_name')){
            this.props.dispatch(userBaseActions.getUserBaseDirectCard());
            this.props.dispatch(userBaseActions.getUserBaseAccount());
        }
    }

    getTransferStatus(){
        const self = this;
        $.post({
            url:'/hqb/rry/check',
            data:{date:new Date().getTime()},
            success:function (data) {
                self.setState({transferStatus:data.data})
            }
        })
    }

    getBalance() {
        const self = this;
        $.post({
            url: '/hqb/rry/queryAutomaticStatus',
            data: {t: Math.random()},
            success: function (data) {
                if (data.errorCode == 0) {
                    self.setState({balanceObj: {autoInvestState: data.data}})
                }
            }
        })
    }


    componentWillReceiveProps(nextProps) {
        const {userStatus,directCard,rateLists} = nextProps;
        this.setState({userStatus:userStatus,directCard:directCard,rateLists:rateLists,riskSource:userStatus.riskSource});

    }

    componentDidMount(){
        //url参数state控制 页面刚进入时弹框状态
        const _state = util.cookie.get('state');
        if(_state==1){
            this.rryInvestMaskOpen();
        }
    }

    balanceChange() {
        const {balanceObj} = this.state, self = this;
        if (!balanceObj.agree) {
            window.alert('请先同意余额自动转入协议');
            return;
        } else {
            $.post({
                url: '/hqb/rry/automatic',
                data: {automatic: balanceObj.autoInvestState},
                success: function (data) {
                    if (data.errorCode == 0) {
                        window.alert('设置成功')
                        self.closePopup('chargeMaskState')
                    } else {
                        window.alert('设置失败，请稍后再试')
                        return;
                    }
                }
            })
        }
    }

    submitRiskTestQA(){
        const {dispatch} = this.props;
        dispatch(Risk.popupSubmitRiskQuestions(() => {
            dispatch(userBaseActions.getUserBaseUserStatus(()=>{
                this.closePopup('showRiskQuestion')
                this.setState({showRiskResult:true})
            }));
        }))
    }

    getInvestDate(){
        const self = this;
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date:new Date().getTime()},
            success:function (data) {
                self.setState({rightDateInfo:data.data})
            }
        })
    }

    rryInvestMaskOpen(){
        if(!util.cookie.get('syd_name')){
            this.setState({showLogin: true});
            return;
        }
        const {transferStatus:{checkTransferIn}} = this.state;
        const isCntTranIn = !checkTransferIn;
        if(isCntTranIn)return;
        const {userStatus,directCard,investMoney} = this.state;
        //是否进行开户
        if(userStatus.id5Status<3||directCard.isFetching==3){
            this.setState({openMaskState: true})
            return ;
        }
        //是否进行风险评估
        if(userStatus.riskSource==0){
            this.setState({safeMaskState: true})
            return ;
        }
        if(this.props.userStatus.isSetPayPassword=='false'){
            this.setState({openMaskPwdState:true})
            return;
        }
        //弹出转入弹框
        if(investMoney==''||parseFloat(investMoney.replace(/\,/g, ''))<1){
            this.setState({promptText:'请输入1元以上的金额'})
        }else {
            this.setState({rryIncomeMaskState: true})
        }
    }

    autoInvestFun() {
        this.setState({chargeMaskState: true});
    }

    goSafeCenter() {
        this.setState({showRiskQuestion:true})
        this.closePopup('safeMaskState')
    }

    goOpenCenter(){
        location.href='https://www.huli.com/hl/#/collocation/openAccount';
        this.closePopup('openMaskState')
    }

    closePopup(type) {
        let _state = {};
        _state[type] = false;
        this.setState(_state);
    }

    investMChange(e) {
        const self = this;
        let value = e.target.value;
        if(value>=1){
            this.setState({promptText: ''});
        }else {
            this.setState({promptText:'请输入1元以上的金额'})
        }
        this.setState({valiState: false});
        let reg = /[^\d.]/g,
            reg_f = /^\d+\.\d{1,}\.\d*$/,
            reg_ff = /^\d+\.\d{3,}$/;
        if (reg.test(value)) {
            value = value.replace(reg, "");
        }
        if (reg_ff.test(value)) {
            let dotIndex = value.indexOf(".");
            value = value.substr(0, dotIndex + 3);
        }
        if (reg_f.test(value)) {
            let dotIndex = value.indexOf(".");
            value = value.substr(0, dotIndex + 2);
        }
        this.setState({investMoney: value});
    }

    backData(e) {
        let value = e.target.value;
        value = value.replace(/\,/g, '')
        this.setState({investMoney: value})
    }

    formData(e) {
        let value = e.target.value;
        value != '' && this.setState({investMoney: tools.tansformMoney(value * 100)})
    }

    //调用结果弹窗
    onResult(data,obj,modal){
        const self = this;
        if(data.errorCode==0){
            //转入成功进程图
            self.setState({rryInvestSucState:true,resultState:true,investObj:_.assign({},obj),errorMessage:''})
            self.initInfo()
        } else if(data.errorCode == -4) {
            self.setState({rryInvestSucState: true,resultState:false,investObj: _.assign({},obj),errorMessage:data.errorMessage})
            self.initInfo()
        }else {
            self.setState({showError:true,errorMessage:data.errorMessage,ajaxState:true})
        }
        self.closePopup(modal)
    }

    render() {

        const {tabsState,rightDateInfo, rateLists, promptText, chargeMaskState, rryIncomeMaskState, balanceObj: {autoInvestState}, investMoney,investObj,transferStatus} = this.state,
            len = rateLists.length;
        let firstText = "", secondText = "";
        const _type = this.state.userStatus.riskStatus == 0? "never" : "expired";
        firstText = Const.risk[_type].firstText.replace("{0}", "保守型");
        secondText = Const.risk[_type].secondText.replace("{0}", "保守型");
        const isCntTranIn = !transferStatus.checkTransferIn;
        return (
            <DocumentTitle title='狐狸慧赚-活期'>
                <div className="huli-hq-T">
                    <div className="huli-hq-T-bg"></div>
                    <div className="huli-hq-TBox">
                        <div className="huli-hq-T-basic">
                            <h2 className="title">日日盈</h2>
                            <span className="hq-pro-intro">产品为通华财富（上海）基金销售有限公司销售的华夏财富宝货币A（基金代码000343）</span>
                            {/*<span className="hq-supply">由华安汇财通货币基金提供</span>*/}
                            <span className="hq-supply">市场有风险  投资需谨慎</span>
                            <RryCharts data={rateLists} />
                            <div className="hq-infos">
                                <ul className="hq-profit">
                                    <li className="profit-rate">
                                        <label>{len != 0 && parseFloat(rateLists[len - 1].perIncome).toFixed(4)}</label>
                                        <p>每万份收益(元)</p>
                                    </li>
                                    <li className="colLine"></li>
                                    <li className="profit-rate">
                                        <label>{len != 0 && parseFloat(rateLists[len - 1].perRate).toFixed(4)}</label>
                                        <p>七日年化收益(%)</p>
                                    </li>
                                </ul>
                                <div className="hq-other-info">
                                    <div className="info-group">
                                        <label>期限：</label>
                                        <span>随时存取</span>
                                    </div>
                                    <div className="info-group">
                                        <label>起投金额：</label>
                                        <span>1元起投，0.01元递增</span>
                                    </div>
                                    <div className="info-group rt">
                                        <span>低风险</span>
                                        <label>风险等级：</label>
                                    </div>
                                </div>
                                <div className="hq-other-form">
                                    <input type="text" placeholder="请输入1元以上金额，0.01元递增" value={investMoney}
                                           onChange={(e)=>{this.investMChange(e)}} onFocus={(e)=>{this.backData(e)}} onBlur={(e)=>{this.formData(e)}}/>
                                    <span className="input-unit">元</span>
                                    <a className={cs({'invest-btns orange':true,'disa':isCntTranIn})}
                                       title={isCntTranIn?codes.local_tooltip.rry_not_in_tip:''}
                                       onClick={()=>{this.rryInvestMaskOpen()}}>立即转入</a>
                                    {/*<a className="invest-btns auto" onClick={()=>{this.autoInvestFun()}}><i*/}
                                    {/*className="icon icon-auto"></i>自动转入</a>*/}
                                    <p className="promptText">{promptText}</p>
                                </div>
                            </div>
                        </div>
                        <div className="huli-hq-T-intro">
                            <ul className="huli-hq-T-tbs">
                                <li className={cs({'active': tabsState == 0})} onClick={ () => {
                                    this.changeTbState(0)
                                }}><a>产品介绍</a></li>
                                <li className={cs({'active': tabsState == 1})} onClick={ () => {
                                    this.changeTbState(1)
                                }}><a>产品详情</a></li>
                                <li className={cs({'active': tabsState == 2})} onClick={ () => {
                                    this.changeTbState(2)
                                }}><a>产品规则</a></li>
                                <li className={cs({'active': tabsState == 3})} onClick={ () => {
                                    this.changeTbState(3)
                                }}><a>申购需知</a></li>
                            </ul>
                            <div className="hq-T-content" style={{display: tabsState == 0 ? 'block' : 'none'}}>
                                <div className="hq-T-content-Box">
                                    <div className="hq-T-progress">
                                        <div className="hq-T-box-1">
                                            <div className="hq-progress-group">
                                                <i className="icon icon-income"></i>
                                                <span>现在转入</span>
                                                <i className="icon-cartright"></i>
                                            </div>
                                            <div className="hq-progress-group lg">
                                                <i className="icon icon-computed"></i>
                                                <span>{this.getDateDetail(rightDateInfo.incomeCalculationDay)}产生收益</span>
                                                <i className="icon-cartright"></i>
                                            </div>
                                            <div className="hq-progress-group noMr">
                                                <i className="icon icon-setPro"></i>
                                                <span>{this.getDateDetail(rightDateInfo.incomeArrivalDay)}收益可见</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-info">
                                    <div className="img-intro-box">
                                        <div className="img-intro">
                                            <div className="intro-left">
                                                <h3 className="title">灵活稳健</h3>
                                                <p className="text">最低转入1元，0.01元递增，收益每日结算</p>
                                            </div>
                                            <div className="intro-right">
                                                <div className="icon-bg icon-bg-intro-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="img-intro-box  gray-bg">
                                        <div className="img-intro">
                                            <div className="intro-left">
                                                <div className="icon-bg icon-bg-intro-2"></div>
                                            </div>
                                            <div className="intro-right">
                                                <h3 className="title">快速转出</h3>
                                                <p className="text">单日20万元内转出至银行卡两小时内到账，转出至余额实时到账</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="img-intro-box">
                                        <div className="img-intro">
                                            <div className="intro-left">
                                                <h3 className="title">资金不站岗</h3>
                                                <p className="text">日日盈可直接购买理财产品，助您捕捉更多财富机会</p>
                                            </div>
                                            <div className="intro-right">
                                                <div className="icon-bg icon-bg-intro-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hq-T-content" style={{display: tabsState == 1 ? 'block' : 'none'}}>
                                <div className="hq-T-content-box">
                                    <ul className="u-info-1">
                                        <li>
                                            <label>每万份收益</label>
                                            <p>前一个交易日万份收益，每日12:30前更新</p>
                                        </li>
                                        <li>
                                            <label>七日年化收益率</label>
                                            <p>截止到前一个交易日，每日12:30前更新</p>
                                        </li>
                                        <li>
                                            <label>转入规则</label>
                                            <p>随时转入，15:00前转入，T+1日计算收益</p>
                                        </li>
                                        <li>
                                            <label>转出规则</label>
                                            <p>灵活转出，15:00前转出，单笔5万元、单日20万以内两小时之内到账(实时转出到余额)</p>
                                        </li>
                                    </ul>
                                    <div className="content-intro">
                                        <h3 className="title">产品说明</h3>
                                        <p>
                                            产品是通华财富（上海）基金销售有限公司销售的华夏财富宝货币A（基金代码：000343）
                                        </p>
                                    </div>
                                    <div className="content-intro">
                                        <h3 className="title">项目免责说明</h3>
                                        <p>
                                            狐狸慧赚将严格按照合作机构提供的信息进行展示，平台不承担产品的兑付风险
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="hq-T-content" style={{display: tabsState == 2 ? 'block' : 'none'}}>
                                <div className="hq-T-content-box">
                                    <div className="content-intro" style={{paddingTop:'40px'}}>
                                        <h3 className="title">转入规则</h3>
                                        <p>
                                            T日转入日日盈的资金在T+1个交易日由基金公司进行份额确认，对已确认的份额，基金公司产生的收益将于T+2交易日在日日盈中显示。如在15:00之后转入，将顺延一个交易日进行确认，同时，双休日、国家法定假期、非交易日，基金公司不进行份额确认。
                                        </p>
                                        <p>
                                            一般情况下，转入时间与计算收益时间和收益到账时间的对应关系如下表所示：
                                        </p>
                                    </div>
                                    <div className="content-table">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th width="490px">转入提交时间</th>
                                                <th width="330px">计算收益时间</th>
                                                <th width="260px">收益到账时间</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>周一15:00~周二15:00</td>
                                                <td>周三</td>
                                                <td>周四</td>
                                            </tr>
                                            <tr>
                                                <td>周二15:00~周三15:00</td>
                                                <td>周四</td>
                                                <td>周五</td>
                                            </tr>
                                            <tr>
                                                <td>周三15:00~周四15:00</td>
                                                <td>周四</td>
                                                <td>下周一</td>
                                            </tr>
                                            <tr>
                                                <td>周四15:00~周五15:00</td>
                                                <td>下周一</td>
                                                <td>下周二</td>
                                            </tr>
                                            <tr>
                                                <td>周五15:00~下周一15:00</td>
                                                <td>下周二</td>
                                                <td>下周三</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="hq-T-content-box">
                                    <div className="content-intro"  style={{paddingTop:'40px'}}>
                                        <h3 className="title">转出规则</h3>
                                        <p className="title-2"><span className="short-title">【快速转出】</span>单个交易日累计转出金额为20万以内时为快速转出。</p>
                                    </div>
                                    <div className="content-table">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>转至账户余额</th>
                                                <th>转至银行卡</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>实时</td>
                                                <td>两小时内到账</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="content-intro">
                                        <div className="hq-T-comments">
                                            <span>注：</span>
                                            <p>1.  快速转出额度可能不时调整，最终请以狐狸慧赚平台展示为准；</p>
                                            <p>2.  收益起算后才可以转出；</p>
                                            <p>3.  交易日15:00前申请快速转出，转出当日不计算收益。交易日15:00后申请快速转出，转出当日计算收益；</p>
                                            <p>4.  快速转出申请提交后不可以撤销；</p>
                                            <p>5.  以上时间仅供参考，最终以实际到账时间为准。</p>
                                        </div>
                                    </div>
                                    <div className="content-intro">
                                        <p className="title-2"><span className="short-title">【普通转出】</span>如快速转出不可用或超出限额，您可以选择普通转出进行操作。普通转出为T日转出，T+1日到账 (T日指基金交易日)。操作普通转出后，直到资金到账前仍有收益</p>
                                        <p>
                                            一般情况下，转入时间与计算收益时间和收益到账时间的对应关系如下表所示：
                                        </p>
                                    </div>
                                    <div className="content-table">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th width="630px">转出提交时间</th>
                                                <th >到账时间</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>周一15:00~周二15:00</td>
                                                <td>周三</td>
                                            </tr>
                                            <tr>
                                                <td>周二15:00~周三15:00</td>
                                                <td>周四</td>
                                            </tr>
                                            <tr>
                                                <td>周三15:00~周四15:00</td>
                                                <td>周五</td>
                                            </tr>
                                            <tr>
                                                <td>周四15:00~周五15:00</td>
                                                <td>下周一</td>
                                            </tr>
                                            <tr>
                                                <td>周五15:00~下周一15:00</td>
                                                <td>下周二</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="content-intro">
                                        <div className="hq-T-comments">
                                            <span>注：</span>
                                            <p>1.  T日为上海证券交易所、深圳证券交易所的正常交易日；</p>
                                            <p>2.  收益起算后才可以转出；</p>
                                            <p>3.  普通转出申请提交后不可以撤销；</p>
                                            <p>4.  普通转出转出当日计算收益，转出下一个交易日不计算收益。</p>
                                        </div>
                                        <p>根据产品投资的资产投向，如当日全部投资者总申请转出资金大于前一交易日委托资产净值的20%，则产品管理人可根据产品当时情况决定全额转出、部分顺延转出；产品管理人决定部分顺延转出，未处理的转出申请将在下一个工作日进行处理；如果连续两个工作日发生大额转出，则可以暂停接受转出申请，但暂停期限不得超过20个工作日。</p>
                                    </div>
                                    <div className="content-intro"  style={{paddingTop:'40px'}}>
                                        <h3 className="title">支付理财产品规则</h3>
                                        <p>收益起算后，可购买平台其他支持“日日盈”支付的理财产品。</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hq-T-content" style={{display: tabsState == 3 ? 'block' : 'none'}}>
                                <div className="hq-T-content-box">
                                    <ul className="hq-T-questions">
                                        <li>
                                            <h3 className="question">Q: 什么是日日盈？</h3>
                                            <span>A: </span>
                                            <p className="answer">日日盈是通华财富（上海）基金销售有限公司销售的华夏财富宝货币A（基金代码：000343）</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 日日盈的认购条件是什么？</h3>
                                            <span>A: </span>
                                            <p className="answer">用户完成会员注册并实名认证，进行风险评估后，可以购买风险承受能力相匹配的产品。</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 如何转入日日盈？</h3>
                                            <span>A: </span>
                                            <p className="answer">用户风险承受能力符合产品要求时，阅读并同意产品合同中全部内容可以进行转入。</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 日日盈收益如何计算？</h3>
                                            <span>A: </span>
                                            <p className="answer">
                                                日日盈是通华财富（上海）基金销售有限公司销售的华夏财富宝货币A（基金代码：000343）。根据每日基金收益情况，以每万份基金净收益为基准，为投资人每日计算当日收益并分配，且每日进行支付。投资人当日收益分配的计算保留到小数点后2位。基金每日收益支付采用红利再投资方式，投资人可通过转出基金份额获得现金收益。投资人在每日收益支付时，若当日净收益大于零，则增加投资人基金份额；若当日净收益等于零，则保持投资人基金份额不变；基金管理人将采取必要措施尽量避免基金收益小于零，若当日净收益小于零，缩减投资人基金份额。当日转入的基金份额自下一个工作日起，享有基金的收益分配权益。</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 如何转出日日盈？收益如何计算？</h3>
                                            <span>A: </span>
                                            <p className="answer">
                                                投资用户转入后，收益中的份额可以随时转出。单笔5万以内，单日20万以内，用户可选择快速转出的方式，快速转出至账户余额实时到账，快速转出至银行卡，2个小时内到账。每个交易日15:00前申请快速转出的，转出当日不计算收益。每个交易日15:00后申请快速转出的，转出当日计算收益。单日转出金额超过20万的部分，采用普通转出的方式，转出当日计算收益，转出的下一个交易日不计算收益。</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 日日盈转入转出是否有费用？</h3>
                                            <span>A: </span>
                                            <p className="answer">日日盈转入和转出到余额没有手续费。日日盈转出到银行卡将收取手续费2元/笔，每月前五次手续费将由狐狸慧赚承担。（每月前5笔交易包含慧赚可用余额取现到银行卡和日日盈转出到银行卡）</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 转入转出提交后是否可以撤销？</h3>
                                            <span>A: </span>
                                            <p className="answer">转入转出申请提交后不可以撤销。转入份额可在起息后转出。</p>
                                        </li>
                                        <li>
                                            <h3 className="question">Q: 如何查询日日盈的转入转出情况？</h3>
                                            <span>A: </span>
                                            <p className="answer"> 投资者于 T 日提出有效转入申请，且于 T+1 日确认的，投资者可以于T+2 日起通过“我的账户”—“活期”—“日日盈”查询转入确认和收益情况。投资者D日提出有效转出申请后，可以于D+1 日16:30之后通过“我的账户”—“活期”—“日日盈”查询转出申请办理、资金划付等情况。
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Popup  title="快速登录"
                            hasCancel={false}
                            submitFn={()=>{ this.closePopup('showLogin') }}
                            closePopup={()=>{ this.closePopup('showLogin') }}
                            isShow={this.state.showLogin}>
                        <PopupCommon.PopupLogin />
                    </Popup>

                    <Popup title="安全提示"
                           isShow={this.state.openMaskState}
                           submitText="立即开户"
                           hasCancel={false}
                           showWarn={false}
                           submitFn={ () => {
                               this.goOpenCenter()
                           } }
                           closePopup={() => {
                               this.closePopup('openMaskState')
                           }}
                    >
                        <PopupCommon.PopupResult
                            content={<span className='hq-popup-only'>{this.state.userStatus.id5Status==3?'为了您的资金安全，请先开通慧赚托管账户！':'为了您的资金安全，请先完成实名开户！'}</span>}
                        />
                    </Popup>
                    <Popup title="安全提示"
                           isShow={this.state.openMaskPwdState}
                           submitText="确定"
                           submitFn={ () => {
                               location.href='https://www.huli.com/myaccount/safecenter';
                           } }
                           closePopup={() => {
                               this.closePopup('openMaskPwdState')
                           }}
                    >
                        <PopupCommon.PopupIsSetPwd/>
                    </Popup>
                    <Popup title="安全提示"
                           isShow={this.state.safeMaskState}
                           submitText="去评估"
                           hasCancel={false}
                           showWarn={false}
                           submitFn={ () => {
                               this.goSafeCenter()
                           } }
                           closePopup={() => {
                               this.closePopup('safeMaskState')
                           }}
                    >
                        <RiskTestTip
                            firstText={firstText}
                            secondText={secondText}
                        />
                    </Popup>
                    <Popup title="余额自动转入"
                           isShow={chargeMaskState}
                           submitText="确认"
                           hasCancel={true}
                           submitFn={()=>{this.balanceChange()}}
                           showWarn={true}
                           closePopup={() => {
                               this.closePopup('chargeMaskState')
                           }}
                    >
                        <RryPopup balanceState={autoInvestState} onChangeAutoInvest={(obj) => {
                            this.onChangeAutoInvest(obj)
                        }}/>
                    </Popup>
                    <Popup title="日日盈转入"
                           isShow={rryIncomeMaskState}
                           hasFooter={false}
                           closePopup={()=>{
                               this.closePopup('rryIncomeMaskState')
                           }}
                    >
                        <RryInvest investMoney={investMoney} onResult = {(data,obj)=>{this.onResult(data,obj,'rryIncomeMaskState')}} close = {()=>{this.closePopup('rryIncomeMaskState')}} />
                    </Popup>

                    <Popup title="日日盈转入"
                           isShow={this.state.rryInvestSucState}
                           submitText='完成'
                           hasCancel={false}
                           submitFn={ () => {
                               this.reload()
                           } }
                           showWarn={true}
                           closePopup={() => {
                               this.onChangeInvestObj({});
                               this.closePopup('rryInvestSucState')
                           }}
                    >
                        <RrySuc userOperaType={1} result={this.state.resultState} payType={this.state.investObj.type} count={investObj.applyAmount}> </RrySuc>
                    </Popup>

                    <Popup title="风险评估测试"
                           showWarn={false}
                           hasCancel={false}
                           submitDisabled={true}
                           submitText='确定'
                           submitFn={() => {
                               this.submitRiskTestQA();
                           }}
                           closePopup={() => {
                               this.closePopup('showRiskQuestion')
                           }}
                           isShow={this.state.showRiskQuestion}
                    >
                        <RiskQuestion />
                    </Popup>

                    <Popup title="风险评估结果"
                           showWarn={false}
                           hasCancel={false}
                           submitText='继续转入'
                           submitDisabled={true}
                           submitFn={() => {
                               this.closePopup('showRiskResult');
                               this.rryInvestMaskOpen();
                           }}
                           closePopup={() => {
                               this.closePopup('showRiskResult')
                           }}
                           isShow={this.state.showRiskResult}
                    >
                        <RiskResult userRiskType="保守型"
                                    productRiskValue={1}
                                    userRiskValue={1}
                                    investText="转入"
                        />
                    </Popup>
                    <Popup  title="提示"
                            hasCancel={false}
                            submitFn={()=>{this.closePopup('showError')}}
                            closePopup={()=>{this.closePopup('showError')}}
                            isShow={this.state.showError}
                    >
                        <PopupCommon.PopupResult icon="error" title={'日日盈'+ (this.state.userOperaType==1?'转入':'转出')+'提交失败！'} content={<div className="hq-prompt-balance">{this.state.errorMessage}<br/>您可以联系客服400-817-8877来获得帮助</div>} />
                    </Popup>

                </div>
            </DocumentTitle>
        )
    }

    reload(){
        window.location.reload();
    }
    changeTbState(n) {
        this.setState({tabsState: n})
    }

    submitRiskTestQA(){
        const {dispatch} = this.props;
        dispatch(Risk.popupSubmitRiskQuestions(() => {
            dispatch(userBaseActions.getUserBaseUserStatus(()=>{
                this.closePopup('showRiskQuestion');
                this.setState({ showRiskResult: true });
            }));
        }))
    }

    onChangeAutoInvest(obj) {
        const {balanceObj} = this.state;
        this.setState({balanceObj: _.assign({}, balanceObj, obj)});
    }

    onChangeInvestObj(obj){
        this.setState({investObj:obj})
    }


    getDateDetail(date) {
        const _date = new Date(date);
        return (_date.getMonth()+1) + '月' + _date.getDate() + '日'
    }
};


const mapStatesRryProps = (state, ownProps) => {
    const {
        userBase : {directCard:data2,userStatus:{ data:data4 },rryRateLists:{data:data5}}} = state;
    return{
        directCard:data2,
        userStatus:data4,
        rateLists:data5
    }
};

const mapDispatchsRryProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const RryMain = connect(
    mapStatesRryProps,mapDispatchsRryProps
)(RryDOMMain);