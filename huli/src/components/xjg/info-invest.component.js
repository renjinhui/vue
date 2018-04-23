const React = require('react');
const Main = require('./info-invest-main.component').XJGInfoInvestMain;
const Mess = require('./info-invest-mess.component').XJGInfoMess;
// const Mess = require('../popup/xjg-invest-component').xjgInvest;


const XJGInfoInvest = React.createClass({
  componentDidMount:function(){
  },
  render:function() {
    return (
      <div className="hq-version-boxs cf">
        <Main/>
        <Mess/>
      </div>
    )
  }
});

module.exports = {
  XJGInfoInvest
};

