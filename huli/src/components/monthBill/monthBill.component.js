const React = require('react');
const DocumentTitle = require('react-document-title');


const Head = require('./monthBill-head.component').MonthBillHead;
const Body = require('./monthBill-body.component').MonthBillBody;


export const MonthBill = React.createClass({
  componentDidMount:function(){
  },
  render:function() {
    return (
    <DocumentTitle title='月账单'>
      <div className="myacoount-billcontain">
        <Head></Head>
        <Body></Body>
      </div>
    </DocumentTitle>

    )
  }
});