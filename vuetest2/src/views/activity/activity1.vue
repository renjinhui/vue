<style lang='less' rel='stylesheet/less'>
    .activity{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="activity">
        抽奖活动1
        {{this.$store.state.userinfo.name}}
        {{this.$store.state.userinfo.age}}
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
        console.log(this)
    },
    methods:{
        
    }
}
</script>
