const React = require('react');
const ReactRedux = require('react-redux');
const actions = require('../../reducers/myaccount/overviewActions');
var connect = ReactRedux.connect;

class Overview extends React.Component {
  constructor(props){
    super(props);
    this.count = 0;
  }
  clickFn(){
    this.props.changeTab(++this.count);
  }
  render() {
    return (
      <div onClick={this.clickFn.bind(this)}>
        点击我！看看我的index变化：{this.props.index}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    index: state.overview.index 
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab: (val) => {
      dispatch(actions.changeTab(val))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);