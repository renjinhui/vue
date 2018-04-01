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
            li{
                width: 100%;
            }
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
            position:absolute;
            top:0;
            bottom:0;
            left:205px;
            right:0;
            overflow: hidden;
        }
        .scroll{
            overflow: scroll;
        }
    }
</style>
<template>
    <div class="main">
        <div class="title_box">
            <div class="lt">icon</div>
            {{this.$store.state.count}}
            <div class="name rt">{{this.$store.state.userinfo.name || 'moren'}}</div>
        </div>
        <div class="body_box">
            <ul class="menu_box lt">
                <li>
                    <router-link to='/main/demo' v-if="isDev" activeClass='current'>DEMO</router-link>
                    <router-link to='/main/point' activeClass='current'>积分管理</router-link>
                    <router-link to='/main/activity' activeClass='current'>活动管理</router-link>
                    <router-link to='/main/depot' activeClass='current'>商城管理</router-link>
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
            isDev: false
        }
    },
    mounted(){
        this.judgeDev()
        this.$store.dispatch('getuserInfo');
    },
    methods:{
        judgeDev(){
            console.log(process.env.NODE_ENV)
            if(process.env.NODE_ENV === "development"){
                this.isDev = true
            }else{
                this.isDev = false
            }
        }
    }
}
</script>
