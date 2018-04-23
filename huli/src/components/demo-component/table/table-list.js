const React = require('react');
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const { Table } = require('common/Table/index');
const { fetchPost,fetchGet } = require('commonjs/util');


class P2PDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loading: true,
            columns: [
                {
                    title: '时间',
                    dataIndex: 'balanceTimeStr',
                    key: 'balanceTimeStr',
                    class: 'grid-wh-200 lt'
                }, {
                    title: '类型',
                    dataIndex: 'businessType',
                    key: 'businessType',
                    class: 'grid-wh-150 lt',
                    html: function(obj){
                        if(obj.tooltip){
                            return (
                                <span>
                                    {obj.businessType}
                                </span>
                                )
                        }
                    }
                }, {
                    title: '收支',
                    dataIndex: 'amount',
                    key: 'amount',
                    class: 'grid-wh-150 lt',
                    filter: function(num){
                        let obj = {};
                        if(num > 0){
                            obj.class = 'green-text';
                            obj.text = '+' + tansformMoney(num);
                        }else if(num < 0){
                            obj.class = 'orange-text';
                            obj.text = tansformMoney(num);
                        }
                        return obj;
                    }
                }, {
                    title: '余额',
                    dataIndex: 'currentTotalBalance',
                    key: 'currentTotalBalance',
                    class: 'grid-wh-150 lt',
                    titleHtml: function(value){
                        return(
                            <span></span>    
                            )
                    },
                    filter: function(num){
                        let obj = {};
                        obj.text = tansformMoney(num);
                        return obj;
                    }
                }, {
                    title: '详细',
                    dataIndex: 'desc',
                    key: 'html',
                    class: 'grid-wh-150 lt',
                    html: function(obj){
                        if(obj.descHref){
                            return (<a href={obj.descHref}>{obj.desc}</a>);
                        }
                        return '';
                    }
                }, {
                        title: '操作',
                        dataIndex: 'doBtn',
                        key: 'html',
                        class: 'grid-wh-40',
                        html: this.doBtn
                    }
            ],
            timeAry :[
            {text:'最近7天',value:7,class:'ddd'},
            {text:'最近30天',value:30,class:'ddd'},{text:'最近90天',value:90,class:'ddd'},{text:'最近一年',value:365,class:'ddd'}],
            t: 0,
        }
    }

    componentWillMount(){
        this.getHistory()
    }
    getHistory(){
        fetchPost({url:'/myaccount/hx/charge_log',data:this.state.params})
        .then((json) => {
            if(json.errorCode == 0){
                this.state.total = json.data.totalRecords;
                this.state.isError = false;
                this.getNeedData(json.data);
            }else{
                this.state.total = 1;
                this.state.isError = true;
                this.getNeedData({});
            }
        })
        .catch((error) => {
            this.state.total = 1;
            this.state.isError = true;
            this.getNeedData({});
        })
    }
    getNeedData(data){
        data = data.list || [];
        this.state.dataSource = data;
        this.state.loading = false;
        this.setState({
            t: Math.random()
        })
    }

    doBtn(obj){
        if(obj.amount > 0 ){
            return (<button onClick={(e)=>{
                console.log(obj)
            }}>{'删除'}</button>);    
        }else{
            return ('');
        }
    }

    changeDate(data){
        console.log(data,this)
    }

    clickFn(data){
        console.log(data);
    }

    render() {
        return (
            <div className="myacoount-right-con paddings">
                <Table dataSource={this.state.dataSource} columns={this.state.columns}  loading = {this.state.loading}>
                    {
                        this.state.isError ? 
                        <Table.Error/>
                        :
                        <Table.NoData/>
                    }
                </Table>
                
            </div>
        )
    } 
}
const mapStateToProps = (state, ownProps) => {
  
  return{
    userLogin:state.userLogin
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  }
};

export const TableList = connect(
  mapStateToProps,mapDispatchToProps
)(P2PDetail);
