const React = require('react');

const Header = require('../header/header.component').Header;
const Banner = require('../header/banner/banner.component').Banner;
const Notice = require('../header/notice/notice.component').Notice;
const Tabs = require('./investing-tabs.component').Tabs;
const Link = require('react-router').Link;


const InvestList = React.createClass({
  render:function(){
    return (
      <div>
        <Banner/>
        <Notice/>
        <div className="empty-div"></div>
        <div className="invest-contain">
          <div className="invest-list-contain">
            <Tabs />
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
});


module.exports = {
  InvestList
};