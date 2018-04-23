const React = require('react')
const cs = require('classnames')
const bankList = require('./bank').bankList;



export const rechargeBank = React.createClass({
    getInitialState(){
        return {
            selectedBank:{
                cardType:'',
                prompt:'',
                info:[],
                prompt:''
            },
            list:[]
        }
    },
    render(){
        return (
            <div className="reCharge-mask" id="bankList">
                <div className="maskMain bank-mask">
                    <h2 className="title">选择银行</h2>
                    <img className="icon-close" src="https://static.huli.com/images/jjs/Group1.png" onClick={this.cancel}/>
                    <div className="maskInfo">
                        <ul className="bankSelect">
                            {
                                this.state.list.map( (item,index) => {
                                    const _obj = bankList.bank[item.bankCode.toLowerCase()];
                                    return <li key={index} data-key={item.bankCode.toLowerCase()} className={cs({'bank-group':true,'active':index==0})} onClick={()=>{this.bankDetail(item,index)}}>
                                        <img className="bank-logo" src={_obj.src}/>
                                        <label className="bank-text">{_obj.name}</label>
                                        <img src="https://static.huli.com/images/collocation/ico-borrow_03.png" className="check-img" /></li>;
                                })
                            }
                        </ul>
                        <div className="bankInfos mt0">
                            <table>
                                <thead>
                                <tr>
                                    <th width="161px">卡种</th>
                                    <th width="210px">所需条件</th>
                                    <th width="136px">单笔限额(元)</th>
                                    <th width="136px">每日限额(元)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.selectedBank.info.map((item, index) => {
                                        return <tr key={index}>{index == 0 ?
                                            <td rowSpan={this.state.selectedBank.info.length}>{this.state.selectedBank.cardType}</td> : null}
                                            <td>{item.type}</td>
                                            <td>{item.onceLimit}</td>
                                            <td>{item.dayLimit}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            <p className="bankInfos-prompt">
                                <span>以上限额仅供参考，以银行官方公告为准，</span><span>{this.state.selectedBank.prompt}</span></p>
                        </div>
                    </div>
                    <div className="maskFooter">
                        <a className="blue-btn" onClick={this.choiceBank}>确认</a>
                        <a className="gray-btn mr20" onClick={this.cancel}>取消</a>
                    </div>
                </div>
            </div>
        )
    },
    componentWillMount(){
        const self = this;
        $.post({
            url:'/trust/charge/cyberCardList',
            success:function (data) {
                if(data.errorCode==0){
                    self.setState({list:data.data})
                    self.setState({selectedBank:bankList.bank[data.data[0].bankCode.toLowerCase()]})
                }
            },
            error:function () {

            }
        })
    },
    bankDetail(item,n){
        $('.bankInfos').show();
        $('.bank-group.active').removeClass('active');
        $('.bank-group:nth-child('+ (n+1)+')').addClass('active');
        this.setState({selectedBank:bankList.bank[item.bankCode.toLowerCase()]});
    },
    choiceBank(){
        this.props.onChange($('.bank-group.active').attr('data-key'),this.props.state);
        this.cancel();
    },
    cancel(){
        $('.reCharge-mask').hide();
        $('body').css('overflow','auto');
    }
})