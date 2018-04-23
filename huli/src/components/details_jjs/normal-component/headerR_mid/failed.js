const React = require('react');

export const Failed = React.createClass({
  componentWillMount:function(){
  },
  inpChange(e){
    console.log(e)
  },
  render:function(){
    // 状态为已流标
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
                <input className="false-btn2" type="button" name="" value="产品不成立" disabled/>
            </div>
        </div>
    );
  }
});