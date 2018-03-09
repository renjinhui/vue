<style lang='less' rel='stylesheet/less'>
    .main{
        width: 100%;
        height: 100%;
        position: relative;
        .title_box{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background:#eae1e1;
        }
        .menu_box{
            display: inline-block;
            position: relative;
            width: 200px;
            height: 100%;
            background: #948a9c;
            color: #fff;
            li>a{
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                color: #fff;
                height:30px;
                line-height:30px;
                &.current{
                    background: #e68585;
                }
            }
        }
        .body_box{
            position:absolute;
            top:50px;
            bottom:0;
            left:0;
            right:0;
        }
        .content_box{
            // position: absolute;
            // left:205px;
            // right:0;
            // top:0;
            // bottom:0;
            margin-left:205px;
        }
    }
</style>
<template>
    <div class="main">
        <div class="title_box">
            <div class="lt">icon</div>
            <div class="name rt">任金辉</div>
        </div>
        <div class="body_box">
            <ul class="menu_box lt">
                <li>
                    <router-link to='/activity1' activeClass='current'>活动1</router-link>
                    <router-link to='/activity2' activeClass='current'>活动2</router-link>
                    <router-link to='/activity3' activeClass='current'>活动3</router-link>
                </li>
            </ul>
            <div class="content_box">
                <router-view/>
            </div>    
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
