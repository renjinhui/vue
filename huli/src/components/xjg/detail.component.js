const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Tabs = require('../common/Tabs/Tabs').Tabs;
const TabPane = require('../common/Tabs/TabPane').TabPane;
const ProDetail = require('./detail-proDetail.component').ProductDetail;
const ProRule = require('./detail-proRule.component').ProRule;
const Question = require('./detail-question.component').Question;
const actions = require('../../reducers/xjg/xjgActions');

const XJGDetail = React.createClass({
  componentWillMount:function(){
    this.props.getXjgProDetail();
  },
  render:function() {
    return (
    	<div className="hq-project-details">
    		<Tabs>
    			<TabPane order="0" tab={'产品详情'}><ProDetail /></TabPane>
    			<TabPane order="1" tab={'产品规则'}><ProRule /></TabPane>
    			<TabPane order="2" tab={'常见问题'}><Question /></TabPane>
    		</Tabs>
    	</div>	
    	);
  }
});

// module.exports = {
//   XjgPro
// };

const mapStateToProps = (state, ownProps) => {
  // console.log(22)
  return{
    hqDetail:state.hqDetail
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getXjgProDetail : function () {
      dispatch(actions.xjgProDetailPosts());
    }
  }
};

export const XjgPro = connect(
  mapStateToProps,mapDispatchToProps
)(XJGDetail);