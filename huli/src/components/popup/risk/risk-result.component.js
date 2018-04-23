const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const RiskResult = React.createClass({
  getInitialState() {
    return {
      isDisabled: false
    }
  },
  componentWillMount(){
    this.props.setSubmitDisabled(false);
  },
  changeAgree() {
    this.props.setSubmitDisabled(!this.state.isDisabled);
    this.setState({
      isDisabled: !this.state.isDisabled
    });
  },
  render() {
    let needLevel = this.props.productRiskValue,
        userLevel = this.props.userRiskValue;
    const arrPng = ['baoshou.png', 'wenjian.png', 'pingheng.png', 'chengzhang.png', 'jinqu.png'];
    let riskTypeAry = ["保守型","稳健型","平衡型","成长型","进取型"];
    let i = (parseFloat(userLevel) - 1)||0;
    let thisAryStr = riskTypeAry.slice(i).join(',')
    let img = "https://static.huli.com/images/jjs/" + arrPng[i];
    return (
        <div className="huli-popup-content">
            <div className="huli-rist-result"> 
                <strong>{this.props.userRiskType}</strong>
                <span>根据本次风险评估测试结果判断，您的认购类型为</span>
                <div> <img src={img} height="180" /> </div>
            </div>
            <div className="huli-rist-hints">
                <div className={"pass" + (needLevel>userLevel ? ' no-pass' : '')}><span>本产品适合风险承受能力为“{thisAryStr}”的用户投资，{needLevel>userLevel ? '' : ('请您继续' + (this.props.investText? this.props.investText: "认购") )}</span> </div>
                {/*<div className="no-pass pass"><span>重要提示：本产品适合风险承受能力为“进取型”以上用户投资</span> </div>*/}
            </div>
        </div>
    )
  }
});
module.exports = {
  RiskResult
};