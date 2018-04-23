const React =require('react');
const CurDepositTitle = React.createClass({
	getInitialState(){
		return{

		}
	},
	render:function(){
	return(
		<div className="hq-count-title">
	      	<h2>{this.props.title}</h2>
	    </div>
		);
	},
});
module.exports={
	CurDepositTitle
}