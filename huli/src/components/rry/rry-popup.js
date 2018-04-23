const React = require('react');
const cs = require('classnames');
const { Popup } = require('./../popup/index.popup');
const { connect } = require('react-redux');
const userBase = require('../../reducers/userBase/userBaseActions');

class RryPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoInvestState : false,
            agree:false
        }
    }
    componentDidMount(){
        this.setState({autoInvestState:this.props.balanceState})
    }
    changeAutoState(n){
        this.setState({autoInvestState:n===1},() => {
            this.autoObjChange()
        })
    }
    agreeChange(){
        const {agree} = this.state;
        this.setState({agree:!agree},() => {
            this.autoObjChange()
        })
    }
    autoObjChange(){
        const _obj = this.state;
        this.props.onChangeAutoInvest(_obj);
    }
    render() {
        const {autoInvestState,agree} = this.state;
        return (
            <div className="huli-popup-content">
                <div className="hq-T-auto">
                    <div className="select-mode cf open">
                        <p className="lt title">余额自动转入</p>
                        <div className={autoInvestState?'open-mode':'close-mode'} onClick={() => this.changeAutoState(1)}>
                            <span>开启</span>
                            <i></i>
                        </div>
                        <div className={!autoInvestState?'open-mode':'close-mode'} onClick={() => this.changeAutoState(2)}>
                            <span>关闭</span>
                            <i></i>
                        </div>
                    </div>
                    <p>设置余额自动转入，每日凌晨将自动将慧赚余额转入小金罐T+0，回款不再站岗</p>
                </div>

                <div className="hq-T-bottom">
                    <div className="huli-one-checkbox popup-checkbox">
                        <em className={cs({'huli-common-icons':true, 'checked':agree})} onClick={()=>this.agreeChange()}></em>
                        <span className="huli-agrees">同意<a href="javascript:" target="_blank">《余额自动转入协议》</a></span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateRryProps = (state, ownProps) => {
    return{
        state
    }
};

const mapDispatchRryProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
};

export const RryPopupMain = connect(
    mapStateRryProps,mapDispatchRryProps
)(RryPopup);