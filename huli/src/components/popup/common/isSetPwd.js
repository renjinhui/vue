const React = require('react');

class IsSetPwd extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-success">
                    <div className="hq-popup-prompt">
                        <div className="hq-prompt-balance">
                            <div className="safeWarn">
                                <img className="icon-success "
                                     src="https://static.huli.com/images/collocation/apologize.png"
                                />
                                <p >为了您的账户安全请您先设置
                                    <a className="link-blue"
                                       href="https://www.huli.com/myaccount/safecenter"
                                       target="_blank">
                                        交易密码
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

module.exports = {
    PopupIsSetPwd: IsSetPwd
};
