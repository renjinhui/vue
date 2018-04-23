 const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const Risk = require('../../../reducers/risk/riskActions');

const RiskQuestionClass = React.createClass({
  getInitialState() {
    return {
        questions_current: 0,   //当前停留的项
        leftCls: 'pre',
        rightCls: 'next cf'
    }
  },
  componentWillReceiveProps(nextProps){
  },
  componentWillUnmount(){
  },
  componentWillMount() {
      this.props.dispatch(Risk.popupSetRiskQuestionsAnswers({}));
      if(this.props.state.risk.questions.length === 0){
          this.props.dispatch(Risk.popupGetRiskQuestionsPost());
      }
  },
  choosePre() {
    this.setCurrentQuestion(this.state.questions_current - 1);
  },
  chooseNext() {
    this.setCurrentQuestion(this.state.questions_current + 1);
  },
  setCurrentQuestion(currentIndex) {
    let doneCount = 0; //当前完成总数
    for(let i in this.props.state.risk.questions_answers){
      if(i != "__proto__"){
        doneCount = doneCount + 1;
      }
    }

    //设置currentIndex属性
    if(currentIndex > doneCount){
        return;
    }else if(currentIndex < 0){
        currentIndex = 0;
    }else if(currentIndex > this.props.state.risk.questions.length - 1){
        currentIndex = this.props.state.risk.questions.length - 1;
        this.props.setSubmitDisabled(false,'lastAnswer');
    }

    // 左右按钮赋样式
    if(currentIndex - 1 >= 0){
      this.setState({ leftCls: 'pre next-ques' });
    }else{
      this.setState({ leftCls: 'pre' });
    }
    if(currentIndex + 1 <= doneCount){
      this.setState({ rightCls: 'next cf next-ques' });
    }else{
      this.setState({ rightCls: 'next cf' });
    }

    this.setState({
        questions_current: currentIndex
    });
  },
  chooseAnswer(item) {
    this.props.dispatch(Risk.popupSetRiskQuestionsAnswer(item.qid, item.answerid));
    setTimeout(() => {
        this.setCurrentQuestion(item.index + 1);
    }, 400);
  },
  render() {
    const data = this.props.state.risk;
    let nextText = this.state.questions_current + 1 + '/' + data.questions.length;
    let title = '', q = '', arr = [];
    if(data.questions_isFetching == 1){
        title = this.state.questions_current + 1 + '、';
        let item = data.questions[this.state.questions_current];
        q = item.question.split(' ')[1];
        for(let i = 0; i < item.answers.length; i++){
            let _id = item.answers[i].id;
            let isChecked = data.questions_answers[item.id] === _id;
            arr.push({
                index: this.state.questions_current,
                qid: item.id,
                answerid: _id,
                answer: item.answers[i].answer,
                cls: isChecked? "huli-rist-radio lt checked" : "huli-rist-radio lt"
            });
        }
    }

    return (
        <div className="huli-popup-content posi-relative">
            <div className="hulirist-module">
                <div className="title cf">
                    <p>{ title }</p>
                    <span>{ q }</span>
                </div>
                {
                    arr.map((item, i) => {
                        return <div className="risk-ques-list" onClick={ () => this.chooseAnswer(item) } key={ item.answerid }>
                            <em className={ item.cls }></em>
                            <span>{ item.answer }</span>
                        </div>
                    })
                }
            </div>
            <div className="hulirist-arrows">
                <a href="javascript:;" onClick={ this.choosePre } className={this.state.leftCls}><em className="certifi-img"></em></a>
                <a href="javascript:;" onClick={ this.chooseNext } className={this.state.rightCls}><span>{ nextText }</span><em className="certifi-img"></em></a>
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

export const RiskQuestion = connect(
  mapStateToProps,mapDispatchToProps
)(RiskQuestionClass);
