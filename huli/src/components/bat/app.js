const React = require('react');
const Nav = require('./myaccount/navLink/nav.component').Nav;


const App = React.createClass({
  render:function(){
    return (
      <div className="myacoount-contain">
        <div className="myacoount-box cf">
          <Nav />
          {this.props.children}
        </div>
      </div>
    );
  }
});


module.exports = {
  App
};