const React = require('react');
const ListIntro = React.createClass({
  render:function(){
    return (
      <p className="recommend-title">{this.props.name}</p>
    );
  }
});


module.exports = {
  ListIntro
};