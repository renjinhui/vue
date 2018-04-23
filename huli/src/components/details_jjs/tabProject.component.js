const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');

const ToolPE = require('../../common/tool').tansformMoney;
const ToolTM = require('../../common/tool').transformTime;
const ToolFormate = require('../../common/tool').format;
const ToolCutTM = require('../../common/tool').transformCutDownTime;

const projectTab = React.createClass({
  render:function(){
    let list = '';
    if(this.props.state.lcDetailsData.isFetching != 1)return(<div></div>);
    let datas = this.props.state.lcDetailsData.data.data;
    if(!this.props.userLogin.isLogin){
        list =  <div>
                    <ul className='detail-list'>
                        <li className='cf'>
                            <span className="list-til">起点金额</span>
                            <span className="list-content">{ToolPE(datas.asset.investLimitMin)}元起，1,000.00元整数倍递增</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">起息日</span>
                            <span className="list-content">{ToolTM(datas.asset.interestBegDate,'-')}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">到期日</span>
                            <span className="list-content">{ToolTM(datas.asset.interestEndDate,'-')}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">回款时间</span>
                            {
                                datas.asset.repayMode == 1
                                ?
                                <span className="list-content">还款日后3个工作日内</span>
                                :
                                <span className="list-content">项目到期日后3个工作日内</span>
                            }
                        </li>
                    </ul>
                    <div className='login-box'>
                        <span>更多信息请</span>
                        <a href="https://passport.huli.com/?backurl=https://www.huli.com/" target="_blank" className="detail_login">登录</a>
                        <span>或</span>
                        <a href="https://passport.huli.com/regist.html?backurl=https://www.huli.com/" target="_blank" className="detail_regist">注册</a>
                        <span>后查看</span>
                    </div>
                </div>
    }else{
        list =  <div>
                    <ul className='detail-list'>
                    {
                        datas.asset.titleForSale
                        ?
                        <li className='cf'>
                            <span className="list-til">产品名称</span>
                            <span className="list-content">{datas.jjsIsTransfer == 1 ? '转让'+datas.asset.titleForSale : datas.asset.titleForSale}</span>
                        </li>
                        :null
                    }
                    {
                        !datas.isSpecialAsset
                        ?
                        <li className='cf'>
                            <span className="list-til">债权编号</span>
                            <span className="list-content">{datas.jjsIsTransfer == 1 ? datas.assetTransfer.title : datas.asset.title}</span>
                        </li>
                        :null
                    }

                        
                        
                        <li className='cf'>
                            <span className="list-til">{datas.jjsIsTransfer==1 ? '转让利率' : '预期年化收益率'}</span>
                            <span className="list-content">{datas.jjsIsTransfer==1 ? ToolPE(datas.assetTransfer.investAnnualRate) : ToolPE(datas.asset.investAnnualRate)}%</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">{datas.jjsIsTransfer==1 ? '剩余期限' : '期限'}</span>
                            <span className="list-content">{datas.periods}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">{datas.jjsIsTransfer==1 ? "转让本金" : '募集金额'}</span>
                            <span className="list-content">{datas.jjsIsTransfer==1 ? ToolPE(datas.assetTransfer.principal) : ToolPE(datas.asset.amountFixed)}元</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">收益方式</span>
                            <span className="list-content">{datas.repayModeStr}</span>
                        </li>
                    {
                        datas.jjsIsTransfer != 1
                        ?
                        <li className='cf'>
                            <span className="list-til">起点金额</span>
                            <span className="list-content">{ToolPE(datas.asset.investLimitMin)}元起，1000的整数倍</span>
                        </li>
                        :null
                    }
                        
                        <li className='cf'>
                            <span className="list-til">{datas.jjsIsTransfer==1 ? '剩余时间' : '募集结束时间'}</span>
                            <span className="list-content">{datas.jjsIsTransfer==1 ? ToolCutTM(datas.leftTime) : ToolFormate(datas.asset.expireTime,'yyyy-MM-dd hh:mm:ss')}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">起息日</span>
                            <span className="list-content">{ToolTM(datas.asset.interestBegDate,'-')}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">到期日</span>
                            <span className="list-content">{ToolTM(datas.asset.interestEndDate,'-')}</span>
                        </li>
                        <li className='cf'>
                            <span className="list-til">回款时间</span>
                            <span className="list-content">{datas.asset.repayMode == 1 ? '还款日后3个工作日内' : '项目到期日后3个工作日内'}</span>
                        </li>
                    {
                        datas.asset.riskLevel>0
                        ?
                        <li className='cf'>
                            <span className="list-til">风险等级</span>
                            <span className="list-content">{codes.bid_risklevel[datas.asset.riskLevel.toString()]}</span>
                        </li>
                        :null
                    }
                    {
                        datas.assetDetail && datas.assetDetail.repaySafeInfo ?
                        <li className='cf'>
                            <span className="list-til">还款保障</span>
                            <span className="list-content">{datas.assetDetail.repaySafeInfo}</span>
                        </li>
                        :''
                    }
                    </ul>
                {
                    datas.assetDetail && datas.assetDetail.proDes ?
                    <div className="project-title instruct-title">项目介绍</div>
                    :''
                }
                    <div className="instruct-content" dangerouslySetInnerHTML={{__html:(datas.assetDetail ? datas.assetDetail.proDes : '')}}></div>
                {
                    datas.assetDetail && datas.assetDetail.propertyListUrl
                    ?
                    <div className='assets-detail'>
                        <a href={datas.assetDetail.propertyListUrl}>查看基础资产明细</a>
                    </div>
                    :null
                }
                {
                    datas.asset.fedPrdType == 3
                    ?
                    <div>
                    <div className="project-title instruct-title">保险公司介绍</div>
                    <div className="instruct-content" dangerouslySetInnerHTML={{__html:datas.assetDetail.insCompanyDes}}></div>
                    {
                        datas.assetDetail && datas.assetDetail.propertyListUrl
                        ?
                        <div className='assets-detail'>
                            <a href={datas.assetDetail.propertyListUrl}>查看基础资产明细</a>
                        </div>
                        :null
                    }
                    <div className="project-title instruct-title">理赔信息</div>
                    <div className="instruct-content" dangerouslySetInnerHTML={{__html:datas.assetDetail.claimInfo}}></div>
                    </div>
                    :null
                    
                }
                    <div className="project-title transfer-title">转让说明</div>
                {
                    datas.jjsIsTransfer == 1
                    ?
                    <ul className="tansfer-list">
                        <li className='cf'>
                            <span>1、</span>
                            <span>转让为项目全部剩余持有份额，不可分拆或部分转让，转让不可调价；受让人受让全部转让份额，不支持拆分转让；</span>
                        </li>
                        <li className='cf'>
                            <span>2、</span>
                            <span>项目持有满30天可发起转让，持有的转让项目满14天即可再次发起转让；产品到期日前15天不可转让，产品约定还款日及前一日不可转让（遇法定节假日顺延），法定节假日不可转让；</span>
                        </li>
                        <li className='cf'>
                            <span>3、</span>
                            <span>从上个还款日到转让成功日的收益，按天计算，由受让人垫付给出让人；</span>
                        </li>
                        <li className='cf'>
                            <span>4、</span>
                            <span>转让有效期72小时，可主动撤销，有回款自动撤销，有购买自动成交；如遇法定节假日或其他约定的不可转让日，则转让自动撤销；</span>
                        </li>
                        <li className='cf'>
                            <span>5、</span>
                            <span>转让项目撤销后，可以重新发起转让请求；</span>
                        </li>
                        <li className='cf'>
                            <span>6、</span>
                            <span>转让收费标准：转让债权的转让费用=转让本金*0.5%；</span>
                        </li>
                    </ul>
                    :
                    <div className="tansfer-list" dangerouslySetInnerHTML={{__html:datas.transferMode}}>
                        
                    </div>
                }

                    <div className="project-title instruct-title">项目免责声明</div>
                    <div className="instruct-content">
                        狐狸慧赚将严格按照合作机构提供的信息进行展示，平台不承担产品的兑付风险。
                    </div>
                </div>
    }
    return (
        <div className="project-detail-list-box">
            <div className="project-title detail-title">产品详情</div>
            {list}
        </div>   
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return{
    state,
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const ProjectTab = connect(
  mapStateToProps,mapDispatchToProps
)(projectTab);