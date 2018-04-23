const React = require('react');

const { Tab } = require('common/Tab/index');

class TabList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tabAry: [
                {
                    text:'tab1',
                    class: 'tabDiv',
                    click:(data)=>{
                        this.clickFn(data)
                    }
                },
                {
                    text:'tab2',
                    class: 'tabDiv',
                    // url: '/demo/tab'
                },
                {
                    text:'tab3',
                    class: 'tabDiv',
                    click:(data)=>{
                        this.clickFn(data)
                    }
                },
                {
                    text:'tab4',
                    class: 'tabDiv',
                    url: '/demo/tab',
                    click:(data)=>{
                        this.clickFn(data)
                    }
                },
            ],
            tabAry2: [ //在组件上直接加上click 不会在执行内部定义的click 。 可以在内部直接加上url 就是路由跳转 同时加上click也会执行click
                {
                    text:'全部',
                    class: 'tabDiv'
                },
                {
                    text:'充值',
                    class: 'tabDiv'
                },
                {
                    text:'取现',
                    class: 'tabDiv'
                },
                {
                    text:'投标',
                    class: 'tabDiv'
                },
                {
                    text:'回款',
                    class: 'tabDiv'
                },
                {
                    text:'转让',
                    class: 'tabDiv'
                },
                {
                    text:'定期宝',
                    class: 'tabDiv'
                },
                {
                    text:'还款',
                    class: 'tabDiv'
                },
            ],
            tabAry3: [ //在组件上直接加上click 不会在执行内部定义的click 。 可以在内部直接加上url 就是路由跳转 同时加上click也会执行click
                {
                    text:'全部',
                    num: 13,
                    class: 'tabDiv'
                },
                {
                    text:'充值',
                    num: 10,
                    class: 'tabDiv'
                },
                {
                    text:'取现',
                    num: 3,
                    class: 'tabDiv'
                }
            ],
            returnData:{},
            t:0
        }
    }
    clickFn(data){
        console.log(data)
        this.state.returnData = data;
        this.setState({
            t: Math.random()
        })
    }
    componentWillMount(){
        
    }
    render(){
        let list = <span>{this.state.returnData}</span>
        return (
            <div style={{height:'600px'}}>
                <div className="aside-area-content">
                    <Tab data={this.state.tabAry} className='sydinlist-title cols-four curact-th' />
                    <div>{this.state.returnData.text}</div>
                    <div>{this.state.t}</div>
                </div>
                <Tab title="资金类型" data={this.state.tabAry2} className='syd-account-tab-rows' click={(data)=>{this.clickFn(data)}}/>
                <Tab title="资金类型" data={this.state.tabAry3} className='syd-account-tab-rows' click={(data)=>{this.clickFn(data)}}/>
            </div>
        )
    }
}

module.exports = {
    TabList
}