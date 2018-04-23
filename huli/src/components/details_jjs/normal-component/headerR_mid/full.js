const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const actionsPopup = require('../../../../reducers/popup/newpop/newpopActions');

export const full = React.createClass({
  componentWillMount:function(){
  },
  showpop(){
      this.props.dispatch(actionsPopup.newpopSetStatus({
        isShow: true,
        type: 'jjs',
        innerType: 'jjs_trans_do'
      }));
  },
  render:function(){
    // 状态为已满标
    let userinfo = '';
    let datas = this.props.datas;
    return (
        <div>    
            <div className="input-box margin-0-30 " bidMinLimit={datas.asset.investLimitMin}>
                <input className="input-w180" type="text" bidMinLimit={datas.asset.investLimitMin} fedPrdType={datas.asset.fedPrdType==1?8:(datas.asset.fedPrdType==2?9:7)} onChange={()=>{inpChange()}} autoComplete="off" value="输入金额为1000元整数倍" disabled/>
                <span className="span-w60 lt">,000<span className='yuan'>元</span></span>
            </div>
            <div className="err-box margin-0-30">
                <span></span>
            </div>
            <div className="btn-box margin-0-30">
                <input className="false-btn2" type="button" name="" value={datas.assetStatus} disabled onClick={this.showpop}/>
            </div>
        </div>
    );
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

export const Full = connect(
  mapStateToProps,mapDispatchToProps
)(full);