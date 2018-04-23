const React = require('react');
const tansformMoney = require('../../common/tool').tansformMoney;

const XJGSuccess = React.createClass({
  componentWillMount() {
    
  },
  render() {
    return (
      <div className="huli-popup-content">
          <div className="hq-popup-success">
              <div className="hq-ico-success"></div>
              <div className="hq-popup-prompt">
                  <p className="hq-prompt-suc">
                      <span>成功提交转入</span><span>{tansformMoney(this.props.turnInMoney, 2, true)}</span><span>元</span>
                  </p>
                  <p className="hq-prompt-balance">
                      <span>本次转入使用余额</span><em>{tansformMoney(this.props.useMoney, 2, true)}</em><span>元</span>
                  </p>
              </div>
          </div>
      </div>
    )
  }
});

module.exports = {
  XJGSuccess
};