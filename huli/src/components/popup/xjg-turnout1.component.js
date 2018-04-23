const React=require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;
const ToolTR = require('../../common/tool').tansformMoney;
const xjgActions = require('../../reducers/myaccount/xjg/myaccountXjgActions');
const actionsPopup = require('../../reducers/popup/popupActions');
const ToolTip = require('../common/tooltip.component').ToolTip;

const InfoTurnOutfir=React.createClass({
  getInitialState() {
    return {
      IllegalMessage:'',
    	moneyList:[],//转出钱数 数组 单位：分
      idList:[],//TransId 数组
      getMoney:[],//得到的收益数组
      timeAry:[],//时间数组
      shoudGet:0,//单位 分
    	totalMoney:0,
      margin50:'tbGroup',
    };
  },

  componentWillMount(){
  	this.props.getXjgTurnoutList()
  	//this.handleClose();console.log(this.data)
  },
  componentDidUpdate(){
  	if(!this.props.xjgTurnoutList.isFetching)return;
  	if(this.props.xjgTurnoutList.data.data.length){
  		//this.state.totalMoney=0;//总共转出本金(分)


  		if(this.props.xjgTurnoutList.data.data.length==this.state.moneyList.length){
  				return;
			}
  		for(var i=0;i<this.props.xjgTurnoutList.data.data.length;i++){
  			this.state.moneyList.push(this.props.xjgTurnoutList.data.data[i].amountAval);
        this.state.idList.push(this.props.xjgTurnoutList.data.data[i].transId);
        this.state.getMoney.push(this.props.xjgTurnoutList.data.data[i].profit);
        this.state.timeAry.push(this.props.xjgTurnoutList.data.data[i].finishDateTime);
  		}
  		//console.log(this.state.moneyList,1111)
  	}
    //console.log(this.state.moneyList,this.state.idList,this.state.getMoney)
  },
  // handleClose(){
  // 	let $dom = document.getElementsByClassName('rc-dialog-mask')[0];
  // 	let _this=this;
  // 	$dom.onclick= function() {
  // 		_this.props.close()
  // 	}
  // },
  inpChange(tar){
    let $eleAry=$('.chbType');
    let n=0;
    $eleAry.removeClass('on');
    // for(var i=0;i<eleAry.length;i++){
    //   eleAry[i].className=eleAry[i].className.replace(/on/g,'');
    // }
    for(var i=1;i<$eleAry.length;i++){
      if(this.state.totalMoney==0){
        break;
      }
      n=n+this.state.moneyList[i-1];
      $($eleAry[i]).addClass('on');
      if(n>=this.state.totalMoney){
        break;
      }

    }
  },
  thisNext(e){
    let ary=this.state.getMoney;

    let  $eleAry=$('.chbType');
    let turnOutM=0,turnOutAry=[];
    let turnOutG=0;
    let lastM=0;
    let lastG=0;
   // console.log(this.state.moneyList,this.state.getMoney)
    if(!$eleAry.length)return;
    for(var i=1;i<$eleAry.length;i++){
      if($($eleAry[i]).hasClass('on')){
        turnOutM=turnOutM+this.state.moneyList[i-1];
        turnOutG=turnOutG+this.state.getMoney[i-1];
        lastM=this.state.moneyList[i-1];
        lastG=this.state.getMoney[i-1];
        var obj={};
        obj['transId']=this.state.idList[i-1];
        obj['amountAval']=this.state.moneyList[i-1];
        obj['finishDateTime']=this.state.timeAry[i-1];
        turnOutAry.push(obj)
      }
    }
    //console.log(this.state.totalMoney,lastM,turnOutM)
    let lastTureM=this.state.totalMoney+lastM-turnOutM;
    if(!turnOutAry.length)return;
    turnOutAry[turnOutAry.length-1]['amountAval']=lastTureM;
    // console.log(turnOutAry)
    if(turnOutM==this.state.totalMoney){

    }else{
      let n=(lastTureM)/lastM;
      turnOutG=parseInt((turnOutG-lastG)+n*lastG);
      turnOutM=this.state.totalMoney;

    }

    //this.init();
    this.props.dispatch(xjgActions.myaccountXjgSureOutData({
      subType:"XJG",
      applyMap:turnOutAry,
      turnOutM:turnOutM,
      turnOutG:turnOutG,
      password:''
    }))
    // console.log(this.state.totalMoney)
  },
  // init(){
  //   let eleAry=document.getElementsByClassName('chbType');
  //   for(var i=0;i<eleAry.length;i++){
  //     eleAry[i].className=eleAry[i].className.replace(/on/g,'');
  //   }
  //   this.state.totalMoney=0;
  //   this.refs.turnOutM.value='';
  //   //this.canNext();
  // },
  keyUp(e){
  	let tar=e.target||e.srcElement;
  	tar.value=tar.value.replace(/[\D]/g,'') ;
  	let val=parseFloat(tar.value )?parseFloat(tar.value ):0;
    let tol_val=parseFloat(this.props.xjgBasicData.data.interestAmt)
  	let kc=parseFloat(e.keyCode||e.which||e.charCode);
  	if(val>(tol_val/100)-100){

  		tar.value=tol_val/100;
  	}
    this.state.totalMoney=parseFloat(tar.value)?parseFloat(tar.value)*100:0;

  	// if(kc==13&&tar.value){
  	// 	this.thisNext(e);
  	// }
    if(kc!=13){
      this.inpChange(tar)
    }
    // if(kc==8||kc==46){
    //   this.state.totalMoney=parseFloat(tar.value)?parseFloat(tar.value)*100:0;
    //   console.log(this.state.totalMoney)
    // }
    this.canNext();
    this.thisNext();

  },
  inpFocus(e){
  	let tar=e.target||e.srcElement;
  	tar.value=this.state.totalMoney/100==0?'':this.state.totalMoney/100;
  	// for(var i=0;i<eleAry.length;i++){
  	// 	if(/allType/.test(eleAry[i].className)){
  	// 		eleAry[i].className='chbType allType'
  	// 	}else{
  	// 		eleAry[i].className='chbType'
  	// 	}
  	// }
  },
  inpBlur(e){
    let tar=e.target||e.srcElement;
    tar.value=ToolTR(this.state.totalMoney);
  },
  canNext(){
  	if(this.state.totalMoney>0){
  		this.props.dispatch(actionsPopup.popupSetSubmitDisabled(false))
  	}else{
  		this.props.dispatch(actionsPopup.popupSetSubmitDisabled(true))
  	}
  },
  choose(e){
  	let tar=e.target||e.srcElement;
  	let $eleAry=$('.chbType');

  	if($(tar).hasClass('chbType')){
  		if($(tar).hasClass('allType')){
  			if($(tar).hasClass('on')){
  				this.state.totalMoney=0;
  				$eleAry.removeClass('on');
  				this.refs.turnOutM.value=''
  			}else{
  				this.state.totalMoney=this.props.xjgBasicData.data.interestAmt;
  				$eleAry.addClass('on');
  				this.refs.turnOutM.value=ToolTR(this.props.xjgBasicData.data.interestAmt)
  			}
  		}else{
        $('.allType').removeClass('on');
        this.state.totalMoney=0;
  			if($(tar).hasClass('on')){
          for(var i=1;i<$eleAry.length;i++){
            if($($eleAry[i]).hasClass('on')){
              this.state.totalMoney=this.state.totalMoney+this.state.moneyList[i-1];
            }
          }

  				$(tar).removeClass('on');

  				for(var i=0;i<$eleAry.length;i++){
  					if(tar==$eleAry[i]){

              let n=parseFloat(this.state.totalMoney)-parseFloat(this.state.moneyList[i-1]);

  						this.refs.turnOutM.value=(n==0?'':ToolTR(n));
  						this.state.totalMoney=n;

  					}

  				}
  			}else{
          for(var i=1;i<$eleAry.length;i++){
            if($($eleAry[i]).hasClass('on')){
              this.state.totalMoney=this.state.totalMoney+this.state.moneyList[i-1];
            }
          }

  				$(tar).addClass('on');

  				for(var i=0;i<$eleAry.length;i++){
  					if(tar==$eleAry[i]){
              let n=parseFloat(this.state.totalMoney)+parseFloat(this.state.moneyList[i-1]);
  						this.refs.turnOutM.value=ToolTR(n);
  						this.state.totalMoney=n;
  						// console.log(this.state.totalMoney)
  					}

  				}
  			};
  		}
      let allM=this.props.xjgBasicData.data.interestAmt,nowM=this.state.totalMoney;
      //console.log(allM,nowM)
      if((allM-nowM)>0&&(allM-nowM)<10000){
        this.state.IllegalMessage='转出后小金罐本金不能低于100元，请全部转出';
        this.props.dispatch(actionsPopup.popupSetSubmitDisabled(true))
      }else{
        this.state.IllegalMessage='';
        this.props.dispatch(actionsPopup.popupSetSubmitDisabled(false));
        this.canNext();
        this.thisNext();
      }

  	};

  },
	render:function () {
    const data = this.props.xjgBasicData.data;
    let interestAmt='';
    if(this.props.xjgBasicData.isFetching == 1){
      interestAmt=ToolTR(data.interestAmt)
    }
		let trs='';
		let ary=[];
		if( this.props.xjgTurnoutList.isFetching==1 && this.props.xjgTurnoutList.data.errorCode==0){
      let _this=this;
			trs=this.props.xjgTurnoutList.data.data.map(function(item,index){
        if(index>=3){
          _this.state.margin50='tbGroup margin-50';
        }
				return(
					<tr key={index}>
              <td width="70px"><i className="chbType "></i></td>
              <td width="170px">{item.applyDateTime}</td>
              <td width="120px" className="frt td_money">{ToolTR(item.amountAval)}</td>
          </tr>
          )
			});

		}else if(this.props.xjgTurnoutList.isFetching==0){
      trs=<tr>
        <td>
          <div className="loading-box myaccount-loading" style={{width:'100%'}}>
                <div></div>
                <p>加载中…</p>
              </div>
        </td>
      </tr>
    }else{
      trs=<tr>
        <td>
          <div className="without-investment-box myaccount-without" style={{width:'100%'}}>
                  <img src="https://static.huli.com/images/nodata.png" alt="" />
                  <p>系统繁忙！加载失败！</p>
                </div>
        </td>
      </tr>
    };

    return(
      <div className="huli-popup-content">
          <div className="hq-popup-tp">
              <div className="hq-frm-group">
                  <label>可转出本金</label>
                  <span>{interestAmt}</span>
              </div>
              <div className="hq-frm-group transfer-input">
                  <label>转出本金</label>
                  <input type="text" className="hq-price" ref='turnOutM' placeholder="输入金额" onFocus={this.inpFocus} onKeyUp={this.keyUp} onBlur={this.inpBlur}/>
                  <ToolTip data-text="local_tooltip.xjg_out_limit"/>
              </div>
              <div className='illegalMess'>{this.state.IllegalMessage}</div>
          </div>
          <div className={this.state.margin50} onClick={this.choose}>
            <div>
              <table>
                  <thead>
                  <tr>
                      <th width="70px">
                          <i className="chbType allType"></i>全选
                      </th>
                      <th width="170px">转入时间</th>
                      <th width="120px" className="frt">可转出金额(元)</th>
                  </tr>
                  </thead>
              </table>
            </div>
            <div className='transfer-list-item'>
              <table>
                <tbody>

                	{trs}
                </tbody>

              </table>
            </div>
          </div>
      </div>
  	)
	}



})

const mapStateToProps = (state, ownProps) => {
  return {
    state,
  	xjgBasicData:state.xjgData.basicData,
  	xjgTurnoutList:state.xjgData.listData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getXjgTurnoutList:()=>{
      dispatch(xjgActions.myaccountXjgTurnoutPosts())
    }
  }
};

export const XjgTurnOut1 = connect(
  mapStateToProps, mapDispatchToProps
)(InfoTurnOutfir);
