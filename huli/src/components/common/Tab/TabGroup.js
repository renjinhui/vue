const React = require('react');
const {Link} = require('react-router');
const ReactDOM = require('react-dom');

export class TabGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentOrder: 0
        }
    }
    getCurrent(order){
        if(order == this.state.currentOrder)return;
        this.props.onChange(order)
        this.setState({
            currentOrder: order
        })
    }
    render(){
        let {
            label,
            children,
            style
        } = this.props;
        return (
            <div className={(this.props.className || '') + ' syd-account-tab'} style={style}>
                {
                    label ?
                    <span className='title name lt'>{label}</span>
                    :
                    ''
                }
                {
                    React.Children.map(children, (child,index) => {
                        return React.cloneElement(
                            child, {
                              onClick:(order)=> this.getCurrent(order),
                              currentOrder: this.state.currentOrder,
                              index:index
                            }
                        )
                    })
                }
            </div>
        );
    }
}