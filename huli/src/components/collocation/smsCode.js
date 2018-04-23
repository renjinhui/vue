const React = require('react');

/*
*
* props: getSmsCode,getSmsCode,infoText，isinfo，errText，isErr
*
*/
let timer;
export const SmsCode = React.createClass({

  getInitialState() {
    return {
      smsCode: null,
      buttonText: '点击获取',
      timingOut: false,
      timeOut: 60,
    }
  },

  getSmsCode() {
    this.props.getSmsCode();
    setTimeout(() => {
      if (!this.props.isInfo && !this.props.isErr && !this.props.isFalse) {
        this.setState({
          timingOut: true,
          timeOut: this.state.timeOut
        });
        timer = setInterval(() => {
          if (this.state.timeOut <= 0) {
            this.setState({
              timeOut: 60,
              timingOut: false,
              buttonText: '重新获取'
            });
            clearInterval(timer);
          } else {
            this.setState({
              timingOut: true,
              timeOut: this.state.timeOut - 1
            });
          }
        }, 1000);
      }
    }, 400);
  },

  focusSmsCode() {
    if (this.props.focusSmsCode) {
      this.props.focusSmsCode();
    }
  },

  changeSmsCode() {
   if (this.props.changeSmsCode) {
     this.props.changeSmsCode();
   }
  },

  blurSmsCode() {
    const smsCode = this.refs.smsCode.value;
    this.props.blurSmsCode(smsCode);
    this.setState({ smsCode });
  },

  componentWillUnmount() {
    clearTimeout(timer);
  },

  render: function () {
    return (
      <div className={this.props.isBC ? "bc-row" : "oa-row"}>
        <div className={this.props.isBC ? "bc-left": "oa-left"}>
          短信验证码
        </div>

        <div className={this.props.isErr === true
          ? "oa-center oa-input-error"
          : "oa-center"}>
          <input
            type="text"
            ref="smsCode"
            className="oa-input-sms-code"
            placeholder="请输入短信验证码"
            onFocus={this.focusSmsCode}
            onBlur={this.blurSmsCode}
            onChange={this.changeSmsCode}
          />
          <span className="oa-line"></span>
          {
            this.state.timingOut === false
              ? <div className="oa-get-sms-code"
                     onClick={this.getSmsCode}>{this.state.buttonText}</div>
              : <div className="oa-time-out">{this.state.timeOut}s</div>
          }
        </div>

        <div className="oa-right">
          <div className="oa-info">
            {
              this.props.isInfo
                ? <div className="oa-hint">
                <div className="oa-triangle"></div>
                <div className="oa-triangle-in"></div>
                  {this.props.infoText}
              </div>
                : null
            }
            {
              this.props.isErr
                ? <div className="oa-info">{this.props.errText}</div>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
});