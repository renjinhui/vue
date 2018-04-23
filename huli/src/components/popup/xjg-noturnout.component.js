const React = require('react');
let code_set = (window.codes && window.codes.local_tooltip && window.codes.local_tooltip.xjg_roll_out_credit) ? window.codes.local_tooltip.xjg_roll_out_credit : '今日转出额度已达上限，明日开放额度，敬请关注'
const noTurnOut = React.createClass({
  render() {
    return (
        <div className="huli-popup-content">
            <div className="hq-popup-success">
                <div className="hq-common-images"></div>
                <div className="hq-popup-prompt">
                    <p className="hq-prompt-suc">
                        <span>小金罐转出提交失败</span>
                    </p>
                    <p className="hq-prompt-balance">
                        {code_set}
                    </p>
                </div>
            </div>
        </div>
    )
  }
});

module.exports = {
  noTurnOut
};
