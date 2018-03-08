<style lang='less' rel='stylesheet/less'>
    .main{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        .menu_box{
            display: inline-block;
        }
    }
</style>
<template>
    <div class="main">
        <ul class="menu_box">
            <li>
                <router-link to='/activity'>活动</router-link>
            </li>
        </ul>
        <div class="content_box">
            这是内容部分  这是在nrc分支
            分支管理---------正在测试
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            
        }
    },
    methods:{
        
    }
}
</script>
