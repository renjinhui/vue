<style lang='less' rel='stylesheet/less'>
    .activity{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="activity">
        转盘活动
        <Table :titleList="titleList" :dataList="dataList" style="height:300px"></Table>
        {{this.$store.state.count}}
    </div>
</template>

<script>
import axios from 'axios'
import Table from '@/components/Table';
export default {
    name: 'activity',
    components: {
        Table
    },
    data () {
        return {
            titleList:[
                {
                    text:'序号',
                    key:'index',
                    width:50,
                    class:'dddd',
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
            dataList: []
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            axios.get('/tablelist').then((data)=>{
                this.dataList = data.data.data;
                console.log(this.dataList)
            })
        }
    }
}
</script>
