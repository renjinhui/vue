const React = require('react');
const {Link} = require('react-router');

export class Url extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    tabClick(e,value,i){

    }
    
    render(){
            return (
                <Link to={this.props.url} activeClassName='current' className={this.props.index == 0 ? 'syd-tab-item bd-left' : 'syd-tab-item'}>{this.props.children}</Link>
                )
    }
}