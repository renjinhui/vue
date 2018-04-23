const React = require('react');
const cs = require('classnames');
const tool = require('./../../../common/tool');
const util = require('./../../../common/util');
const {connect} = require('react-redux');
const userBaseActions = require('../../../reducers/userBase/userBaseActions');

class balanceDom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rechargeState:0,
            accountInfo:{
                tlAccount: {
                    tlAccountTip: '',
                    accountAmount: 0
                },
                hxAccount: {
                    hxAccountTip: '',
                    accountAmount: 0
                },
            }
        }
    }
    componentDidMount(){
        const checkTabIndex = location.hash.indexOf('type=syd')!=-1?1:0;
        this.selectType(checkTabIndex)
    }

    componentWillReceiveProps(props){
        const {accountInfo} = props;
        this.setState({accountInfo:accountInfo});
    }
    render(){
        const {accountInfo,rechargeState} = this.state;
        return (
            <div className="cash-row mb40 cf">
                <h2 className="recharge-title">充值到</h2>
                <div className="cash-aside mr20">
                    <div className={cs({'cash-box':true,'active':rechargeState==0})} onClick={ ()=> {this.selectType(0)}}>
                        <div className="cash-top">
                            <h3 className="title">慧赚</h3>
                            <span className="mark">通联托管</span>
                        </div>
                        <div className="cash-bt">
                            <div className="cash-lt">
                                <label>账户可用余额(元)</label>
                                <span>{tool.tansformMoney(accountInfo.tlAccount.accountAmount)}</span>
                            </div>
                            <ul>
                                {
                                    this.initTip(accountInfo.tlAccount.tlAccountTip).map((item,index)=>{
                                        return <li key={index}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <span data-type="choose-ok" className="ico-borrow"></span>
                    </div>
                </div>
                <div className="cash-aside">
                    <div className={cs({'cash-box':true,'active':rechargeState==1})} onClick={ ()=> {this.selectType(1)}}>
                        <div className="cash-top">
                            <h3 className="title">搜易贷</h3>
                            <span className="mark">华夏存管</span>
                        </div>
                        <div className="cash-bt">
                            <div className="cash-lt">
                                <label>账户可用余额(元)</label>
                                <span>{tool.tansformMoney(accountInfo.hxAccount.accountAmount)}</span>
                            </div>
                            <ul>
                                {
                                    this.initTip(accountInfo.hxAccount.hxAccountTip).map((item,index)=>{
                                        return <li key={index}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <span data-type="choose-ok" className="ico-borrow"></span>
                    </div>
                </div>
            </div>
        )
    }
    selectType(n){
        this.props.onChange(n);
        this.setState({rechargeState:n},function () {
            const cash = util.getUrlParam('cash');
            var _str = cash!=''?('cash=' + cash):''
            var href = n==0?location.href.split('?')[0] +(_str==''?'':('?' + _str)): location.href.split('?')[0]+ '?type=syd'+(_str==''?'':('&'+_str));
            location.href = href;
        })
    }
    initTip(tip){
        if(tip.indexOf(';')==-1){
            let _=[];_.push(tip);
            return _
        }else {
            return tip.split(';')
        }
    }
}
const mapBalanceProps = (state, ownProps) => {
    const {
        userBase : {accountInfo:{ data:data4 }}} = state;
    return{
        accountInfo:data4
    }
};

const mapDispatchsBalanceProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const BalanceInfos = connect(
    mapBalanceProps,mapDispatchsBalanceProps
)(balanceDom);