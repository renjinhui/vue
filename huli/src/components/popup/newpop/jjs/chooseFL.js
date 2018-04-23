const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolPE = require('../../../../common/tool').tansformMoney;
const ToolTM = require('../../../../common/tool').transformTime;

const choosefl = React.createClass({
  getInitialState(){
    return{
      canChoose:true
    }
  },
  componentDidMount:function(){
    let obj = this.props.getFlObj;
    if(obj.canuseHb.length||obj.cannotuseHb.length||obj.cannotuseJx.length){
      this.setState({
        canChoose: true
      })
    }else if(obj.canuseJx.length && obj.canuseJx[0].isUsed != 1){
      this.setState({
        canChoose: true
      })
    }else{
      this.setState({
        canChoose: false
      })
    }
  },
  chooseHb(e,item){
    this.props.chooseHb(item)
  },
  showHbFn(){
    let obj = this.props.getFlObj;
    if(obj.canuseHb.length||obj.cannotuseHb.length||obj.cannotuseJx.length){
      this.props.showHbFn()
    }else if(obj.canuseJx.length && obj.canuseJx.isUsed != 1){
      this.props.showHbFn();
    }
  },
  render() {
    let getFlObj = this.props.getFlObj;
    return (
        // <div className={"popup-welfare lt" + (this.props.showHB ? ' search-welfare' : (this.state.canChoose ? '' : 'forbid-welfare'))} onClick={this.showHbFn}>
        <div className={"popup-welfare lt " + (this.state.canChoose ? (this.props.showHB ? 'search-welfare' : '') : 'forbid-welfare')} onClick={this.showHbFn}>
            <span>{this.props.recStr}</span>
            {this.state.canChoose ? <em></em> : ''}
            <div className='popup-welfare-contain'>
              <div className='height10'></div>
              <div className="popup-welfare-list" style={{display: this.props.showHB ? 'block' : 'none'}}>
              {
                getFlObj.maxGet&&getFlObj.maxGet.isUsed != 1?
                <div className="welfare-tr cf none-welfare" onClick={(e)=>{this.chooseHb(e,{})}}>
                    <em className="select-icon"></em>
                    <p>不使用福利</p>
                </div>
                :null
              }
                {
                  getFlObj.canuseHb?
                  getFlObj.canuseHb.map((item,index)=>{
                    return(
                      <div className={item.couponUserId == this.props.couponUserId ? "welfare-tr cf select" : "welfare-tr cf"}  onClick={(e)=>{this.chooseHb(e,item)}} key={index+'k'}>
                          <em className="select-icon"></em>
                          <p className="first-td">{ToolPE(item.amount)}元</p>
                          <p className="second-td">{ToolPE(item.bidLimitAmount)}起投</p>
                          <p className="third-td">{ToolTM(item.expiredTime)}过期</p>
                      </div>
                      )
                  })
                  :null
                }
                  
                {
                  getFlObj.canuseJx?
                  getFlObj.canuseJx.map((item,index)=>{
                    return(
                      <div className={item.couponUserId == this.props.couponUserId ? "welfare-tr cf select" : "welfare-tr cf"}  onClick={(e)=>{this.chooseHb(e,item)}} key={index+'k'}>
                          <em className="select-icon"></em>
                          <p className="first-td">{item.amount/100}%</p>
                          <p className="second-td">{ToolPE(item.bidLimitAmount)}起投</p>
                          <p className="third-td">{ToolTM(item.expiredTime)}过期</p>
                      </div>
                      )
                  })
                  :null
                } 
                  <p className="nowelfare-title">输入金额不满足起投金额的福利</p>
                {
                  getFlObj.cannotuseHb?
                  getFlObj.cannotuseHb.map((item,index)=>{
                    return(
                      <div className="nowelfare-tr cf select" key={index+'k'}>
                          <p className="first-td">{ToolPE(item.amount)}元</p>
                          <p className="second-td">{ToolPE(item.bidLimitAmount)}起投</p>
                          <p className="third-td">{ToolTM(item.expiredTime)}过期</p>
                      </div>
                      )
                  })
                  :null
                }
                {
                  getFlObj.cannotuseJx?
                  getFlObj.cannotuseJx.map((item,index)=>{
                    return(
                      <div className="nowelfare-tr cf select" key={index+'k'}>
                          <p className="first-td">{item.amount/100}%</p>
                          <p className="second-td">{ToolPE(item.bidLimitAmount)}起投</p>
                          <p className="third-td">{ToolTM(item.expiredTime)}过期</p>
                      </div>
                      )
                  })
                  :null
                }
              </div>
              <div className='height10'></div>
            </div>
        </div>
    )
  }
});
const mapStateToProps = (state, ownProps) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const chooseFL = connect(
  mapStateToProps,mapDispatchToProps
)(choosefl);
