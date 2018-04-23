const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');

const ToolPE = require('../../../common/tool').tansformMoney;

const Failed = require('./headerR_mid/failed').Failed;
const Full = require('./headerR_mid/full').Full;
const Normal = require('./headerR_mid/normal').Normal;
const ToolTip = require('../../common/tooltip.component').ToolTip;

const headerRight = React.createClass({
  getInitialState(){
    return{
      assetStatusFull : 12,
      assetStatusFail: 52,
      assetStatusPreOpen: 10,
      assetStatusOpen: 11,
    }
  },
  render:function(){
    let userinfo = '';
    let mid_list = '';
    let datas = this.props.datas;
    let userData = this.props.userData;
    if(datas.idStr){
      if((datas.asset.status==this.state.assetStatusPreOpen || datas.asset.status==this.state.assetStatusOpen) && datas.openAssetLeftTime>0){
        mid_list = <Normal datas={datas} preOpen={1}/>
      }else if(datas.asset.status==this.state.assetStatusFail){
        mid_list = <Failed datas={datas}/>
      }else if(datas.asset.status == this.state.assetStatusFull || (datas.asset.status != this.state.assetStatusFail && datas.asset.status != this.state.assetStatusOpen && datas.asset.status != this.state.assetStatusPreOpen)){
        mid_list = <Full datas={datas}/>
      }else{
        mid_list = <Normal datas={datas} preOpen={0}/>
      }
      // mid_list = <Normal datas={datas} preOpen={1}/>
    }
    return (

        <div className='margin-r-30'>
          {
            this.props.state.userLogin.isLogin?
            <div className="user-info">
                <div className="left-info lt">
                    <div className='rest-money cf'>
                        <span className='lt'>慧赚可用余额(元)</span>
                        <ToolTip data-text="local_tooltip.acc_asset_available_licai" />
                        <strong className='rt'>{userData ? userData.huliCurrentBalance : ToolPE(datas.currentBalance)}</strong>
                    </div>
                    <div className='rest-hb cf'>
                        <a href="https://www.huli.com/myaccount/coupon/list" className='lt'>可用红包(元)</a>
                        <a href="https://www.huli.com/myaccount/coupon/list" className='rt'>{userData ? userData.couponAmount : ToolPE(datas.couponAmount)}</a>
                    </div>
                </div>
                <a href='https://www.huli.com/hl/#/myaccount/recharge/main' className="right-btn lt">充值</a>
            </div>
            :
            <div className='user-info'></div>
          }
            
            <div className="most-can-buy margin-0-30 cf">
                <span className="most-title lt">最大认购金额(元)</span>
                {
                  datas.asset.isForFresh == 1
                  ?
                  <ToolTip data-text="local_tooltip.bid_avail_money_jjsnew" />
                  :
                  <ToolTip data-text="local_tooltip.bid_avail_money_jjs" />
                }

                <span className='most-num rt'>{ToolPE(datas.asset.canBidAmount)}</span>
            </div>
            {mid_list}
            {
              datas.totalAmountBid?
              <div className="already-buy margin-0-30">
                  我已认购金额 <span className='buy-num'>{ToolPE(datas.totalAmountBid)}</span>元
              </div> 
              :null
            }
           
        </div>

    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state,
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
};

export const HeaderRight = connect(
  mapStateToProps,mapDispatchToProps
)(headerRight);
