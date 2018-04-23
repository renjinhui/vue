const React = require('react');

const PopupError = React.createClass({
  render() {
    return (
        <div className="huli-popup-content">
            <div className="hq-popup-success">
                <div className="hq-common-images"></div>
                <div className="hq-popup-prompt">
                    <p className="hq-prompt-suc">
                        <span>{this.props.errorTitle}</span>
                    </p>
                    <p className="hq-prompt-balance">
                        {this.props.errorMessage}
                    </p>
                </div>
            </div>
        </div>
    )
  }
});

module.exports = {
  PopupError
};
