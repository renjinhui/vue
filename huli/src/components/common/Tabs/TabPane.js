var React = require('react');
var classnames = require('classnames');


var TabPane = React.createClass({
    render:function(){

        const { className, isActive, children } = this.props;

        const classes = classnames({
            panel: true,
            current: isActive
        });
        return (

            <div
                role="tabpanel"
                className={classes}
                aria-hidden={!isActive}>
                {children}
            </div>
        );
    }
});

module.exports = {
    TabPane
};
