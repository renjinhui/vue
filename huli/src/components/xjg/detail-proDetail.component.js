const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ProDetail = React.createClass({
	componentDidMount:function(){
	},
	render:function() {
        let rate = '',time = '',limit = '';
        let login_box = '';

        if(this.props.hqDetail.detail_isFetching == 1){
            let data=this.props.hqDetail.detail;
            rate = data.annualRate;
            time = data.confirmDate;
            limit = data.limitTips;
            // console.log(rate)
            // console.log(data)
            let quota = function(){
                if(limit != ""){
                    return(
                            <div className="huli-details-items">
                               <p className="huli-details-name">限额提醒</p>
                               <p className="huli-details-infor">{limit}</p>
                            </div>
                        )
                }
            }
            limit = quota();

            if (!this.props.userLogin.isLogin) {
                login_box = <div className="details-not-login cf">
                    <span>更多信息请</span>
                    <a href="https://passport.huli.com/?backurl=https://www.huli.com/hl/#/xjg" target="_blank" className="detail_login">登录</a>
                    <span>或</span>
                    <a href="https://passport.huli.com?backurl=https://www.huli.com/" target="_blank" className="detail_regist">注册</a>
                    <span>后查看</span>
                </div>
            }else{
                login_box =<div>
                    <p className="huli-details-list-names">产品说明</p>
                    <p className="huli-project-information">产品为普惠金融交易中心（大连）有限公司发行的现金类理财计划，产品名称为慧赚宝1号金融产品。（T日为上海证券交易所、深圳证券交易所的正常交易日）</p>

                    <p className="huli-details-list-names">项目免责声明</p>
                    <p className="huli-project-information">狐狸慧赚将严格按照合作机构提供的信息进行展示，平台不承担产品的兑付风险。</p>
                </div>
            }
        }

        
        

        // const data = this.props.hqDetail;
	  return (
		  	<div className="product-details-list">
                <p className="huli-details-list-names">产品介绍</p>
                <div className="huli-version-table">
                    <div className="huli-details-items">
                        <p className="huli-details-name">产品名称</p>
                        <p className="huli-details-infor">小金罐</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">预期年化收益率</p>
                        <p className="huli-details-infor">{ rate }（注: 预期年化收益率会根据金融市场情况不定期变更）</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">预计收益时间</p>
                        <p className="huli-details-infor"> {time}</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">转入规则</p>
                        <p className="huli-details-infor">随时转入，14:30前转入，T+1日转入确认后计算收益</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">转出规则</p>
                        <p className="huli-details-infor">灵活转出，14:30前转出，申请当日有收益，T+1日转出确认后到账</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">收益方式</p>
                        <p className="huli-details-infor">一次结清</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">转入起始金额</p>
                        <p className="huli-details-infor">首次100元起投，1元的整数倍递增，全部转出后再次转入视同首次转入</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">转出起始金额</p>
                        <p className="huli-details-infor">转出最低金额为1元，1元的整数倍递增，如持有金额低于100元需一次性转出</p>
                     </div>
                     <div className="huli-details-items">
                        <p className="huli-details-name">风险评级</p>
                        <p className="huli-details-infor">L2较低风险（评级结果由产品管理方对项目评估，风险评级分为：L1低风险、L2较低风险、L3中等风险、L4较高风险、L5高风险共五级）</p>
                     </div>
                     {limit}
                </div>

                {login_box}
                
            </div>

		);
	}
});

// module.exports = {
// 	ProDetail
// }

const mapStateToProps = (state, ownProps) => {
  return{
    userLogin:state.userLogin,
    hqDetail:state.hqDetail
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
};


export const ProductDetail = connect(
  mapStateToProps
)(ProDetail);