<style lang='less' rel='stylesheet/less'>
    .activity{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="activity">
        转盘活动
        {{this.$store.state.count}}
    </div>
</template>

<script>
export default {
    name: 'activity',
    data () {
        return {
            
        }
    },
    methods:{
        
    }
}
</script>
