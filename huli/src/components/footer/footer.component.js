const React = require('react');
const Util = require('../../common/util');

const Footer = React.createClass({
  componentDidMount:function(){
    $(".iphone-downloads").hover(function(){
      let _this = $(this);
      _this.find('.code-images').show().parent().siblings().find('.code-images').hide();
    },function(){
      $(".code-images.iphone").show().parent().siblings().find('.code-images').hide();
    });
    this.refs.year.innerText = (new Date()).getFullYear();
  },
  render:function() {
    const androidHref = Util.ANDROID_VERSION;
    const iosHref = Util.IOS_VERSION;

    return (
      <div className="huli-bottom">
        <div className="huli-bottom-contain cf">
          <div className="introduce-box lt">
            <a href="https://help.huli.com/about/aboutus.html" target="_blank">公司介绍</a>
            <a href="https://events.huli.com/static/web/guide/" className="left-40" target="_blank">新手福利</a>
            <a href="https://help.huli.com/huli/announ/subannoun/index.htm" target="_blank">系统公告</a>
            <a href="https://help.huli.com/huli/help/index.htm" className="left-40" target="_blank">帮助中心</a>
            <a href="https://www.souyidai.com/" target="_blank">搜易贷官网</a>
          </div>
          <div className="second-box lt">
            <div className="images-herf cf">
              <a href="http://www.experian.com/" target="_blank" className="huli-common-icons"></a>
              <a href="http://www.fico.com/" target="_blank" className="huli-common-icons picture"></a>
            </div>
            <p>与国际著名的征信机构Experian和FICO云决策平台合作，使用特别定制的评分卡与风控模型</p>
          </div>
          {/*<div className="two-code lt">*/}
            {/*<a href="javascript:;" target="_blank" className="iphone-downloads cf">*/}
              {/*<em className="huli-common-icons iphone-icon "></em>*/}
              {/*<p>iPhone</p>*/}
              {/*<div className="code-images iphone" style={{display: "block"}}>*/}
                {/*<span><img src="https://static.huli.com/images/page-home/app-code.png" /></span>*/}
              {/*</div>*/}
            {/*</a>*/}
            {/*<a href="javascript:;" target="_blank" className="iphone-downloads cf">*/}
              {/*<em className="huli-common-icons android-icon "></em>*/}
              {/*<p>Android</p>*/}
              {/*<div className="code-images android" style={{display: "none"}}>*/}
                {/*<span><img src="https://static.huli.com/images/page-home/app-code.png" /></span>*/}
              {/*</div>*/}
            {/*</a>*/}
          {/*</div>*/}

          <div className="two-code lt">
            <a href="https://events.huli.com/static/web/huli-app/" target="_blank" className="code-images lt">
              <span><img src="https://static.huli.com/images/page-home/app-code.png" /></span>
            </a>
            <div className="app-downloads lt">
              <a href={iosHref} target="_blank" className="iphone-downloads cf">
                <em className="huli-common-icons iphone-icon "></em>
                <p>iPhone</p>
              </a>
              <a href={androidHref} target="_blank" className="iphone-downloads cf">
                <em className="huli-common-icons android-icon "></em>
                <p>Android</p>
              </a>
            </div>
          </div>

          <div className="service-detail rt">
            <p className="time">服务时间：周一至周日（9:00-18:00）</p>
            <p className="phone-num">400-817-8877</p>
            <div className="list-boxs">
              <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&amp;key=XzkzODAxMzk0MV8xODA2ODFfNDAwMDE2ODg2Nl8yXw" target="_blank">在线客服</a>
              <a href="mailto:kefu@huli.com">客服邮箱</a>
              <a href="javascript:void(0)" className="huli-weixin">微信
                <div className="micro" style={{display:"block"}}>
                  <span><img src="https://static.huli.com/images/page-home/weixin-code.png" width="100" height="100" /></span>
                  <p className="up_in"></p>
                </div>
              </a>

            </div>
          </div>
        </div>
        <div className="huli-bottom-herf cf">
          <div className="lt">
            <a href="javascript:" className="copy-a">Copyright©<span ref="year">2017</span> Fox Fintech Group. All Rights Reserved.</a><br/>
            <a className="copy-a" target="_blank" href="javascript:">
                <span>京ICP备16056530号-2　</span>
            </a>
            <a href="javascript:" className="copy-a">风险提示：投资有风险 理财需谨慎</a>
          </div>
          <div className="rt approve-identify">
            <a href="http://www.itrust.org.cn/home/index/itrust_certifi/wm/PJ2017042501" target="_blank" className="approve-three"></a>
            <a href="https://credit.szfw.org/CX20170419033660111638.html" target="_blank" className="approve-two"></a>
            <a href="https://ss.knet.cn/verifyseal.dll?sn=e1704271101086756230d4000000&comefrom=trust" target="_blank" className="approve-one"></a>
            <a href="https://v.pinpaibao.com.cn/cert/site/?site=www.huli.com&at=business" target="_blank" className="approve-fore"></a>
            <a href="http://www.itrust.org.cn/home/index/satification_certificate/wm/MY2017062601" target="_blank" className="approve-five"></a>
            <a href="http://www.12315.com/Home/Top/p2p/year/2016" target="_blank" className="approve-six"></a>
          </div>
          {/*<div className="huli-links-web cf">*/}
            {/*<span className="huli-links-name lt">网站链接：</span>*/}
            {/*<div className="huli-links-a-list cf">*/}
                {/*<span className="overflow-hidden">*/}
                    {/*<a href="http://www.souyidai.com/ask/q-160.htm" target="_blank">p2p理财公司排名</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-253.htm" target="_blank">宁波银行理财产品</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-51.htm" target="_blank">最新理财产品排行</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-29.htm" target="_blank">月收入5000如何理财</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-50.htm" target="_blank">目前最好的理财方式</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-25.htm" target="_blank">月入3000如何理财</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-10.htm" target="_blank">工薪族如何理财</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/q-47.htm" target="_blank">狐狸金服</a>*/}
                {/*</span>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*<div className="huli-links-web cf">*/}
            {/*<span className="huli-links-name lt">友情链接：</span>*/}
            {/*<div className="huli-links-a-list lt">*/}
                {/*<span className="overflow-hidden">*/}
                    {/*<a href="http://www.focus.cn/" target="_blank">搜狐焦点</a>*/}
                    {/*<a href="http://money.sohu.com/" target="_blank" rel="nofollow">搜狐理财</a>*/}
                    {/*<a href="https://pay.sina.com.cn/" target="_blank" rel="nofollow">微钱包</a>*/}
                    {/*<a href="http://money.hexun.com/" target="_blank" rel="nofollow">和讯理财</a>*/}
                    {/*<a href="http://finance.qq.com/" target="_blank" rel="nofollow">腾讯理财</a>*/}
                    {/*<a href="http://finance.ifeng.com/" target="_blank" rel="nofollow">凤凰理财</a>*/}
                    {/*<a href="http://www.wdzj.com/" target="_blank" rel="nofollow">网贷之家</a>*/}
                    {/*<a href="http://www.p2peye.com/" target="_blank" rel="nofollow">网贷天眼</a>*/}
                    {/*<a href="http://www.kekegold.com/" target="_blank">可可黄金网</a>*/}
                    {/*<a href="http://www.souyidai.com/" target="_blank">P2P理财平台</a>*/}
                    {/*<a href="http://sh.focus.cn/" target="_blank">上海房地产</a>*/}
                    {/*<a href="http://www.simuwang.com" target="_blank">阳光私募基金</a>*/}
                    {/*<a href="http://loans.cardbaobao.com/" target="_blank">小额贷款</a>*/}
                    {/*<a href="http://www.kaixinbao.com/ " target="_blank">保险网</a>*/}
                    {/*<a href="http://gold.diyizby.com/" target="_blank">黄金价格</a>*/}
                    {/*<a href="http://www.souyidai.com/ask/" target="_blank">理财问答</a>*/}
                    {/*<a href="http://www.xs9999.com" target="_blank">鑫圣贵金属</a>*/}
                    {/*<a href="http://www.tou18.cn/ " target="_blank">股市行情</a>*/}
                    {/*<a href="http://www.caiguu.com/licai/" target="_blank">财股网理财</a>*/}
                    {/*<a href="http://gold.cngold.com.cn/" target="_blank">中金黄金</a>*/}
                    {/*<a href="http://www.nlnw.net/" target="_blank">房贷利率</a>*/}
                    {/*<a href="http://www.cignacmb.com/" target="_blank">招商信诺</a>*/}
                    {/*<a href="http://www.meng800.com/" target="_blank"> P2P网贷</a>*/}
                    {/*<a href="http://www.andaike.com/ " target="_blank">安贷客贷款</a>*/}
                    {/*<a href="http://www.goodgupiao.com" target="_blank">好股票</a>*/}
                    {/*<a href="http://www.asklicai.com" target="_blank">基金理财</a>*/}
                    {/*<a href="http://www.gpcxw.com" target="_blank">爱股网</a>*/}
                    {/*<a href="http://zhonghang.kameng.com" target="_blank">中国银行</a>*/}
                    {/*<a href="http://www.nongshang.com" target="_blank">中国农商银行</a>*/}
                    {/*<a href="http://www.souyidai.com" target="_blank">网上理财</a>                     */}
                    {/*<a href="http://www.agucn.com" target="_blank">A股中国</a>*/}
                    {/*<a href="http://www.miaogu.com" target="_blank">瞄股网</a>*/}
                    {/*<a href="http://shanghai.chashebao.com" target="_blank">上海社保网</a>*/}
                    {/*<a href="http://www.shuilv.org" target="_blank">优步税率</a>*/}
                    {/*<a href="http://value500.com" target="_blank">价值投资导航</a>*/}
                {/*</span>*/}
            {/*</div>*/}
            {/*<span className="huli-links-arrow">*/}
                {/*<a href="javascript:;" className="huli-common-icons"></a>*/}
            {/*</span>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
});

module.exports = {
  Footer
};