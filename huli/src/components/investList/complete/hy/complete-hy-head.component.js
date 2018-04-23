const React = require('react');
const TableHead = React.createClass({
  render:function(){
    return (
      <div className="list-title cf">
        <div className="lt list-30">&nbsp;</div>
        <div className="lt list-310"><p>产品名称</p></div>
        <div className="lt list-20">&nbsp;</div>
        <div className="lt list-140">
          <a href="javascript:" className="adjust cf low-high">
            <p className="lt">预期年化收益率</p>
            <div className="top-down lt">
              <span className="top huli-common-icons"></span>
              <span className="down huli-common-icons"></span>
            </div>
          </a>
        </div>
        <div className="lt list-110">
          <p className="rt">项目金额(元)</p>
        </div>
        <div className="lt list-50">&nbsp;</div>
        <div className="lt list-110">
          <a href="javascript:" className="adjust cf low-high">
            <p className="lt">期限</p>
            <div className="top-down lt">
              <span className="top huli-common-icons"></span>
              <span className="down huli-common-icons"></span>
            </div>
          </a>
        </div>
        <div className="lt list-110 repayment-way">
          <div className="lt top-border">
            <p className="lt">还款方式</p>
            <a href="javascript:" className="drop-down-big huli-common-icons lt"></a>
          </div>
          <div className="way-list">
            <p>等额本息</p>
            <p>先息后本</p>
            <p>一次结清</p>
          </div>
        </div>
        <p className="time-warn rt">工作日10:30、14:30、20:00、22:00开放</p>
      </div>
    );
  }
});


module.exports = {
  TableHead
};
