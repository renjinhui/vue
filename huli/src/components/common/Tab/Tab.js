const React = require('react');
const classNames = require('classnames');

export class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0
        }
    }
    tabClick(e,order){
        this.props.onClick(order)
    }
    render(){
        return (
            <span className={(this.props.className || '')+' syd-tab-item'} onClick={(e)=>{this.tabClick(e,this.props.order)}}>
                {this.props.children}
            </span>
        );
    }
}