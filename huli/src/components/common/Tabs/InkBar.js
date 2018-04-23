
var React = require('react');
var classNames = require('classnames');



var InkBar = React.createClass({
    render() {
        const { left, width } = this.props;

        const classes = classNames({
            inkBar: true
        });
        //<div styleName={classes} className="top-line" style={{width: width,left:`${left}`}}>

        return (

                <div styleName={classes} className="top-line" style={{width: width,left:`${left}px`}}>
                </div>
        );
    }
});

module.exports = {
    InkBar
};