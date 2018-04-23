const React = require('react');
const {Link} = require('react-router');

export class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tabIndex: 0
        }
    }
    tabClick(e,value,i){
        this.setState({
            tabIndex: i
        })
        if(this.props.click){
            this.props.click(value)
        }else{
            value.click && value.click(value);
        }
    }
    render(){
        let list = '',dataList = this.props.data;
        let tabIndex = this.state.tabIndex;
        if(!dataList){return (<div>无数据错误</div>)}
        list = dataList.map((value, index) => {
            let str = '';
            if(this.props.type == 'url'){
                str = <Link key={'key'+index} to={value.url} activeClassName='current' className={'syd-tab-item ' + (value.class || '')} onClick={(e)=>{this.tabClick(e,value,index)}}>{value.text}</Link>
            }else{
                str = <span key={'key'+index} className={tabIndex == index ? ('syd-tab-item ' + (value.class || ''))+' current' : ('syd-tab-item ' + (value.class || ''))} onClick={(e)=>{this.tabClick(e,value,index)}}>
                        {value.text}
                        {
                            value.num != undefined ? 
                            <span className='num_box'>{value.num}</span>
                            :null
                        }
                     </span>
            }
            return str
        })
        return (
            <div className={this.props.className + (this.props.type == 'url' ? ' syd-account-tab' : ' syd-account-tab-rows syd-account-tab')} style={this.props.style}>
                {
                    this.props.title?
                    <span className='title name lt'>{this.props.title} :</span>
                    :null
                }  
                {list}
            </div>
        );
    }
}
