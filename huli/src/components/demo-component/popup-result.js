const React = require('react');
const _ = require('lodash');
const { Popup } = require('../popup/index.popup');
const PopupCommon = require('../popup/common/index');
const { RiskTestTip } = require('../popup/risk/risk-test.component');
const { RiskLevelLowerTip } = require('../popup/risk/risk-level-lower-tip.component');
const { RiskQuestion } = require('../popup/risk/risk-questions.component');

class PopupResult extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: false,
            showSingle: false,
            showMulti: false,
            showMulti2: false,
            showSuccess: false,
            showError: false,
            showWarning: false,
            showRiskTip: false,
            showResultSucc: false,
            showRiskLowerTip: false,
            showRiskQuestion: false,
            showHideClose: false,
            showSelfCloseClick: false,
            showSelfCancelClick: false
        }
    }
    showPopup(type){
        let _state = {};
        _state[type] = true;
        this.setState(_state);
    }
    closePopup(type){
        let _state = {};
        _state[type] = false;
        this.setState(_state);
    }
    closePopupAlert(){
        alert('执行自定义关闭按钮事件')
    }
    render(){
        return (
            <div style={{"minHeight": "300px", width: "1200px", "margin": "50px auto", fontSize: '18px'}}>
                <a href="javascript:;" onClick={()=>{this.showPopup('showLogin')}}>登录/注册</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showSingle')}}>单句提示弹窗</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showSuccess')}}>成功提示层1</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showError')}}>错误提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showWarning')}}>警告提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showResultSucc')}}>成功提示层2</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showMulti')}}>投资－转让成功提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showMulti2')}}>投资－转让成功－并显示广告banner提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showRiskTip')}}>风险评估等级提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showRiskLowerTip')}}>风险评估等级过低时提示层</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showRiskQuestion')}}>风险评估答题</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showHideClose')}}>隐藏关闭按钮弹窗</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showSelfCloseClick')}}>自定义关闭按钮事件</a>
                <br/>
                <a href="javascript:;" onClick={()=>{this.showPopup('showSelfCancelClick')}}>自定义取消按钮事件</a>
                <br/>

                {/*登录注册*/}
                <Popup  title="快速登录"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showLogin')}}
                        closePopup={()=>{this.closePopup('showLogin')}}
                        isShow={this.state.showLogin}>
                    <PopupCommon.PopupLogin />
                </Popup>

                {/*单句提示*/}
                <Popup  title="开户"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showSingle')}}
                        closePopup={()=>{this.closePopup('showSingle')}}
                        isShow={this.state.showSingle}>
                    <PopupCommon.PopupResult
                        content={<p className='hq-popup-only'>请先开户再取现！</p>}
                    />
                </Popup>

                {/* 成功提示层1 */ }
                <Popup  title="成功提示层1"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showSuccess')}}
                        closePopup={()=>{this.closePopup('showSuccess')}}
                        isShow={this.state.showSuccess}
                >
                    <PopupCommon.PopupSuccess content={ <div className="hq-popup-prompt">
                                                            <p className="hq-prompt-suc">
                                                                <span>活期产品转出提交成功！请在活期小金罐中查看进度。</span>
                                                            </p>
                                                            <p className="hq-prompt-balance">
                                                                <a href="javascript:">立即查看</a>
                                                            </p>
                                                        </div> }
                    />
                </Popup>

                {/* 错误提示 title和content可为空,icon为类型：error  warning  success */ }
                <Popup  title="错误提示"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showError')}}
                        closePopup={()=>{this.closePopup('showError')}}
                        isShow={this.state.showError}
                >
                    <PopupCommon.PopupResult icon="error" title="活期产品转出提交失败！" content="失败原因明细，待接口确认失败原因明细，待接口确认" />
                </Popup>

                {/* 警告提示 title和content可为空,icon为类型：error  warning  success */ }
                <Popup  title="警告提示"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showWarning')}}
                        closePopup={()=>{this.closePopup('showWarning')}}
                        isShow={this.state.showWarning}
                >
                    <PopupCommon.PopupResult icon="warning" title="警告title" content="不能购买自己的转让标！" />
                </Popup>

                {/* 成功提示 title和content可为空,icon为类型：error  warning  success */ }
                <Popup  title="成功提示层2"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showResultSucc')}}
                        closePopup={()=>{this.closePopup('showResultSucc')}}
                        isShow={this.state.showResultSucc}
                >
                    <PopupCommon.PopupResult icon="success" title="购买小金罐成功" content="" />
                </Popup>

                {/*投资－转让成功提示*/}
                <Popup  title="【抵押消费贷】RZTRIR7XCEH<i className='transfer-icon'>转</i>"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showMulti')}}
                        closePopup={()=>{this.closePopup('showMulti')}}
                        isShow={this.state.showMulti}>
                    <PopupCommon.InvestSucc content={   <div className="detail-popup-prompt">
                                                            <p className="detail-prompt-suc">
                                                                <span>恭喜您，成功投标</span><span>10,000.00</span><span>元</span>
                                                            </p>
                                                            <p className="detail-prompt-balance">
                                                                <span>使用搜易贷可用余额：1,000.00元 使用慧赚可用余额：10.00元 使用红包：5.00元</span>
                                                            </p>
                                                            <p className="detail-prompt-text">
                                                                <span>预计起息日：项目投满日+1天</span><em>将获赠10积分</em>
                                                            </p>
                                                        </div>
                                                    }
                    />
                </Popup>

                {/*投资－转让成功－并显示广告banner提示*/}
                <Popup  title="【抵押消费贷】RZTRIR7XCEH转"
                        hasCancel={false}
                        submitFn={()=>{this.closePopup('showMulti2')}}
                        closePopup={()=>{this.closePopup('showMulti2')}}
                        isShow={this.state.showMulti2}>
                    <PopupCommon.InvestSucc content={   <div className="detail-popup-prompt">
                                                            <p className="detail-prompt-suc">
                                                                <span>恭喜您，成功投标</span><span>10,000.00</span><span>元</span>
                                                            </p>
                                                            <p className="detail-prompt-balance">
                                                                <span>使用搜易贷可用余额：1,000.00元 使用慧赚可用余额：10.00元 使用红包：5.00元</span>
                                                            </p>
                                                            <p className="detail-prompt-text">
                                                                <span>预计起息日：项目投满日+1天</span><em>将获赠10积分</em>
                                                            </p>
                                                        </div>
                                                    }
                                            showAd={true}
                                            adSrc="https://help.souyidai.com/upload/2017/04/12/1491992111575Dn4m.gif"
                    />
                </Popup>

                {/*风险评估 提示层*/}
                <Popup  title="风险评估测试"
                        cancelText="关闭"
                        submitFn={()=>{ this.closePopup('showRiskTip') }}
                        closePopup={()=>{this.closePopup('showRiskTip')}}
                        isShow={this.state.showRiskTip}
                >
                    <RiskTestTip firstText="本项目适合风险承受能力为“进取型”以上用户投资。" secondText="投资前，请您先完成风险评估测试。" />
                </Popup>

                {/*风险评估 测试等级不够时的提示*/}
                <Popup  title="风险评估测试"
                        submitText="继续认购"
                        submitFn={()=>{ this.closePopup('showRiskLowerTip') }}
                        closePopup={()=>{this.closePopup('showRiskLowerTip')}}
                        isShow={this.state.showRiskLowerTip}
                >
                    <RiskLevelLowerTip userRiskType="稳健型" userRiskValue="1,2" productRiskType="成长型" needAgree={false} />
                </Popup>

                {/*风险评估 答题*/}
                <Popup  title="风险评估测试"
                        showWarn={false}
                        hasCancel={false}
                        submitFn={this.submitRiskTestQA}
                        submitDisabled={true}
                        // submitFn={()=>{ this.closePopup('showRiskQuestion') }}
                        isShow={this.state.showRiskQuestion}
                >
                    <RiskQuestion />
                </Popup>

                {/*隐藏关闭按钮弹窗*/}
                <Popup  title="隐藏关闭按钮弹窗"
                        showWarn={false}
                        hasCancel={true}
                        submitDisabled={true}
                        submitFn={()=>{ this.closePopup('showHideClose') }}
                        showClose={false}
                        isShow={this.state.showHideClose}
                >
                    <p></p>
                </Popup>

                {/*自定义关闭按钮事件*/}
                <Popup  title="自定义关闭按钮事件"
                        submitFn={()=>{ this.closePopup('showSelfCloseClick') }}
                        closePopup={()=>{this.closePopupAlert()}}
                        isShow={this.state.showSelfCloseClick}
                >
                    <p></p>
                </Popup>

                {/*自定义取消按钮事件*/}
                <Popup  title="自定义取消按钮事件"
                        cancelClick={()=>{ alert('cancel'); }}
                        submitFn={()=>{ this.closePopup('showSelfCancelClick') }}
                        isShow={this.state.showSelfCancelClick}
                >
                    <p></p>
                </Popup>


            </div>
        )
    }
}

module.exports = {
    PopupResult
}