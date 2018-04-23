const React = require('react');
const offsetLeft = require('../../common/tool').offsetLeft;
const offsetTop = require('../../common/tool').offsetTop;

class ToolTip extends React.Component {
    constructor(props) {
        super(props);

        let _text = this.props['data-text'] || '';
        let _arrText = _text.split('.');
        let _get_codes = '';
        if(_arrText.length == 2 && codes[_arrText[0]]){
            _get_codes = codes[_arrText[0]][_arrText[1]];
        }else{
            _get_codes = codes['local_tooltip'][_arrText[0]];
        }
        let _content = _get_codes? _get_codes : _text;
        this.state = {
            extClass: this.props.extClass || " ",
            content: _content ,
            left: 0,
            top: 0
        }
    }

    enter(){
        const oTip = this.refs.tip;
        const oContent = this.refs.content;
        this.setState({
            isShow: true,
            left: offsetLeft(oTip) - oContent.offsetWidth/2 + oTip.offsetWidth/2,
            top: offsetTop(oTip) + oTip.offsetHeight + 8,
            extClass: this.state.extClass + " " + this.props.hoverClass ? this.props.hoverClass : ''
        })
    }

    leave(){
        this.setState({
            isShow: false,
            extClass: this.props.extClass || " "
        })
    }

    render() {
        let spanClass = "circle-tooltip huli-common-icons version-tooltip-css " + this.state.extClass;
        let tipStyle = {
            display: "block",
            visibility: this.state.isShow? "visible": "hidden",
            left: this.state.left + 'px',
            top: this.state.top + 'px',
            width: this.props.width || 'auto'
        };
        return (
            <div className="lt" onMouseEnter={this.enter.bind(this)} onMouseLeave={this.leave.bind(this)}>
                <span ref="tip" className={spanClass}>{this.props.title ? this.props.title : ''}</span>

                <div ref="content" className="tool-tip" style={tipStyle}>
                    <div className="tool-tip-recive" dangerouslySetInnerHTML={ {__html: this.state.content}}>{}</div>
                    <p className="ar_up"></p>
                    <p className="ar_up_in"></p>
                </div>
            </div>
        )
    }
}

module.exports = {
    ToolTip
};
