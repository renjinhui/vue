const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const NomalR = require("./normal-component/headerRight").HeaderRight;
const TransR = require("./transfer-component/headerRight").HeaderRight;

const headerRight = React.createClass({
  render:function(){
    if(this.props.state.lcDetailsData.isFetching != 1)return(<div></div>);
    let datas = this.props.state.lcDetailsData.data.data;
    let userData = this.props.state.userBase.account.data;
    let content = '';
    if(datas && datas.jjsIsTransfer !=1){
      content = <NomalR datas={datas} userData={userData}/>
    }else if(datas && datas.jjsIsTransfer ==1){
      content = <TransR datas={datas} userData={userData}/>
    }
    return (
        <div className="header-right rt">
        {content}
        </div>    
    );
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

export const HeaderRight = connect(
  mapStateToProps,mapDispatchToProps
)(headerRight);