const React = require('react');
const Component = React.Component;
const { connect } = require('react-redux');
const _ = require('lodash');

const { TabOne, TabTwo } = require('./tabs.component.js');
const { Modal } = require('./modal.component.js');

const { getAccountInfo } = require('../../../reducers/collocation/takeNowAction.js');
const { ajaxData } = require('../../../common/util.js');

const tabs = [
	{key:1, name:'账户取现', value:'tab1'},
	{key:2, name:'慧赚取现记录', value:'tab2'},
	{key:3, name:'搜易贷取现记录', value:'tab3'}
];

class TakeNowMain extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		activeKey:1
	  	};
	}
	handleActive(key){
		this.setState({activeKey:key});
	}
	render(){
		const { test } = this.props;
		const { activeKey : index, accountInfo } = this.state;
		const components = [
			{component : TabOne},
			{component : TabTwo, props : {accountType : 2}},
			{component : TabTwo, props : {accountType : 1}}
		];
		const ChildComponent = components[index-1].component;
		const info = components[index-1].props || {};
		return(
			<div className="myacoount-right-con lt take-now">
	            <div className="aside-area-content">
	                <div className="aside-right">
	                    <div className="headline borrowing-tab">
	                        {_.map(tabs , tab => {
	                        	return (<span
	                        		key={tab.key}
	                        		className={index == tab.key ? 'headline-current' : ''}
	                        		onClick={()=>this.handleActive(tab.key)}
		                        >
                        			{tab.name}
                        		</span>)
	                        })}
	                    </div>
	                    <ChildComponent {...info} {...this.props} key={index}/>
	                </div>
	            </div>
        	</div>
		)
	}
} 

function mapStateToProps(state) {
	const { takeNowData:TND } = state;
	return{
		
	}
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	}
}

export const TakeNow = connect(
	mapStateToProps,
	mapDispatchToProps
)(TakeNowMain)
