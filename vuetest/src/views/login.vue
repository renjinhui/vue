<style lang='less' rel='stylesheet/less'>
    .login{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        text-align: center;
        .input_box{
            padding-top: 20px;
        }
    }
</style>
<template>
    <div class="login">
        <div class='input_box'>
            <span>用户名：</span><input type="text" v-model='name'>
        </div>
        <div class='input_box'>
            <span>密码：</span><input type="password" v-model='password'>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            
        }
    },
    methods:{
        
    }
}
</script>
