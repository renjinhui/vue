const React = require('react');
const Complete = require('./complete/hy/complete-hy-main.component').Main;
const Investing = require('./investing/hy/investing-hy-main.component').Main;
const Questions = require('./questions/questions.component').QuestionList;
const Ranking = require('./ranking/ranking.component').Ranking;
const DocumentTitle = require('react-document-title');


const HY = React.createClass({
  render:function(){
    return (
      <DocumentTitle title='狐狸慧赚-慧盈'>
        <div id="hy">
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
  HY
};