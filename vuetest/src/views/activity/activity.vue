<style lang='less' rel='stylesheet/less'>
    .activity{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="activity">
        <ul class="menu_box lt">
            <li>
                <router-link to='/main/activity/turntable' activeClass='current'>转盘活动</router-link>
                <router-link to='/main/activity/luckdraw' activeClass='current'>抽奖活动</router-link>
            </li>
        </ul>
        <div class="content_box scroll">
            <router-view/>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'activity',
    data () {
        return {
            
        }
    },
    mounted(){
        console.log(this.$store.state)
    },
    methods:{
        
    }
}
</script>
