<style lang='less' rel='stylesheet/less'>
    .main{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6)
    }
</style>
<template>
    <div class="main">
        <ul class="menu_box">
            <li>
                <router-link to='/activity'>活动</router-link>
            </li>
        </ul>
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
