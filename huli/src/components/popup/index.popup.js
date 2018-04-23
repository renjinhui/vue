const React = require('react');

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 100,
            donotReceive: true,
            submitDisabled: props.submitDisabled || false,  //是否disbled提交按钮
            isShow: props.isShow === undefined ? true : props.isShow,  //是否显示弹窗
            showWarn: props.showWarn === undefined ? true : props.showWarn,  //是否显示风险提示
            showClose: props.showClose === undefined ? true : props.showClose  //是否显示风险提示
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showWarn !== undefined && nextProps.showWarn != this.state.showWarn) {
            this.setState({
                showWarn: nextProps.showWarn
            })
        }
        if (nextProps.showClose !== undefined && nextProps.showClose != this.state.showClose) {
            this.setState({
                showClose: nextProps.showClose
            })
        }
        if (nextProps.isShow !== undefined && nextProps.isShow != this.state.isShow) {
            this.setState({
                isShow: nextProps.isShow
            }, () => {
                this.getTop();
            })

        }
        if(!this.state.donotReceive)return;
        if (nextProps.submitDisabled !== undefined && nextProps.submitDisabled != this.state.submitDisabled) {
            this.setState({
                submitDisabled: nextProps.submitDisabled
            })
        }
    }

    componentDidMount(){
        this.getTop();
    }

    getTop(){
        if(!this.state.isShow){
            return;
        }

        const clientH = document.documentElement.clientHeight || document.body.clientHeight;
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        const popupH = this.refs.popup.offsetHeight;
        this.setState({
            top: (clientH - popupH)/2 + scrollT
        })
    }

    // 设置提交按钮disable样式
    setSubmitDisabled(disabled,str) {
        if(str == 'lastAnswer'){
            this.setState({
                submitDisabled: disabled,
                donotReceive:false
            })
        }else{
            this.setState({
                submitDisabled: disabled,
                donotReceive:true
            })
        }
    }

    componentWillUnmount() {
    }
    submitFn(){
        if(this.state.submitDisabled) return;

        this.props.submitFn();
    }
    closePopup() {
        this.setState({
            isShow: false
        });
        this.props.closePopup && this.props.closePopup();
        this.props.closePopupSucc && this.props.closePopupSucc();
    }
    cancelClick() {
        if(this.props.cancelClick){
            this.props.cancelClick();
        }else{
            this.closePopup();
        }
    }

    render() {
        let hasCancel = this.props.hasCancel === undefined ? true : this.props.hasCancel;
        let hasSubmit = this.props.hasSubmit === undefined ? true : this.props.hasSubmit;
        let cancelText = this.props.cancelText || '取消';
        let submitText = this.props.submitText || '确定';
        let submitCls = 'blue-btn common-btn-130 ' + ( this.state.submitDisabled ? 'false-btn' : '' );
        let hasFooter = this.props.hasFooter === undefined ?true : this.props.hasFooter;
        if(!this.state.isShow){
            return null;
        }

        return (
            <div>
              <div className="rc-dialog-mask"></div>
              <div ref="popup" className="rc-dialog-wrap" style={{
                  top: this.state.top + 'px'
              }}>
                <div className="huli-popup-main">
                  <div className="huli-popup-title">
                  {
                    this.state.showClose === false ?
                    null
                    :
                    <span className="huli-popup-closed" onClick={this.closePopup.bind(this)}>
                      <a href="javascript:void(0)"></a>
                    </span>
                  }
                  
                    <div className="huli-popup-name">
                      <span className="huli-popup-name-left" dangerouslySetInnerHTML={ {__html: this.props.title}}></span>
                    </div>
                  </div>
                    {
                        React.cloneElement(
                            this.props.children, {
                                setSubmitDisabled: this.setSubmitDisabled.bind(this)
                            })
                    }

                    {
                      hasFooter&&<div className="huli-popup-footer">
                        <div className="huli-popup-action">
                            {
                                hasCancel
                                    ? <span>
                        <input type="button" className="gray-btn common-btn-130"
                               onClick={this.cancelClick.bind(this)} value={cancelText}/>
                      </span>
                                    : null
                            }
                            {
                                hasSubmit
                                    ? <span>
                        <input type="button" className={submitCls} onClick={this.submitFn.bind(this)}
                               value={submitText}/>
                      </span>
                                    : null
                            }
                        </div>
                          { this.state.showWarn && (<span className="huli-popup-risk">投资有风险，理财需谨慎</span>) }

                      </div>
                    }
                </div>
              </div>
            </div>
        )
    }
}

module.exports = {
    Popup
}
