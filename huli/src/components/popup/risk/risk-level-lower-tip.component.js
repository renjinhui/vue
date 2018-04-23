const React = require('react');
const { connect } = require('react-redux');

class RiskLevelLower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false
        }
    }
    componentWillMount(){
        const {setSubmitDisabled} = this.props;
        if(setSubmitDisabled)setSubmitDisabled(false);
    }
    changeAgree() {
        const {setSubmitDisabled} = this.props;
        const {isDisabled} = this.state;
        if(setSubmitDisabled)setSubmitDisabled(!isDisabled);
        this.setState({
            isDisabled: !isDisabled
        });
    }
    render() {
        const arrPng = ['baoshou.png', 'wenjian.png', 'pingheng.png', 'chengzhang.png', 'jinqu.png'];
        const {userRiskType,productRiskType,userRiskValue} = this.props;
        const {isDisabled} = this.state;
        let message = {
            lastResult: '您上次的评估结果为“' + userRiskType + '”',
            nowNeedResult: '本产品适合风险承受能力为“' + productRiskType + '”及以上的用户转入'
        };
        // userRiskValue='1,2,3'  img=arrPng[3-1]
        let arr = userRiskValue.split(',');
        let img = "https://static.huli.com/images/jjs/" + arrPng[arr[arr.length - 1] - 1];
        let agreeCls = "huli-common-icons " + (isDisabled? "" : "checked") ;

        return (
            <div className="huli-popup-content">
                <div className="huli-rist-result force-purchase">
                    <div> <img src={img} height="180" /> </div>
                    <p className="result-texts">{ message.lastResult }</p>
                    <p className="normal-explain">{ message.nowNeedResult }</p>
                </div>
                <div className="huli-one-checkbox popup-checkbox2" style={{display: this.props.needAgree? 'block': 'none'}}>
                    <em className={agreeCls} onClick={this.changeAgree}></em>
                    <span className="huli-agrees">我已知悉本产品风险，并同意继续转入。</span>
                </div>
            </div>
        )
    }
}
const mapRiskProps = (state, ownProps) => {
    return{
        state
    }
};

const mapDispatchRiskProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const RiskLevelLowerTip = connect(
    mapRiskProps,mapDispatchRiskProps
)(RiskLevelLower);


