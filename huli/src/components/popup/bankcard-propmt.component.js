const React = require('react');

export const CcPrompt = React.createClass({
    render(){
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-insufficient">
                    <p className="hq-prompt-insufficient">
                        <span>如果您账户中有未结清的交易、或未结清的资金时，换卡操作会失败</span>
                    </p>
                    <p className="hq-prompt-recharge">
                        <span>确认请继续</span>
                    </p>
                </div>
            </div>
        )
    }
})