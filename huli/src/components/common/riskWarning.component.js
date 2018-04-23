const React = require('react');


const riskWarning = React.createClass({
  render:function(){
    let content = '';
    if( this.props.type == 1 ){
        content = <span className='grey'>注：预期年化收益率不等同于实际收益。市场有风险，投资需谨慎。</span>
    }else if(this.props.type == 2){
        content = <span className='grey'>市场有风险，投资需谨慎</span>
    }else{
        content = <span className='orange'>市场有风险，投资需谨慎</span>
    }
    return (
        <div className={this.props.className}>
            {content}
        </div>    
    );
  }
});

module.exports = {
    riskWarning
};