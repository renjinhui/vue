<style lang='less' rel='stylesheet/less'>
    .hello{
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
</style>
<template>
    <div class="hello">
        <Table :titleList="titleList" :dataList="dataList" style="height:300px" @onSelect="selectFn"></Table>
        <Tabs @onChange="tabChange" :tabData="tabAry" activeClass="current" style="height:300px"></Tabs>
        <Tabs @onChange="tabChange">
            <div order='0' @click='tabClick' class='wwww'>111</div>
            <div order='1' class='wwww'>222</div>
            <div order='2' class='wwww'>333</div>
            <div order='3' class='wwww'>444</div>
        </Tabs>
    </div>
</template>

<script>
import Table from '@/components/Table';
import Tabs from '@/components/Tabs';
export default {
    name: 'hello',
    components: {
        Table,
        Tabs
    },
    data () {
        return {
            titleList:[
                {
                    text:'序号',
                    key:'',
                    width:50,
                    class:'dddd',
                    filter: function(data,n){
                        return n+1
                    }
                },
                {
                    text:'姓名',
                    key:'name',
                    class:'dddd',
                    filter: function(data){
                        return "name:"+data.name
                    }
                },
                {
                    text:'年龄',
                    key:'age',
                    class:'dddd',
                    filter: function(data){
                        return data.age
                    }
                },
                {
                    text:'性别',
                    key:'sex',
                    class:'dddd',
                    filter: function(data){
                        let str = '';
                        str = data.sex == 1 ? '男' : '女';
                        return str
                    }
                },
                {
                    text:'爱好',
                    key:'prefer',
                    class:'dddd',
                    filter: function(data){
                        return data.prefer
                    }
                },
                {
                    text:'住址',
                    key:'address',
                    class:'dddd',
                    filter: function(data){
                        return data.address || '默认'
                    }
                },
                {
                    text:'操作',
                    key:'html',
                    class:'dddd',
                    htmlAry:[
                        {
                            html:`<a class='www' href="https://huli.com">增加</a>`
                        },
                        {
                            html:`
                                <a class='www' href="javascript:;">删除</a>
                                `,
                            click:(data)=>{
                                console.log(data)
                            }
                        },
                        {
                            html:`<a class='www' href="javascript:;">修改</a>`,
                            click:(data)=>{
                                console.log(data)
                            }
                        }
                    ]
                },
            ],
            dataList:[
                {
                    name:'小明',
                    age:18,
                    sex:1,
                    prefer:'吃'
                },
                {
                    name:'小红',
                    age:16,
                    sex:2,
                    prefer:'花'
                },
                {
                    name:'李四',
                    age:19,
                    sex:1,
                    prefer:'读书'
                },
                {
                    name:'张三',
                    age:13,
                    sex:1,
                    prefer:'篮球'
                },
                {
                    name:'张三',
                    age:13,
                    sex:1,
                    prefer:'篮球'
                },
                {
                    name:'张三',
                    age:13,
                    sex:1,
                    prefer:'篮球篮球'
                }
            ],
            tabAry: [
                {
                    title:'tab1',
                    class: 'ssss',
                    a:4
                },
                {
                    title:'tab2',
                    class: 'ssss',
                    a:4
                },
                {
                    title:'tab3',
                    class: 'ssss',
                    a:4
                }
            ]
        }
    },
    methods:{
        tabChange(data){
            console.log(data)
        },
        tabClick(){
            console.log(222222)
        },
        selectFn(data){
            console.log(data)
        }
    }
}
</script>
