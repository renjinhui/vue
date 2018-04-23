import './demo.css'

const React = require('react');
const {Link} = require('react-router');

class Demo extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className='demo_box'>
                <ul className='menu_box lt'>
                    <li>
                        <Link to='/demo/table' activeClassName='current'>table</Link>
                    </li>
                    <li>
                        <Link to='/demo/tab' activeClassName='current'>tab</Link>
                    </li>
                    <li>
                        <Link to='/demo/modal' activeClassName='current'>modal</Link>
                    </li>
                </ul>
                <div className='body_box lt'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

module.exports = {
    Demo
}