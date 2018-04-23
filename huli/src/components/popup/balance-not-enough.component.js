const React = require('react');

const BalanceNotEnough = React.createClass({
  render() {
    let tip ='';

    if(this.props.showTip){
      tip = <p className="hq-prompt-insufficient">
        <span>抱歉，本项目起投金额为</span><span>{this.props.money}</span><span>元</span>
      </p>
    }else{
      tip = '';
    }
    return (
      <div className="huli-popup-content">
        <div className="hq-popup-insufficient">
            {tip}
            <p className="hq-prompt-recharge">
                <span>您的理财可用余额不足，</span><a href="/myaccount/capital/deposit">立即充值</a>
            </p>
        </div>
    </div>
    )
  }
});

module.exports = {
  BalanceNotEnough
};
