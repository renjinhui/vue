var React = require('react');
var TabNav = require('./TabNav').TabNav;
var TabContent = require('./TabContent').TabContent;

var Tabs = React.createClass({
    getInitialState:function(){
        let activeIndex = 0;

        if(this.props.activeIndex){
            activeIndex = this.props.activeIndex
        }
        return {
            activeIndex,
            prevIndex:activeIndex
        }
    },
    handleTabClick:function(activeIndex){
        const prevIndex = this.state.activeIndex;

        if(this.state.activeIndex !== activeIndex){
            this.setState({
                activeIndex,
                prevIndex
            })
        }
    },
    renderTabNav:function(){
        return (
            <TabNav onTabClick={this.handleTabClick}
                    panels={this.props.children}
                    activeIndex={this.state.activeIndex}/>
        );
    },
    renderContent:function(){
        return (
                <TabContent panels={this.props.children}
                            activeIndex={this.state.activeIndex} />
            )

    },
    render:function(){

        return (
            <div className="ui-tabs">
            {this.renderTabNav()}
            {this.renderContent()}
        </div>)
    }
});

module.exports = {
    Tabs
};