const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const newActionsPopup = require('../../../../reducers/popup/newpop/newpopActions');
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;
const ToolTip = require('../../../common/tooltip.component').ToolTip;

const jjs_success = React.createClass({

  goDetail(){
    this.props.dispatch(newActionsPopup.newpopSetStatus({
      isShow: false
    }));
    if(this.props.isTransfer == 1){
      window.location.href = '/hl/#/myaccount/lc_lend/normal';
    }else{
      window.location.href = '/hl/#/myaccount/lc_lend/open';
    }
    
  },
  render() {
    let sucData = this.props.state.newPop.sucGet;
    let operaHref = '', operaUrl = '', operaTitle = '';
    if(this.props.isTransfer == 1){
      operaHref = this.props.state.popBanner.data.zr ? this.props.state.popBanner.data.zr.link : '';
      operaUrl = this.props.state.popBanner.data.zr ? this.props.state.popBanner.data.zr.picture : '';
      operaTitle = this.props.state.popBanner.data.zr ? this.props.state.popBanner.data.zr.title : '';
    }else if(this.props.isTransfer == 0){
      operaHref = this.props.state.popBanner.data.zt ? this.props.state.popBanner.data.zr.link : '';
      operaUrl = this.props.state.popBanner.data.zt ? this.props.state.popBanner.data.zr.picture : '';
      operaTitle = this.props.state.popBanner.data.zt ? this.props.state.popBanner.data.zr.title : '';
    }
    return (
      <div>
          <div className="huli-popup-content">
              <div className="detail-popup-success">
                  <div className="detail-ico-success"></div>
                  <div className="detail-popup-prompt">
                      <p className="detail-prompt-suc">
                          <span>恭喜您，成功认购</span><span>{ToolPE(sucData.realAmount)}</span><span>元</span>
                      </p>
                      <p className="detail-prompt-balance">
                          <span>
                            使用{sucData.investAccountType == 2 ? '慧赚' : '日日盈' }可用余额：{ToolPE(sucData.realAmount-sucData.couponAmount)}元 
                            {sucData.couponAmount ? ' 使用福利：'+ToolPE(sucData.couponAmount)+'元红包' : null}
                            {sucData.raiseInterest ? ' 使用福利：'+ToolPE(sucData.raiseInterest)+'%加息券' : null}
                          </span>
                      </p>
                      <div className="detail-prompt-text">
                        {
                          this.props.isTransfer == 1 ?
                          ''
                          :
                          <span>预计起息日：{ToolTM(sucData.interestTime)}</span>
                        }
                        {
                          this.props.isTransfer == 1 ?
                          <em>获赠{sucData.score}积分</em>
                          :
                          <em>将获赠{sucData.score}积分</em>
                        }
                          
                          <ToolTip data-text="invest_score" extClass='suc_pop_tooltip'></ToolTip>
                      </div>
                  </div>
                  <div className="activity-banner">
                    <a href={operaHref}>
                      <img title={operaTitle} src={operaUrl} alt="" />
                    </a>
                  </div>
              </div>
          </div>

          <div className="huli-popup-footer mar-t-0">
              <div className="huli-popup-action">
                  <span>
                     <input type="button" className="blue-btn common-btn-130" value="查看详情" onClick={this.goDetail}/>
                  </span>
              </div>
              <span className="huli-popup-risk">投资有风险，理财需谨慎</span>
          </div>
      </div>
    )
  }
});
const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const jjsSuc = connect(
  mapStateToProps,mapDispatchToProps
)(jjs_success);
