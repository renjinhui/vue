const React = require('react');
const Complete = require('./complete/hyou/complete-hyou-main.component').Main;
const Investing = require('./investing/hyou/investing-hyou-main.component').Main;
const Questions = require('./questions/questions.component').QuestionList;
const Ranking = require('./ranking/ranking.component').Ranking;
const DocumentTitle = require('react-document-title');


const HYOU = React.createClass({
  render:function(){
    return (
      <DocumentTitle title='狐狸慧赚-慧优'>
        <div>
          <Investing />
          <Complete />
          <div className="invest-bottom-contain cf">
            <Ranking limit="10" isTransfer="0"/>
            <Questions />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});


module.exports = {
  HYOU
};