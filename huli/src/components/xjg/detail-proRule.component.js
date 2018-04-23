const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const ProRuleMain = React.createClass({
	componentDidMount:function(){
	},
	render:function() {
		if(!this.props.userLogin.isLogin){
    		return(
    			<div className="details-not-login2">
	                <span>更多信息请</span>
	                <a href="https://passport.huli.com/?backurl=https://www.huli.com/hl/#/xjg" target="_blank">登录</a>
	                <span>或</span>
	                <a href="href=https://passport.huli.com/regist.html?backurl=https://www.huli.com/" target="_blank">注册</a>
	                <span>后查看</span>
	            </div>
    		)
		}else{
    		return(
			  	<div className="product-rule-boxs">
		            <p className="huli-details-list-names">收益计算</p>
		            <div className="invest-income-calculator cf">
		                <span>投资收益</span>
		                <em>=</em>
		                <p>投资者转入产品金额</p>
		                <em>×</em>
		                <p>预期年化收益率</p>
		                <em>×</em>
		                <p>转入期限</p>
		                <em className="divide">÷</em>
		                <p>365</p>
		            </div>
		            <div className="income-example cf">
		                <p className="left-text lt">示例：</p>
		                <div className="right-income lt">
		                    <p>若投资者A首次转入此产品，转入金额为10,000.00元，预期年化收益率为3.8%，30天后投资者A再次转入此产品，转入金额为5,000.00元，预期年化收益率此时变更为4.0%，90天后投资者A决定全部转出，则投资者A获得的本金和收益计算如下：</p>
		                    <p>10,000.00×3.8%×30÷365+15,000.00×4.0%×90÷365+10,000.00+5,000.00=15,179.18。</p>
		                    <span>注：收益计算到小数点后两位。如计算所得当日收益不足一分，则当日收益为零，不再计提。故从投资角度出发，建议转入100元以上。（以上均指自然日）</span>
		                </div>
		            </div>

		            <p className="huli-details-list-names">转入规则</p>
		            <p className="huli-project-information">投资者于T日14:30之前提出有效转入申请，且产品管理人于T+1日进行确认，转入资金的收益从T+1日开始计算，即收益起算日。有效转入申请日和收益起算日对应关系如下：</p>
		            <div className="huli-hq-table">
		                <table border="0" cellPadding="0" cellSpacing="0">
		                	<tbody>
			                    <tr>
			                        <th width="490" className="text-indent80">申请转入时间</th>
			                        <th width="330">有效转入申请日</th>
			                        <th width="260">转入生效日及收益起算日</th>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周一0:00点后至周一14:30点</td>
			                        <td>周一</td>
			                        <td>周二</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周一14:30点后至周二14:30点</td>
			                        <td>周二</td>
			                        <td>周三</td>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周二14:30点后至周三14:30点</td>
			                        <td>周三</td>
			                        <td>周四</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周三14:30点后至周四14:30点</td>
			                        <td>周四</td>
			                        <td>周五</td>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周四14:30点后至周五14:30点</td>
			                        <td>周五</td>
			                        <td>次周周一</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周五14:30点后至周日24:00点</td>
			                        <td>次周周一</td>
			                        <td>次周周二</td>
			                    </tr>
		                    </tbody>
		                </table>
		            </div>

		            <p className="huli-details-list-names">转出规则</p>
		            <p className="huli-project-information">投资者于D日14:30之前提出有效转出请求的，且产品管理人于D+1日进行确认，确认当日资金转入投资者的账户可用余额中。有效转出申请日和资金到账日对应关系如下：</p>
		            <div className="huli-hq-table">
		                <table border="0" cellPadding="0" cellSpacing="0">
		                    <tbody>
			                    <tr>
			                        <th width="490" className="text-indent80">申请转出时间</th>
			                        <th width="330">有效转出申请日及收益截止日</th>
			                        <th width="260">转出生效日及资金到账日</th>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周一0:00点后至周一14:30点</td>
			                        <td>周一</td>
			                        <td>周二</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周一14:30点后至周二14:30点</td>
			                        <td>周二</td>
			                        <td>周三</td>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周二14:30点后至周三14:30点</td>
			                        <td>周三</td>
			                        <td>周四</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周三14:30点后至周四14:30点</td>
			                        <td>周四</td>
			                        <td>周五</td>
			                    </tr>
			                    <tr>
			                        <td className="text-indent80">周四14:30点后至周五14:30点</td>
			                        <td>周五</td>
			                        <td>次周周一</td>
			                    </tr>
			                    <tr className="color-tr">
			                        <td className="text-indent80">周五14:30点后至周日24:00点</td>
			                        <td>次周周一</td>
			                        <td>次周周二</td>
			                    </tr>
		                    </tbody>
		                </table>
		            </div>
		            <p className="huli-project-information mt-20">投资者单笔转出的最低金额为 1元，可以以1元为单位递增，如持有金额低于100元需一次性转出。投资者可以提取的金额以产品管理人通过狐狸慧赚通知的可提取金额为限。</p>
		            <p className="huli-project-information mt-4">根据产品投资的资产投向，如当日全部投资者总申请转出资金大于前一交易日委托资产净值的20%，则产品管理人可根据产品当时情况决定全额转出、部分顺延转出；产品管理人决定部分顺延转出，未处理的转出申请将在下一个工作日进行处理；如果连续两个工作日发生大额转出，则可以暂停接受转出申请，但暂停期限不得超过20个工作日。</p>

		            <p className="huli-details-list-names">风险提示</p>
		            <p className="huli-project-information">本产品有投资风险，不保证投资本金和收益，投资者应该充分认识投资风险，谨慎投资。</p>
		        </div>
    		)
		}
	}
});

const mapStateToProps = (state, ownProps) => {
  return{
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
};


export const ProRule = connect(
  mapStateToProps
)(ProRuleMain);