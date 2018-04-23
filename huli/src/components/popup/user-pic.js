const React = require('react');


const UserHead = React.createClass({
  render() {
    return (

      <div className="version-popup user-head-modal jjs-popup" style={{display:'none'}}>
        <div className="version-popup-main">
          <div className="version-popup-title">
            <span className="version-popup-closed" id="closeUserModel">
                <a href="javascript:;">
                    <em className="certifi-img">&nbsp;</em>
                </a>
            </span>
            <div className="version-popup-name">
              <div >
                <span className="version-popup-name-left"><strong className="settingTitle" style={{fontSize:'18px'}}>将微信头像同步到狐狸慧赚会赚头像</strong></span>
              </div>
            </div>
          </div>
          <div className="version-popup-content" style={{minHeight: '234px'}}>
            <img className="wechatImg" src="https://static.souyidai.com/www/images/version/my-account/wechat-head.gif" />
              <img className="wechatImgPro" src="https://static.souyidai.com/www/images/version/my-account/wechat-1.gif" />
          </div>
          <div className="version-popup-footer" style={{borderTop:'none'}}>
            <div className="version-popup-action">
                <span className="colwidth160">
                    <input type="button" className="version-btn-h30" id="nextStep" value="确  定" />
                    <span className="waiting-img" >
                        <em className="version-details-img"></em>
                    </span>
                </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  UserHead
};