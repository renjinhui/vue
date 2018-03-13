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
                <router-link to='/main/depot/list' activeClass='current'>仓库列表</router-link>
            </li>
        </ul>
        <div class="content_box">
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
    methods:{
        
    }
}
</script>
