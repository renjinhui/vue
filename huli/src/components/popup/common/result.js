const React = require('react');

class Result extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let iconClass = "";
        switch(this.props.icon){
            case 'error': iconClass = 'hq-common-images';
                break;
            case 'warning': iconClass = 'hq-ico-success hq-lose';
                break;
            case 'success': iconClass = 'hq-ico-success';
                break;
        }
        return (
            <div className="huli-popup-content">
                <div className="hq-popup-success">
                    <div className={iconClass}></div>
                    <div className="hq-popup-prompt">
                        <p className="hq-prompt-suc">{ this.props.title ? <span>{this.props.title}</span> : null }</p>
                        <div className="hq-prompt-balance">{this.props.content}</div>
                    </div>
                </div>
            </div>
        )
        
    }
}

module.exports = {
    PopupResult: Result
};
