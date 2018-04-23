const React =require('react');


const Dialog=React.createClass({

	getInitialState(){
    return{
      visible: false,
    }
  },
  componentWillMount:function(){
    
  },
	close:function(e){
		this.refs.dialog.style.display='none'
	},

	render:function(){
		

		return(
			<div onClick={this.close} ref='dialog'>
				<div className={this.props.bgMask}></div>
				<div className={this.props.dataBox}>
					{this.props.children}
				</div>
			</div>
		)

	}

})
module.exports={
	Dialog
};