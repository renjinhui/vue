const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ToolPE = require('../../common/tool').tansformMoney;

const NomalL = require("./normal-component/headerLeft").HeaderLeft;
const TransL = require("./transfer-component/headerLeft").HeaderLeft;

const headerLeft = React.createClass({
  render:function(){
    if(this.props.state.lcDetailsData.isFetching != 1)return(<div></div>);
    let datas = this.props.state.lcDetailsData.data.data;
    let content = '';
    if(datas && datas.jjsIsTransfer !=1){
      content = <NomalL datas={datas}/>
    }else if(datas && datas.jjsIsTransfer ==1){
      content = <TransL datas={datas}/>
    }
    return (
      <div className='lt' style={{'height':'100%'}}>
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

export const HeaderLeft = connect(
  mapStateToProps,mapDispatchToProps
)(headerLeft);