const React = require('react');
const { connect } = require('react-redux');

class PopupTip extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-insufficient">
                    <p className="hq-popup-only">{this.props.content}</p>
                </div>
            </div>
        )
        
    }
}

module.exports = {
    PopupTip
};