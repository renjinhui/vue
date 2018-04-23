const React = require('react');
const Complete = require('./complete/hb/complete-hb-main.component').Main;
const Investing = require('./investing/hb/investing-hb-main.component').Main;
const Questions = require('./questions/questions.component').QuestionList;
const Ranking = require('./ranking/ranking.component').Ranking;
const DocumentTitle = require('react-document-title');


const HB = React.createClass({
  render:function(){
    return (
      <DocumentTitle title='狐狸慧赚-慧保'>
        <div id="hb">
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
  HB
};