const React = require('react');

const RiskTestTip = React.createClass({
  render() {
    return (
      <div className="huli-popup-content">
          <div className="hq-popup-insufficient">
              <p className="hq-prompt-insufficient">{ this.props.firstText }</p>
              <p className="hq-prompt-recharge">{ this.props.secondText }</p>
          </div>
      </div>
    )
  }
});

module.exports = {
  RiskTestTip
};
