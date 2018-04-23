const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const DocumentTitle = require('react-document-title');

const QuestionTab = React.createClass({
  render:function(){
    return (
        <div className="normal-question-box">
                <div className="question-answer">
                    <p className="question-text">Q: 理财产品的认购条件是什么？</p>
                    <div className="answer-box cf">
                        <p>A: 用户完成会员注册并实名认证，进行风险评估后，可以认购风险承受能力相匹配的产品。</p>
                    </div>
                </div>
                <div className="question-answer">
                    <p className="question-text">Q: 如何投资理财产品？</p>
                    <div className="answer-box cf">
                        <p>A: 用户风险承受能力符合产品要求时，阅读并同意《产品合同》中全部内容可以进行认购。</p>
                    </div>
                </div>
                <div className="question-answer">
                    <p className="question-text">Q: 认购申请后是否可以撤销投资？</p>
                    <div className="answer-box cf">
                        <p>A: 在确认认购产品后，资金即被冻结，冻结期间不能撤销投资，产品成立后根据相应规则，部分产品允许转让。</p>
                    </div>
                </div>
                <div className="question-answer">
                    <p className="question-text">Q: 理财产品如何计息？如何归还？</p>
                    <div className="answer-box cf">
                        <p>A: 产品收益按实际持有天数计算（募集期间不计收益），到期后3个工作日内自动返回投资账户。</p>
                    </div>
                </div>
                <div className="question-answer">
                    <p className="question-text">Q: 理财产品的安全性如何？</p>
                    <div className="answer-box cf the-last">
                        <p>A: 所有理财产品均经过严格地风控审查，提供多重安全保障（具体保障方式参见《产品合同》）。</p>
                    </div>
                </div>   
                <div className="question-answer">
                    <p className="question-text">Q: 回款时间如何计算？</p>
                    <div className="answer-box cf the-last">
                        <p>
                            A: 回款信息可参考项目详情页信息，如到期日为节假日，需顺延至节假日后首个证券工作日。
                            如：项目到期日为2017年12月17日（星期日），回款信息为：项目到期日后3个工作日内。由于到期日为非工作日，因此回款时间应不晚于项目到期日后第一个工作日后的3个工作日内，即2017年12月21日。（最终以实际回款时间为准）
                        </p>
                    </div>
                </div>                     
        </div> 
    );
  }
});

module.exports = {
  QuestionTab
};