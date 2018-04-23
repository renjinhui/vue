const React = require('react');

export const RryCommand = React.createClass({
    getInitialState(){
        return {
            loading:true,
            lists:[]
        }
    },
    componentWillMount(){
        this.getList()
    },
    getList(){
        const self = this;
        $.post({
            url:'/trust/recommend/list',
            data:{productType:2},
            dataType:'JSON',
            success:function (data) {
                if(data.errorCode==0){
                    self.setState({lists:data.data,loading:false},()=>{
                    });
                }
            }
        })
    },
    render(){
        const {loading,lists} = this.state;
        return (
            <div className="hq-tp htauto">
                <div className="hq-count-title">
                    <h2>为您推荐</h2>
                    <span>定期理财、网贷助您获得更高收益</span>
                </div>
                <div className="hq-recoBox">
                    <ul>
                        {
                            !loading&&lists.map((item,index) => {
                                const url = Util.getBidUrl({id:item.idStr,productType:item.productType=='jjs'?'jjszt':item.productType});
                                return <li key={index}>
                                    <h3 className="title">
                                        {item.title}
                                    </h3>
                                    <div className="recod">
                                       { typeof item.iconStyles!=='undefined'&&item.iconStyles.map((_item,_index)=>{
                                            return   <span key={_index}>{_item.name}</span>
                                        })}
                                    </div>
                                    <div className="recoMd">
                                        <span className="rate">{(item.interestRate/100).toFixed(2)+'%' + (item.raiseInterestRate!==0?' + '+(item.raiseInterestRate/100).toFixed(2) + '%':'')}</span>
                                        <p>{item.interestType}</p>
                                        <div>
                                            <div className="group">
                                                <label>期限</label>
                                                <span>{item.periods}</span>
                                            </div>
                                            <div className="group" style={{'marginRight':0}}>
                                                <label>还款方式</label>
                                                <span>{item.repayMode}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href={url} className='invest-btn'>{item.statusText}</a>
                                </li>
                            })
                        }
                    </ul>
                    {
                        lists.length==3&&<a className="turnGroup-btn" onClick={ this.getList}><i className="icon-refresh"></i>换一组</a>
                    }
                </div>
            </div>
        )
    }
})