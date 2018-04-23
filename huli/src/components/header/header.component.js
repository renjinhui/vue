const React = require('react');
const Top = require('./top/top.component').Top;
const Nav = require('./nav/nav.component').Nav;
// const Banner = require('./banner/banner.component').Banner;
// const Notice = require('./notice/notice.component').Notice;


const Header = React.createClass({
  render() {
    return (
      <div className="huli-head">
        <Top />
        <div className="gray-line"></div>
        <Nav />
      </div>
    )
  }
});

module.exports = {
  Header
};