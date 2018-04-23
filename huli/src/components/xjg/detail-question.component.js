const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const Question = React.createClass({
	componentDidMount:function(){
	},
	render:function() {
	  return (
		  	<div className="product-frequently-ques">
		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 什么是小金罐？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>小金罐是由普惠金融交易中心（大连）有限公司发行的现金类理财计划，产品名称为慧赚宝1号金融产品。</p></div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 小金罐的转入条件是什么？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>用户完成会员注册并实名认证，进行风险评估后，可以购买风险承受能力相匹配的产品。</p>
		  	            </div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 如何转入小金罐？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>用户风险承受能力符合产品要求时，阅读并同意《产品合同》中全部内容可以进行转入。</p></div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 如何转出小金罐？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>用户进入“我的账户”—“小金罐”—“转出”输入想要转出的金额或选择想要转出的具体交易。</p></div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 转入转出提交后是否可以撤销？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p> T日转入的金额，T日14:30之前可以撤销，T日14:30后不可撤销。</p>
     						<p> D日转出的金额，D日14:30之前可以撤销，D日14:30后不可撤销。</p>
		  	            </div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 小金罐的收益计算规则？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p> 详见产品规则中收益计算，以《产品合同》为准。</p></div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 小金罐的转入规则？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>详见产品规则中转入规则，以《产品合同》为准。</p>
		  	            </div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 小金罐的转出规则？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p>详见产品规则中转出规则，以《产品合同》为准。</p></div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list">
		  	        <p className="ques-text">Q: 如何查询小金罐的转入转出情况？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p> 投资者于 T 日提出有效转入申请，且于 T+1 日确认的，投资者可以于T+2 日起通过“我的账户”—“活期资产”—“小金罐”查询转入确认和收益情况。</p>
     						<p>投资者D日提出有效转出申请后，可以于D+1 日16:30之后通过“我的账户”—“活期资产”—“小金罐”查询转出申请办理、资金划付等情况。</p>
		  	            </div>
		  	        </div>
		  	    </div>

		  	    <div className="ques-answer-list the-last-que">
		  	        <p className="ques-text">Q: 转出申请当日是否计算收益？</p>
		  	        <div className="answer-box cf">
		  	            <span>A: </span>
		  	            <div>
		  	                <p> 转出申请当日仍计算收益。</p></div>
		  	        </div>
		  	    </div>
		  	</div>
		);
	}
});

module.exports = {
	Question
}