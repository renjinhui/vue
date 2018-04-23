const React = require('react');

const SystemBusy = React.createClass({
  render() {
    return (
        <div className="huli-popup-content">
            <div className="hq-popup-insufficient">
                <p className="hq-popup-only">{this.props.errorMessage}</p>
            </div>
        </div>
    )
  }
});

module.exports = {
  SystemBusy
};
