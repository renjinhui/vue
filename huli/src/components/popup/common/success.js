const React = require('react');

class Success extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-success">
                    <div className="hq-ico-success"></div>
                    {this.props.content}
                </div>
            </div>
        )
        
    }
}

module.exports = {
    PopupSuccess: Success
};




