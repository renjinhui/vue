const React = require('react');
const connect = require('react-redux').connect;
const changeCardAction = require('../../reducers/collocation/changeCardAction');

const CcResults = React.createClass({
  componentDidMount() {

  },

  render() {
    // console.log(this.props.context);
    const { message } = this.props.context;
    return (
      <div className="huli-popup-content">
        {
          <div className="hq-popup-success">
            {
              this.props.context.isSuccess === true
                ? <div className="hq-ico-success"></div>
                : null
            }
            <div className="hq-popup-prompt">
              <p className="hq-prompt-suc">
                <span>{this.props.context.title}</span>
              </p>
              <div className="hq-prompt-balance">
                {
                  this.props.context.style === 'left'
                  ? <p className="hq-prompt-plr-60" dangerouslySetInnerHTML={{__html:message}}></p>
                  : <p className="hq-prompt-plr-100" dangerouslySetInnerHTML={{__html:message}}></p>

                }

                {
                  this.props.context.hasHelp === true
                    ? <p className="hq-prompt-plr-100">如需帮助，请致电客服<a> 400-817-8877</a></p>
                    : null
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    changeCardData: state.changeCardData,
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export const CcResult = connect(
  mapStateToProps,
  mapDispatchToProps
)(CcResults);
