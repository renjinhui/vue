const React = require('react');
const Tab = require('./investing-tabs-tab.component').Tab;
const Info = require('./user-info.component').UserInfo;
const Tabs = React.createClass({
  render:function(){
    return (
      <div className="tab-control-a cf">
        <Tab />
        <Info />
      </div>

    );
  }
});


module.exports = {
  Tabs
};