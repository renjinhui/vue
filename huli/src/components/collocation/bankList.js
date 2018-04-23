const React = require('react');

export const BankList = React.createClass({

  getInitialState() {
    return {
      selectBank: null,
      bankListShow: false,
      selectedBank: null
    }
  },

  componentWillReceiveProps() {
    if (this.props.selectedBank && this.state.selectedBank === null) {
      const { codeValue, codeName } = this.props.selectedBank;
      this.selectBank(codeValue, codeName);
    }
  },

  clickBank() {
    let timer;
    clearTimeout(timer);
    if (this.state.bankListShow === false) {
      this.setState({
        bankListShow: true,
        selectBank: true
      });
      this.props.clickBanks(true);
    } else {
      this.setState({ selectBank: false });
      timer = setTimeout(() => {
        this.setState({ bankListShow: false });
        this.props.clickBanks(false);
      }, 500);
    }
  },

  selectBank(codeValue, codeName) {
    this.setState({
      selectedBank: {
        codeValue,
        codeName,
      }
    });
    this.props.selectBank(codeValue, codeName);
  },

  bankLogo(codeValue){

  },

  render: function () {
    return (
      <div className="oa-select" onClick={this.clickBank}>
        <div className="oa-select-title">
          {
            this.state.selectedBank === null
              ? <div className="oa-selected-item">
              <div className="oa-blank"></div>
              ---请选择---
            </div>
              : <div className="oa-selected-item">
              <img className="oa-bank-icon"
                   src={`https://static.huli.com/images/bank-logo/${this.state.selectedBank.codeValue}.png`} />
              {this.state.selectedBank.codeName}
            </div>
          }
        </div>
        <div className={this.state.selectBank === null
          ? "oa-arrow drop-down-big huli-common-icons"
          : this.state.selectBank === false
            ? "oa-arrow drop-down-big huli-common-icons oa-rotate-left"
            : "oa-arrow drop-down-big huli-common-icons oa-rotate-right"
        }></div>
        {
          <div className={
            this.state.bankListShow === false
              ? "oa-select-list oa-close-list oa-hide"
              : this.state.selectBank === true
                ? "oa-select-list oa-open-list oa-show"
                : "oa-select-list oa-close-list oa-show"
          }>
            <div className="oa-select-list-inner">
              {(this.props.data).map((item) => {
                const { codeValue, codeName } = item;
                return (
                  <div className="oa-select-item"
                       key={codeValue.toString()}
                       onClick={this.selectBank.bind(this, codeValue, codeName)}>
                    <img className="oa-bank-icon" src={`https://static.huli.com/images/bank-logo/${codeValue}.png`} />
                    {codeName}
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    )
  }
})
