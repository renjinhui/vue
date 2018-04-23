const React = require('react');


const InvestTitle = React.createClass({
  componentWillMount:function(){
  },
  render() {
    return (
      <p className="manage-title">{this.props.name}</p>
    )
  }
});

module.exports = {
  InvestTitle
};