const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;


export const foxjf = React.createClass({
  getInitialState:function(){
    return {
      data:{
        gainScore:'',
        expendScore:''
      },
    }
  },
  componentDidMount:function(){
    
  },
  getData(){

  },
  render:function() {
    if(this.props.state.monthBillHeadList.isFetching == 1 && this.props.state.monthBillData.isFetching == 1){
      this.state.data = this.props.state.monthBillData.data.data;
    }
    return (
      
        // {<!--狐狸积分start-->}
        <div className="asset-changebox asset-changebox-L top-space">
             <div className="asset-title">
                 <div className="public-title">狐狸积分</div><span className="unit-span"></span><span className="download-span"></span>
             </div>
             <div className="points">
                  <ul>
                      <li>
                          <div className="round">
                              <div className="round-icon"></div>
                              <div className="round-num">{this.state.data.gainScore || '0.00'}</div>
                              <div className="round-text">本月收入积分汇总</div>
                          </div>
                      </li>
                      <li>
                          <div className="round round2">
                              <div className="round-icon1"></div>
                              <div className="round-num">{this.state.data.expendScore || '0.00'}</div>
                              <div className="round-text">本月支出积分汇总</div>
                          </div>
                      </li>
                  </ul>
             </div>
             <div className="points-foot">
                 
             </div>
        </div>
        // {<!--取现狐狸积分end-->}


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

export const FoxjfCom = connect(
  mapStateToProps,mapDispatchToProps
)(foxjf);