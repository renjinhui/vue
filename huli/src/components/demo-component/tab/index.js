const React = require('react');

const { TabGroup,TabNav } = require('common/Tab/index');

class TabList extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    clickFn(data){
        console.log(data,'onchange')
        alert('ok')
    }
    componentWillMount(){
        
    }
    render(){
        return (
            <div style={{height:'500px'}}>
                <TabGroup 
                    onChange={this.clickFn}
                >
                    <TabNav.Page order='1' url='demo/tab'>tab</TabNav.Page>
                    <TabNav.Page order='0' url='demo/modal'>modal</TabNav.Page>
                    <TabNav.Page order='2' url='demo/form'>form</TabNav.Page>
                </TabGroup>
                <TabGroup  
                    className='syd-account-tab-rows' 
                    onChange={this.clickFn}
                    label = '时间类型：'
                >
                    <TabNav.Tab order='0' >tab13</TabNav.Tab>
                    <TabNav.Tab order='1' >tab23</TabNav.Tab>
                    <TabNav.Tab order='2' >tab33</TabNav.Tab>
                </TabGroup>

                <TabGroup  
                    className='syd-account-tab-rows' 
                    onChange={this.clickFn}
                    label = '时间类型：'
                >
                    <TabNav.TabNum order='0' num={1}>tab13</TabNav.TabNum>
                    <TabNav.TabNum order='1' num={2}>tab23</TabNav.TabNum>
                    <TabNav.TabNum order='2' num={3}>tab33</TabNav.TabNum>
                </TabGroup>



                =======================================
                <TabGroup  className='syd-account-tab-rows' onChange={this.clickFn}>
                    <p order='0'>tab13</p>
                    <p order='1'>tab23</p>
                    <p order='2'>tab33</p>
                </TabGroup>
            </div>
            
        )
    }
}

module.exports = {
    TabList
}