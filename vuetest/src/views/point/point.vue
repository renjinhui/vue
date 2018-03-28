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
                <router-link to='/main/point/point1' activeClass='current'>积分日历1</router-link>
                <router-link to='/main/point/point2' activeClass='current'>积分日历2</router-link>
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
