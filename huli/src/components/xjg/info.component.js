const React = require('react');
const Invest = require('./info-invest.component').XJGInfoInvest;
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const hqDetailActions = require('../../reducers/xjg/xjgActions');

const Info = React.createClass({
  componentDidMount:function(){

  },

  getInitialState:function(){
    return{}
  },
  componentWillMount:function(){
    this.props.getHQDetail();
  },
  render:function() {
    const data = this.props.data;
    let productName = '小金罐';
    if(data.page_isFetching == 1){
      productName = data.page.xjg.productName;
    }

    return (
      <div className="hq-head-boxs">
        <div className="hq-gold-contain">
          <div className="hq-top-title cf">
            <div className="hq-common-images lt"></div>
            <p className="tilte-p lt">{productName}</p>
          </div>
          <div className="hq-center-title cf">
            <div className="hq-common-images lt left-images"></div>
            <p className="brief-p lt">回款随心投 理财倍轻松</p>
            <div className="hq-common-images lt right-images"></div>
          </div>
          <Invest />
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    data: state.hqDetail
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getHQDetail : function () {
      dispatch(hqDetailActions.xjgDetailPosts());
    }
  }
};

export const XJGInfo = connect(
  mapStateToProps,mapDispatchToProps
)(Info);