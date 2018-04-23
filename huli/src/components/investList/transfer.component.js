const React = require('react');
const Complete = require('./complete/transfer/complete-transfer-main.component').Main;
const Investing = require('./investing/transfer/investing-transfer-main.component').Main;
const Questions = require('./questions/questions.component').QuestionList;
const Ranking = require('./ranking/ranking.component').Ranking;
const DocumentTitle = require('react-document-title');


const Tranfer = React.createClass({
  render:function(){
    return (
      <DocumentTitle title='狐狸慧赚-转让'>
        <div>
          <Investing />
          <Complete />
          <div className="invest-bottom-contain cf">
            <Ranking limit="10" isTransfer="1"/>
            <Questions />
          </div>
        </div>

      </DocumentTitle>
    );
  }
});


module.exports = {
  Tranfer
};