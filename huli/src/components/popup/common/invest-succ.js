const React = require('react');

class InvestSucc extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="huli-popup-content">
                <div className="detail-popup-success">
                    <div className="detail-ico-success"></div>
                    {this.props.content}
                    {
                        this.props.showAd?
                        <div className="activity-banner">
                            <img src={this.props.adSrc} alt="" />
                        </div>
                        :
                        null
                    }
                    
                </div>
            </div>
        )
        
    }
}

module.exports = {
    InvestSucc
};

