const React = require('react');
const cs = require('classnames');
const StepView =  require('./processStep').stepView;
const Util = require('./pwdCookie').Util;
const _ = require('lodash');
const Part_1 = require('./part_1').partOne;
const Part_2 = require('./part_2').partTwo;
const Part_3 = require('./part_3').partTrd;
const Part_4 = require('./part_4').partFor;
const Part_5 = require('./part_5').partFiv;
const Part_6 = require('./part_6').partSix;
const Part_7 = require('./part_7').partSev;
const Part_8 = require('./part_8').partEit;
const Part_9 = require('./part_9').partNin;


export const REPWD = React.createClass({
    getInitialState(){
        return  {
            init: true,
            stateParams:{
                partState:1,
                t:0,
                questionId:0
            },
            bandParams :{
                picVali : true,
                shortMsg :true,
                email: false,
                security :false,
                realName :false
            },
            mobile:'',
            mailErrorInfo:'',
            maskState:false,
            email:''
        }
    },
    componentWillMount(){
        document.title  =  "申请找回密码";
    },
    componentDidMount() {
        const self = this;
        if(location.href.indexOf('code')!=-1){
            const data = location.href.split('?')[1];
            let arr = data.split('&');
            let obj ={};
            for(let i=0;i<arr.length;i++){
                obj[arr[i].split('=')[0]]=arr[i].split('=')[1];
            }
            const url = '/findPassword/callback';
            $.post({
                url:url,
                data:obj,
                dataType: 'json',
                success:result => {
                    const json=result;
                    if(json.errorCode == 0){
                        const t = Util.cookie.get('huli_jsid')
                        self.setState({stateParams:_.assign({},self.state.stateParams,{t:t})},
                            setTimeout(() => {
                                location.href = 'https://www.huli.com/hl/#/findpassword';
                                location.reload();
                            },400)
                        );
                    }else{
                        self.setState({stateParams:_.assign({},self.state.stateParams,{partState:1})});
                        self.setState({maskState:true});
                        self.setState({mailErrorInfo:json.errorMessage});
                        self.reset();
                    }
                },
                error:function (error) {
                    return ;
                }

            })
        }else {
            let self = this;
            self.initT();
        }
    },
    render:function() {
        const params = this.state.stateParams;
        const uaIe8 = navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i);
        return (
            <div className={cs({'huli-forget-container':true,'ie8':uaIe8})}>
                <div className="huli-forget">
                    <div className="forget-header">
                        <h2 className="title">找回登录密码</h2>
                        {
                            params.partState==1?'':<a className="reBack" onClick={this.reset}>回到第一步</a>
                        }
                    </div>
                    <div className="forget-main">
                        <div className="forget">
                            <StepView  toggleStep={this.state.stateParams} toggleBand={this.state.bandParams}/>
                            {
                                params.partState==1?<Part_1 t={params.t} onChange={(state,username) => this.partStateChange(state,username)}/>:
                                    params.partState==2?<Part_2 t={params.t} onChange={state => this.partStateChange(state)} />:
                                        params.partState==3?<Part_3 t={params.t}  mobile={this.state.mobile} onChange={state => this.partStateChange(state)}/>:
                                            params.partState==4?<Part_4 t={params.t} Secur={this.state.bandParams.security} onChange={(state,email) => this.partStateChange(state,email)} />:
                                                params.partState==5?<Part_5 t={params.t} Mail={this.state.bandParams.email} onChange={state => this.partStateChange(state)} questionId={params.questionId}/>:
                                                    params.partState==6?<Part_6 t={params.t} email={this.state.email}  onChange={state => this.partStateChange(state)}/>:
                                                        params.partState==7?<Part_7 t={params.t} onChange={state => this.partStateChange(state)}/>:
                                                            params.partState==8?<Part_8 t={params.t} onChange={state => this.partStateChange(state)}/>:
                                                                params.partState==9?<Part_9 t={params.t}/>:''
                            }
                        </div>
                    </div>
                </div>
                <div className={cs({'confirm-mask':true,'showState':this.state.maskState})}>
                    <div className="confirm" >
                        <h2 className="title">找回密码异常</h2>
                        <div className="body">
                            <div className="errorInfo">{this.state.mailErrorInfo}</div>
                            <div className='closeTooltips' onClick={this.closeTooptips}>知道了</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    initT(){
        const _t = Util.cookie.get('huli_jsid');
        this.setState({stateParams:_.assign({},this.state.stateParams,{t:_t!=''?_t:0})},
            this.getForgetPwdPart
        )
    },
    getForgetPwdPart(_partState){
        const self = this;
        const url = '/findPassword/process';
        $.post({
            url:url,
            data:{
                t:this.state.stateParams.t
            },
            dataType: 'json',
            success:result =>{
                const json = result;
                self.setState({stateParams:_.assign({},self.state.stateParams,{t:json.data.t,partState:Boolean(_partState)?_partState:1,questionId:json.data.process.questionId})}, ()=>{
                    this.getProcess(json)
                });
            }
        })
    },
    partStateChange(param,username){
        if(username){
            this.setState({mobile:username,email:username});
        }
        const _stepState = this.state.bandParams;
        let funState = false;
        let _partState = 0;
        switch(param){
            case 0:this.reset();
                break;
            case 1:_partState = 1;
                break;
            case 2: funState=true;
                _partState = 2;
                break;
            case 3:funState=true;
                _partState = 3;
                break;
            case 4:
                if(_stepState.email){
                    _partState = 4;
                }else if(_stepState.security){
                    _partState = 5;
                }else if(_stepState.realName){
                    _partState = 7;
                }else {
                    _partState = 8;
                }
                break;
            case 5:
                if(_stepState.security){
                    _partState = 5;
                }else if(_stepState.realName){
                    _partState = 7;
                }else {
                    _partState = 8;
                }
                break;
            case 6:_partState = 6;
                break;
            case 7:
                if(_stepState.realName){
                    _partState = 7;
                }else {
                    _partState = 8;
                }
                break;
            case 8:_partState = 8;
                break;
            case 9:_partState= 9;
                break;
            default:_partState = 1;
                break;
        }
        if(funState){
            this.getForgetPwdPart(_partState);
        }else {
            this.setState({stateParams:_.assign({},this.state.stateParams,{partState:_partState})});
        }

    },
    getProcess(json){
        const obj = {};
        switch(json.data.process.status){
            case 0:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = false;
                obj.security = false;
                obj.realName = false;
                break;
            case 4:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = true;
                obj.security = false;
                obj.realName = false;
                break;
            case 8:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = false;
                obj.security = true;
                obj.realName = false;
                break;
            case 12:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = true;
                obj.security = true;
                obj.realName = false;
                break;
            case 16:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = false;
                obj.security = false;
                obj.realName = true;
                break;
            case 20:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = true;
                obj.security = false;
                obj.realName = true;
                break;
            case 24:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = false;
                obj.security = true;
                obj.realName = true;
                break;
            case 28:obj.picVali = true;
                obj.shortMsg = true;
                obj.email = true;
                obj.security = true;
                obj.realName = true;
                break;
            default:break;
        }
        this.setState({bandParams:_.assign({},this.state.bandParams,obj)},function () {
                this.state.init&&this.initState(json.data.process.trace);
                this.setState({init:false});
            }
        );

    },
    initState(trace){
        let _state=0;
        const obj = this.state.bandParams;
        switch(trace){
            case 0:_state = 1;
                break;
            case 1:_state = 3;
                break;
            case 3:_state = obj.email?4:obj.security?5: obj.realName?7:8;
                break;
            case 7:
                if(this.state.email==''){
                    this.setState({'email':Util.cookie.get('syd_email')})
                }
                _state = 6;
                break;
            case 39:_state = obj.realName?7:8;
                break;
            case 55:_state = 8;
                break;
            case 19:_state = 8;
                break;
            case 11:_state = 7;
                break;
            case 23:_state= 8;
                break;
            case 27:_state= 8;
                break;
            default:this.reset();
                break;
        }
        this.setState({stateParams:_.assign({},this.state.stateParams,{partState:_state})});
    },
    reset(){
        this.setState({stateParams:{partState:1,t:0}},function () {
            Util.cookie.del('huli_jsid');
            this.getForgetPwdPart();
        });
    },
    closeTooptips(){
        this.setState({maskState:false});
    }
})