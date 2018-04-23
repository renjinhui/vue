var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
// var Motion = require('react-motion').Motion;
// var spring = require('react-motion').spring;
var InkBar = require('./InkBar').InkBar;

function getOuterWidth(el) {
    return el.offsetWidth;
}

function getOffset(el) {
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();


    return {
        top: box.top + (window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop) - html.clientTop,
        left: box.left + (window.pageXOffset|| document.documentElement.scrollLeft||document.body.scrollLeft) - html.clientLeft
    };
}


var TabNav = React.createClass({
    getInitialState:function(){
        const { activeIndex } = this.props;
        return {
            overIndex:activeIndex ? activeIndex : 0,
            inkBarWidth: 0,
            inkBarLeft: 0
        }
    },
    componentDidMount() {
        const { activeIndex } = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];

        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left
        });
    },

    componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const { activeIndex } = this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];

            this.setState({
                inkBarWidth: getOuterWidth(el),
                inkBarLeft: getOffset(el).left
            });
        }
    },
    handleOver:function(overIndex){

        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[overIndex];
        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left
        });
    },
    handleOut:function(){
        const { activeIndex } = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];
        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left
        });
    },
    getTabs:function(){
        var _this = this;
        return this.props.panels.map((child) => {

            if(!child){return;}

            const order = parseInt(child.props.order);

            let classes = classNames({
                tab:true,
                current: _this.props.activeIndex == order
            });

            let events = {};
            events = {
                onClick:this.props.onTabClick.bind(null,order),
                // onMouseOver:this.handleOver.bind(null,order),
                onMouseOut:this.handleOut
            };
            const ref = {};
            if (this.props.activeIndex === order) {
                ref.ref = 'activeTab';
            }
            return (

                <li role="tab" key={child.props.order} {...events} className={classes} {...ref}>
                    {child.props.tab}
                </li>
            );
        });
    },
    render:function(){

        const {activeIndex} = this.props;

        const rootClasses = classNames({
            bar:true
        });
        return (
            <div role="tablist" className="tab-control-a cf">


                <InkBar width={this.state.inkBarWidth} left={this.state.inkBarLeft} />

                  {/*<Motion style={{ left: spring(this.state.inkBarLeft,{damping:18}) }}>*/}
                    {/*{({ left }) => <InkBar width={this.state.inkBarWidth} left={left} />}*/}
                {/*</Motion>*/}
                <ul >
                    {this.getTabs()}
                </ul>
            </div>
        )
    }
});

module.exports = {
    TabNav
};
