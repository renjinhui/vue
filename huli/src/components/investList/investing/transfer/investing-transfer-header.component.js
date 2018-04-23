const React = require('react');
const TableHead = React.createClass({
  getInitialState:function(){
    return {
      raiseOrder:0,//0 默认 1升序 2降序,
      timeOrder :0,
      typeOrder:-1, //-1 默认 1等额本息 2 先本后息 3 一次结清
      isShow:false
    }
  },
  raiseEvent:function(){
    let index = 0;
    switch (this.state.raiseOrder){
      case 0:
        this.state.raiseOrder = 1;
        index = 1;
        break;
      case 1:
        this.state.raiseOrder = 2;
        index = 2;
        break;
      case 2:
        this.state.raiseOrder = 1;
        index = 1;

        break;
    }
    this.setState({raiseOrder:index});
    this.state = {
      timeOrder:0,
      typeOrder:-1,
      raiseOrder:index
    };
    this.props.raiseclick(this.state.raiseOrder)
  },
  timeEvent:function(){
    let index = 0;
    switch (this.state.timeOrder){
      case 0:
        this.state.timeOrder = 1;
        index = 1;
        break;
      case 1:
        this.state.timeOrder = 2;
        index = 2;
        break;
      case 2:
        this.state.timeOrder = 1;
        index = 1;
        break;
    }
    this.setState({timeOrder:index});
    this.state = {
      raiseOrder:0,
      typeOrder:-1,
      timeOrder:index
    };
    this.props.timeClick(this.state.timeOrder)
  },
  typeEvent:function(e,order){
    e.preventDefault();
    this.state = {
      raiseOrder:0,
      timeOrder:0
    };
    this.setState({isShow:false});
    this.state.typeOrder = order;
    this.setState({typeOrder:order});
    this.props.typeClick(order)

  },
  showSelect:function(){
    this.setState({isShow:!this.state.isShow})
  },
  render:function(){
    let raiseClass="adjust cf";
    let timeClass = "";
    switch (this.state.raiseOrder){
      case 0:
        raiseClass="adjust cf";
        break;
      case 1:
        raiseClass="adjust cf low-high";
        break;
      case 2:
        raiseClass="adjust cf high-low";
        break;
    }

    switch (this.state.timeOrder){
      case 0:
        timeClass="adjust cf";
        break;
      case 1:
        timeClass="adjust cf low-high";
        break;
      case 2:
        timeClass="adjust cf high-low";
        break;
    }
    return (
      <div className="list-title cf">
          <div className="lt list-30">&nbsp;</div>
          <div className="lt list-310"><p>产品名称</p></div>
          <div className="lt list-20">&nbsp;</div>
          <div className="lt list-140">
            <a href="javascript:" className={raiseClass} onClick={this.raiseEvent}>
              <p className="lt">转让利率</p>
              <div className="top-down lt">
                <span className="top huli-common-icons"></span>
                <span className="down huli-common-icons"></span>
              </div>
            </a>

          </div>
          <div className="lt list-110">
            <p className="rt">转让本金(元)</p>
          </div>
          <div className="lt list-50">&nbsp;</div>
          <div className="lt list-110">
            <a href="javascript:" onClick={this.timeEvent} className={timeClass}>
              <p className="lt">期限</p>
              <div className="top-down lt">
                <span className="top huli-common-icons"></span>
                <span className="down huli-common-icons"></span>
              </div>
            </a>
          </div>
          <div className={this.state.isShow ? "lt list-110 repayment-way select" :"lt list-110 repayment-way"} onClick={this.showSelect}>
            <div className="lt top-border">
              <p className="lt">还款方式</p>
              <a href="javascript:" className="drop-down-big huli-common-icons lt"></a>
            </div>
            <div className="way-list">
              <p onClick={(e) =>{this.typeEvent(e,-1)}}>默认方式</p>
              <p onClick={(e) =>{this.typeEvent(e,1)}}>等额本息</p>
              <p onClick={(e) =>{this.typeEvent(e,2)}}>先息后本</p>
              <p onClick={(e) =>{this.typeEvent(e,3)}}>一次结清</p>
            </div>
          </div>
          {/*<p className="time-warn rt">工作日10:30、14:30、20:00、22:00开放</p>*/}
        </div>
    );
  }
});


module.exports = {
  TableHead
};
