const React = require('react');

const CapitalInvestItem = React.createClass({
  render() {
    return (
      <a href={this.props.href ? this.props.href : 'javascript:;'} target="_self" className={this.props.index != 0 ? 'fixed-boxs manage-boxs lt' :'manage-boxs lt'}>
        <div className="icon-box lt">
          <span className={this.props.className}></span>
          <p className="classify">{this.props.title}</p>
        </div>
        <div className="sums-num lt">
          <p>{this.props.principalTitle ? this.props.principalTitle : '待收本金'}</p>
          <span>{this.props.willGainPrincipal}</span>
        </div>
        <div className="sums-num lt">
          <p>{this.props.earningsTitle ? this.props.earningsTitle : '预期收益'}</p>
          <span>{(this.props.earningsTitle=='昨日收益'&&this.props.willGainInterest==0)?'--':this.props.willGainInterest}</span>
        </div>
      </a>
    )
  }
});



module.exports = {
  CapitalInvestItem
};