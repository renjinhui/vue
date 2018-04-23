const React = require('react');
const Component = React.Component;
const { connect } = require('react-redux');
const _ = require('lodash');

const { BankList } = require('../bankList.js');
const { Popup } = require('../../popup/index.popup.js');
const { PopupResult } = require('../../popup/common');

const { getTKBankList } = require('../../../reducers/collocation/takeNowAction.js');

const { ajaxData } = require('../../../common/util.js');


class ModalMain extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		name:null,

			selectBank: null,
		    bankListShow: false,
		    selectedBank: null,

		    inputBankCard: false,
		    bankCardId: '',
		    bankCardErr: false,

		    promptVisible: false,
			statu: '',
			promptMessage: '',
			agreePropmt:false
	  	};
	}
	componentWillMount() {
		const { bindBank } = this.props;
		if(bindBank){
			this.props.dispatch(getTKBankList('/myaccount/tl/withDrawBankList'));
			this.getBankInfo();
		}
	}
	getBankInfo() {
		ajaxData('/myaccount/tl/bindCardIndex').then(result => {
			const data = result.data;
		    this.props.bankList.map((item) => {
		        item.codeValue == data.bankCode
		          && this.selectBank(item.codeValue, item.codeName)
		    });

		    this.setState({
		        name: data.realName,
		        bankCardId: data.bankCardNo.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ")
		    });
		});
	}
	clickBanks(bank) {
	    this.setState({
	      	bankListShow: bank
	    });
	}
	selectBank(codeValue, codeName) {
        this.setState({
            selectedBank: {
                codeValue,
                codeName
            }
        });
    }
	focusBankCard() {
    	this.setState({inputBankCard: true, bankCardErr: false});
  	}
  	blurBankCard() {
    	this.setState({inputBankCard: false});
    	const bancCardId = this.state.bankCardId.replace(/ /g, '');
    	this.luhnCheck(bancCardId);
  	}
  	changeBankCard() {
    	let bankCardId = this.refs.bankCardId.value;
    	if (bankCardId != "" , bankCardId.length > 4) {
      		let str = bankCardId.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
      		this.setState({bankCardId: str});
    	} else {
      		this.setState({bankCardId});
    	}
  	}
  	// ++++ luhnCheck(bankno) {
	  //   let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
	  //   let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
	  //   let newArr = [];
	  //   for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	  //     	newArr.push(first15Num.substr(i, 1));
	  //   }
	  //   let arrJiShu = []; //奇数位*2的积 <9
	  //   let arrJiShu2 = []; //奇数位*2的积 >9
	  //   let arrOuShu = []; //偶数位数组
	  //   for (let j = 0; j < newArr.length; j++) {
	  //     	if ((j + 1) % 2 == 1) { //奇数位
	  //       	if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
	  //       	else arrJiShu2.push(parseInt(newArr[j]) * 2);
	  //     	} else //偶数位
	  //       arrOuShu.push(newArr[j]);
	  //   }

	  //   let jishu_child1 = []; //奇数位*2 >9 的分割之后的数组个位数
	  //   let jishu_child2 = []; //奇数位*2 >9 的分割之后的数组十位数
	  //   for (let h = 0; h < arrJiShu2.length; h++) {
	  //     	jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	  //     	jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	  //   }

	  //   let sumJiShu = 0; //奇数位*2 < 9 的数组之和
	  //   let sumOuShu = 0; //偶数位数组之和
	  //   let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	  //   let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	  //   let sumTotal = 0;
	  //   for (let m = 0; m < arrJiShu.length; m++) {
	  //     	sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	  //   }

	  //   for (let n = 0; n < arrOuShu.length; n++) {
	  //     	sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	  //   }

	  //   for (let p = 0; p < jishu_child1.length; p++) {
	  //     	sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	  //     	sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	  //   }
	  //   //计算总和
	  //   sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	  //   //计算luhn值
	  //   let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	  //   let luhn = 10 - k;

	  //   if (lastNum == luhn) {
	  //     	this.setState({bankCardErr: false});
	  //   } else {
	  //     	this.setState({bankCardErr: true});
	  //   }
  	// }
  	luhnCheck(bankno) {
        this.setState({ bankCardErr: false });
    }
	handleSubmit() {
		const { name, selectedBank, bankCardId, bankCardErr ,agreePropmt} = this.state;
    	if (selectedBank !== null && !bankCardErr && bankCardId !== ''&& agreePropmt) {
      		const url = '/myaccount/tl/saveWdWithDrawCard';
      		const data = {
	          	bankCode: selectedBank.codeValue,
	          	bankCardNo: bankCardId.replace(/ /g, '')
	        };
	        ajaxData(url, data).then(res => {
	        	if(res.errorCode == 0){
	        		this.props.onOk();
	        	}else{
	        		this.setState({
						promptVisible: true,
						statu: 'error',
						promptMessage: res.errorMessage
					});
	        	}
	        });
	    } else {
	      	this.setState({
				promptVisible: true,
				statu: 'error',
				promptMessage: '请填写完整信息!'
			});
		}
	}
    changeAgree(){
		const { agreePropmt } = this.state;
		this.setState({agreePropmt:!agreePropmt});
	}

	handlePromptClose(){
		this.setState({promptVisible: false});
	}
	render() {
		const { name, bankListShow, inputBankCard, bankCardErr, bankCardId, selectedBank, promptVisible, promptMessage,agreePropmt } = this.state;
		const { title , visible, cancelBtn, okBtn, bankList } = this.props;
		const wInfo = '绑定后，搜易贷账户下的取现操作都将使用该卡';
		return(
			<div style={visible ? {display:'block'} : {display:'none'}}>
				<Popup 
    				title={title} 
    				submitFn={()=>this.handleSubmit()} 
    				closePopup={()=>this.props.onCancel()}
    				hasCancel={cancelBtn !== undefined}
    				hasSubmit={okBtn !== undefined}
    				cancelText={cancelBtn}
    				submitText={okBtn}
    				submitDisabled={!agreePropmt}
    				isShow={visible}
    			>
					{
						<div className="take-now-modal-content-part2 cf">
						<div className="take-now-modal-content-warning">
							<p className="text">{wInfo}</p>
						</div>
						<div className="take-now-modal-form cf">
							<div className="oa-row">
			                    <div className="oa-left">真实姓名</div>
			                    <div className="oa-center-without-border">{name}</div>
			                </div>
			                <div className="oa-row">
			                    <div className="oa-left">选择银行</div>
			                    <div className={bankListShow ? "oa-center oa-border-blue" : "oa-center"}>
			                      	<BankList
				                        data={bankList}
				                        clickBanks={this.clickBanks.bind(this)}
				                        selectBank={this.selectBank.bind(this)}
                        				selectedBank={selectedBank}
			                      	/>
			                    </div>
			                    <div className="oa-right">
			                      	<div className="oa-info"></div>
			                    </div>
			                </div>
			                <div className="oa-row">
			                    <div className="oa-left">银行卡号</div>
			                    <div className={inputBankCard ? "oa-center oa-input-card-blue"
			                      : bankCardErr ? "oa-center oa-input-error" : "oa-center"}>
			                      <div className="oa-card">
			                        { inputBankCard && <div className="oa-card-show">{bankCardId}</div> }
			                        <input
			                           type="text"
			                           className="oa-input"
			                           placeholder="请输入银行卡号,仅支持借记卡"
			                           value={bankCardId}
			                           ref="bankCardId"
			                           onFocus={this.focusBankCard.bind(this)}
			                           onBlur={this.blurBankCard.bind(this)}
			                           onChange={this.changeBankCard.bind(this)}
			                        />
			                      </div>
			                    </div>
			                    <div className="oa-right">
			                      	<div className="oa-info">
				                        { 
				                        	inputBankCard && (<div className="oa-hint">
								                            <div className="oa-triangle"></div>
								                            <div className="oa-triangle-in"></div>
								                            支持19位银行卡号码
								                        </div>)
				                        }
				                        {
				                          	bankCardErr && <div className="oa-info">文案错误提醒，20字以内</div>
				                        }
			                      	</div>
			                    </div>
			                </div>
							<div className="oa-row">
								<em className={agreePropmt?'oa-check-icons checked':'oa-check-icons'} onClick={()=>this.changeAgree()}></em>
								<span className="oa-propmpt">我已确认填写的银行卡信息完整无误且为自有实名账户，自行承担因银行卡信息有误导致的所有风险</span>
							</div>
						</div>
						</div>
					}
				</Popup>
				<Popup 
    				title="绑卡"
    				submitFn={()=>this.handlePromptClose()} 
    				closePopup={()=>{ this.handlePromptClose() }}
    				hasSubmit={false}
    				cancelText='关闭'
    				isShow={promptVisible}
    			>
					<PopupResult title={promptMessage } />
				</Popup>
		    </div>
		)
	}
} 

function mapStateToProps(state) {
	const { takeNowData:TND } = state;
	return{
		bankList: TND.bankList,
	}
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	}
}

export const Modal = connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalMain)
