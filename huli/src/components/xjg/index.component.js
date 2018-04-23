const React = require('react');
const Info = require('./info.component').XJGInfo;
const Detail = require('./detail.component').XjgPro;
const XjgBanner = require('./xjgbanner.component').XjgBan;
const DocumentTitle = require('react-document-title');

export const XJGIndex = React.createClass({
  componentDidMount:function(){
  },
  render:function() {
    return (
    <DocumentTitle title='小金罐'>
      <div className="huli-hq-page">
        <Info />
        <XjgBanner />
        <Detail />
      </div>
    </DocumentTitle>

    )
  }
});
