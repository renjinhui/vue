const React = require('react');
const Tool = require('../../../common/tool');

class Invest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAgree: true
        }
    }
    changeAgree(){
        this.props.setSubmitDisabled(this.state.isAgree);
        this.setState({
            isAgree: !this.state.isAgree
        })
    }
    render() {
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-rows cf">
                    <div className="hq-popup-left lt">
                        <p className="hq-popup-digital">
                            <span>{Tool.fmtPercent(this.props.xjg.profileRate)+'%'}</span>
                            <span>{this.props.xjg.raise}</span>
                        </p>
                        <p className="hq-popup-nameof">预期年化收益率</p>
                    </div>
                    <div className="gray-lines lt"></div>
                    <div className="hq-popup-center lt">
                        <div className="hq-popup-times">
                            <span>{this.props.xjg.confirmTime}</span>
                        </div>
                        <p className="hq-popup-nameof">确认时间</p>
                    </div>
                    <div className="gray-lines lt"></div>
                    <div className="hq-popup-right lt">
                        <p className="hq-popup-times">{this.props.xjg.investAmountTip}</p>
                        <p className="hq-popup-nameof">起投金额</p>
                    </div>
                </div>

                {
                    this.props.isBalanceLess
                    ? <div className="hq-popup-lack">
                            <em className="version-tooltip-css red-tooltip huli-common-icons"></em>
                            <span>理财可用余额不足，已为您调整投资金额，</span>
                            <a href="/myaccount/capital/deposit">立即充值</a>
                        </div>
                    : ""
                }

                <div className="hq-details-list">
                    <div className="hq-list-items cf">
                        <p className="hq-shift-names lt">转入金额</p>
                        <p className="hq-actualPrice blod-text lt">
                            <span>{Tool.tansformMoney(this.props.useMoney, 2, true)}</span>
                            <span>
                                元</span>
                        </p>
                    </div>
                    <div className="hq-list-items cf">
                        <p className="hq-variable-names lt">使用理财可用余额</p>
                        <p className="hq-actualPrice lt">
                            <span>{Tool.tansformMoney(this.props.useMoney, 2, true)}</span>
                            <span>
                                元</span>
                        </p>
                    </div>
                    <div className="hq-list-items cf">
                        <p className="hq-variable-names lt">确认时间</p>
                        <p className="hq-actualPrice lt">
                            <span className="sure-time">{this.props.xjg.confirmDate}</span>
                            <ToolTip data-text="local_tooltip.xjg_confirm_date" />
                        </p>
                    </div>
                </div>

                <div className="hq-content-bottom">
                    <div className="huli-one-checkbox popup-checkbox">
                        <em className={this.state.isAgree
                            ? 'huli-common-icons checked'
                            : 'huli-common-icons'} onClick={this.changeAgree.bind(this)}></em>
                        <span className="huli-agrees">我已阅读并同意<a href="https://events.huli.com/static/web/agree/xjg.html" target="_blank">《产品合同》</a>
                        </span>
                    </div>
                    <span className="product-agree">产品合同包含：认购协议、产品说明书、投资者承诺及风险测评和普惠服务协议</span>
                </div>
            </div>
        )
    }
}

module.exports = {
    Invest
}
