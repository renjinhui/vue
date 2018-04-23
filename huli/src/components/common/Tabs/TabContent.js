var React = require('react');
var classNames =require('classnames');


var TabContent = React.createClass({
    getTabPanes:function(){

        return this.props.panels.map((child) =>{

            if(!child){return;}

            const order = parseInt(child.props.order);
            const isActive = this.props.activeIndex == order;

            return React.cloneElement(child,{
                isActive,
                className:isActive ? 'active' :'',
                children:child.props.children,
                key:`tabpane-${order}`
            })
        })
    },
    render:function(){
        return (
            <div className="tab-control-contain">
                {this.getTabPanes()}
            </div>
        )
    }
});

module.exports = {
    TabContent
};