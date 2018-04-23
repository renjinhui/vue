const React = require('react');
const tansformMoney = require('../../../common/tool').tansformMoney;

const XJGCalculator = React.createClass({
  getInitialState() {
    return {
        turnIn: 0,
        turnInShow: 0,
        profit: 0,
        time: 30
    }
  },
  componentWillMount(){
    this.calculatorFn(this.props.turnInMoney || 10000);
  },
  calculatorFn(money){
    // 收益＝利率＊转入金额＊期限／365
    let raise = this.props.raise ? Number(this.props.raise) : 0;
    let rate = this.props.rate ? Number(this.props.rate) : 0;
    let profit = ((rate+raise) / 100 / 100) * money * this.state.time / 365;
    this.setState({
        turnIn: money,
        turnInShow: tansformMoney(money, 2, true),
        // profit: money < 100? '0.00' : tansformMoney(profit, 2, true)
        profit: tansformMoney(profit, 2, true)
    });
  },
  changeFn(e){
    let reg = /[^\d]/g;
    let val = e.target.value;
    let limitMoney = 9999999;
    if(reg.test(val)){
        return;
    }else{
      if(val>limitMoney){
        return;
        // this.setState({turnIn:val.substring(0,val.length-1)});
      }
    }
    this.calculatorFn(val);
  },
  moveCaretAtEnd(e) {
    let temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value
  },
  render() {
    let rate = Number(this.props.rate/100).toFixed(2) + '%';
    let raise = this.props.raise ? ('+' + Number(this.props.raise/100).toFixed(2) + '%'):'';
    let timeStr = this.state.time + '日可获收益(元)';
    return (
      <div className="huli-popup-content mh192">
        <div className="hq-popup-calculation">
            <div className="hq-popup-title">
                <span>转入金额</span>
                <input type="text" value={this.state.turnIn} onChange={this.changeFn} placeholder="请输入期望转入金额" autoFocus onFocus={this.moveCaretAtEnd} className="hq-inveset-input" />
            </div>
            <div className="hq-invest-info">
                <ul>
                    <li>
                        <label>预期年化收益率</label>
                        <span>{rate}</span>
                        <span>{ raise }</span>
                    </li>
                    <li>
                        <label>转入金额(元)</label>
                        <span className="hq-invest-total">{this.state.turnInShow}</span>
                    </li>
                    <li>
                        <label>{timeStr}</label>
                        <span className="hq-invest-count">{this.state.profit}</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  XJGCalculator
};
