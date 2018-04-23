const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const actions = require('../../../reducers/questions/questionsActions');
const List = React.createClass({
  componentWillMount:function(){
    this.props.getQuestionData();
  },
  render:function(){
    let list1 = '';
    let list2 = '';
    if(this.props.question.isFetching == 1){
      list1 = this.props.question.data.map(function(item,index){
        if(index < 5){
          return (
            <div className="question-item-huli cf" key={index}>
              <span></span>
              <a href={item.link ? item.link : 'javascript:;'} target="_blank">{item.title}</a>
            </div>
          )
        }

      });

    }
    return (
      <div className="rt normal-question">
        <div className="title-top cf">
          <p className="question lt">常见问题</p>
          <p className="more rt"><a href="https://help.huli.com/huli/help/others/hot/index.htm" target="_blank"> 更多</a></p>
        </div>
        <div className="question-list">
          <div className="question-one">
            {list1}
          </div>
        </div>
      </div>
    );
  }
});


// module.exports = {
//   QuestionList
// };

const mapStateToProps = (state, ownProps) => {
  return{
    question:state.questionList
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQuestionData: () => {
      dispatch(actions.questionsListPosts())
    },
  }
};

export const QuestionList = connect(
  mapStateToProps,mapDispatchToProps
)(List);