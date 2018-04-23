const React = require('react');

export const OAInput = React.createClass({

  getInitialState() {
    return {
      name: '',
      placeholder: '',
      info: '',
      isInfo: false,
      err: '',
      isErr: false
    }
  },

  onFocus() {
    this.setState({
      isInfo: true
    });
    ({}.hasOwnProperty.call(this.props, 'onFocus')) ? this.props.onFocus() : null;
  },

  onBlur() {
    this.setState({
      isInfo: false
    });
    const input = this.refs.input.value;
    ({}.hasOwnProperty.call(this.props, 'onBlur')) ? this.props.onBlur(input) : null;
  },

  onChange() {
    const input = this.refs.input.value;
    ({}.hasOwnProperty.call(this.props, 'onChange')) ? this.props.onChange(input) : null;
  },

  render: function () {
    return (
      <div className="oa-row">
        <div className="oa-left">
          {this.props.name}
        </div>

        <div className={this.props.isErr
          ? "oa-center oa-input-error"
          : "oa-center"}>
          <input
            type={this.props.type || 'text'}
            className="oa-input"
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            value={this.props.value}
            ref="input"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </div>

        <div className="oa-right">
          {
            this.state.isInfo
              ? <div className="oa-hint">
              <div className="oa-triangle"></div>
              <div className="oa-triangle-in"></div>
              {this.props.info}
            </div>
              : null
          }
          {
            this.props.isErr
              ? <div className="oa-info">{this.props.err}</div>
              : null
          }
        </div>
      </div>
    )
  }
});