<style lang='less' rel='stylesheet/less'>
    .activity{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="activity">
        抽奖活动
        <button @click='addCount'>增加数字</button>
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
        addCount(n){
            n = 4;
            this.$store.dispatch('addCount',n);
        }
    }
}
</script>
