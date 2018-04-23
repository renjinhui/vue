const React = require('react');
const cs = require('classnames');
const {connect} = require('react-redux');
const tools = require('./../../common/tool');


class RryInvestSuc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            payType:false,
            rryState:1,
            rightDateInfo:{
                inTime:'',
                incomeCalculationDay:'',
                incomeArrivalDay:''
            },
            resultState:false,
            count:'',
            isFast:false,
            rightnow:(new Date().getTime())
        }
    }

    componentWillMount(){
        const {userOperaType,payType,count,isFast,result} =  this.props;
        this.setState({payType:payType,rryStaye:userOperaType,count:count,isFast:isFast,resultState:result})
        this.getInvestDate();
    }

    getInvestDate(){
        const self = this;
        const {rightnow}=this.state;
        $.post({
            url:'/hqb/rry/inFlowDate',
            data:{date:rightnow},
            success:function (data) {
                self.setState({rightDateInfo:data.data})
            }
        })
    }

    initDate(date){
        if(date==''||typeof date=='undefined')return '';
        const _date = new Date(date).getDay();
        const _dateArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        return tools.format(date,'MM-dd') + ' ' + _dateArr[_date];
    }


    componentWillReceiveProps(nextProps){
        const {userOperaType,payType,isFast,result} =  nextProps;
        this.setState({payType:payType,rryState:userOperaType,isFast:isFast,result})
    }

    render(){
        const {payType,rryState,rightDateInfo,count,isFast,rightnow,resultState} = this.state;
        const _dateArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        const rryDate = tools.format(rightnow,'MM-dd hh:mm');
        const rryDay = _dateArr[new Date().getDay()];
        return (
            <div className="huli-popup-content">
                {
                    (!resultState)&&<div className="hq-popup-success">
                        <div className="hq-ico-success rry-process"></div>
                        <div className="hq-popup-prompt">
                            <p className="hq-prompt-suc">
                            <span>{rryState==1?'转入':'转出'}处理中，请前往我的账户-<a href="https://www.huli.com/hl/#/myaccount/rry/income"
                                                                        target="_blank">日日盈</a>查看进度</span>
                            </p>
                        </div>
                    </div>
                }
                {
                    (resultState&&payType&&rryState===1)&& <div className="shift-version-success">
                        <div className="icon-box cf">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3 gray"></div>
                        </div>
                        <div className="circle-box cf">
                            <div className="circle"></div>
                            <div className="line"></div>
                            <div className="circle"></div>
                            <div className="line line1 gray"></div>
                            <div className="circle circle1 gray"></div>
                        </div>
                        <div className="text-box cf">
                            <div className="text-item">
                                <p className="title">转入<span>{tools.tansformMoney(parseFloat(count))}</span><span>元提交</span></p>
                                <p className="detail">{rryDate}</p>
                            </div>
                            <div className="text-item text-item1">
                                <p className="title">银行处理中</p>
                                <p className="detail">{rryDate + ' ' + rryDay }</p>
                            </div>
                            <div className="text-item">
                                <p className="title">开始计算收益</p>
                                <p className="detail">{this.initDate(rightDateInfo.incomeCalculationDay)}</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    (resultState&&!payType&&rryState===1)&&<div className="shift-version-success shift-version-success3">
                        <div className="icon-box cf tranferIn">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3 gray"></div>
                        </div>
                        <div className="circle-box cf">
                            <div className="circle"></div>
                            <div className="line gray"></div>
                            <div className="circle gray"></div>
                            <div className='line line1 gray'></div>
                            <div className='circle circle1 gray'></div>
                        </div>
                        <div className="text-box cf">
                            <div className="text-item">
                                <p className="title">转入<span>{tools.tansformMoney(count)}</span><span>元提交</span></p>
                                <p className="detail">{tools.format(rightnow,'yyyy-MM-dd hh:mm')}</p>
                            </div>
                            <div className="text-item text-item1">
                                <p className="title">银行处理中</p>
                                <p className="detail">{rryDate + ' ' + rryDay }</p>
                            </div>
                            <div className="text-item">
                                <p className="title">开始计算收益</p>
                                <p className="detail">{this.initDate(rightDateInfo.incomeCalculationDay)}</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    (resultState&&payType&&rryState===2)&&<div className="shift-version-success shift-version-success2">
                        <div className="icon-box cf">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3 gray"></div>
                        </div>
                        <div className="circle-box cf">
                            <div className="circle"></div>
                            <div className="line"></div>
                            <div className="circle"></div>
                            <div className="line line1 gray"></div>
                            <div className="circle circle1 gray"></div>
                        </div>
                        <div className="text-box cf">
                            <div className="text-item">
                                <p className="title">转出<span>{tools.tansformMoney(count)}</span><span>元提交</span></p>
                                <p className="detail">{tools.format(rightnow,'yyyy-MM-dd hh:mm')}</p>
                            </div>
                            <div className="text-item text-item1">
                                <p className="title">银行处理中</p>
                                <p className="detail">{isFast?tools.format(rightnow,'yyyy-MM-dd hh:mm'):this.initDate(rightDateInfo.inTime)}</p>
                            </div>
                            <div className="text-item">
                                <p className="title">转出成功</p>
                                <p className="detail">{isFast?tools.format(rightnow+2*60*60*1000,'yyyy-MM-dd hh:mm'):this.initDate(rightDateInfo.incomeCalculationDay)}</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    (resultState&&!payType&&rryState===2)&&<div className="shift-version-success shift-version-success3">
                        <div className="icon-box cf">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className='icon3 gray'></div>
                        </div>
                        <div className="circle-box cf">
                            <div className="circle"></div>
                            <div className='line gray'></div>
                            <div className='circle gray'></div>
                            <div className='line line1 gray'></div>
                            <div className='circle circle1 gray'></div>
                        </div>
                        <div className="text-box cf">
                            <div className="text-item">
                                <p className="title">转出<span>{tools.tansformMoney(count)}</span><span>元提交</span></p>
                                <p className="detail">{tools.format(rightnow,'yyyy-MM-dd hh:mm:ss')}</p>
                            </div>
                            <div className="text-item text-item1">
                                <p className="title">银行处理中</p>
                                <p className="detail">{this.initDate(rightDateInfo.inTime)}</p>
                            </div>
                            <div className="text-item">
                                <p className="title">转出成功</p>
                                <p className="detail">{isFast?tools.format(rightnow+3*60*1000,'yyyy-MM-dd hh:mm:ss'):this.initDate(rightDateInfo.incomeCalculationDay)}</p>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}
const mapStateRrySucProps = (state, ownProps) => {
    return {state};
}

const mapDispatchRrySucProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
}

export const rrySucMask = connect(
    mapStateRrySucProps,mapDispatchRrySucProps
)(RryInvestSuc);