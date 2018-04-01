<template>
    <transition name='moveInOut'>
        <div class='popup'>
            <div class="content" :style='{width:useWidth}'>
                <div class="popup_title">
                    <h2 class="title lt" v-if="popData.title.isClose!=false">{{popData.title.text || '默认title，请添加title'}}</h2>
                    <span class="closeBtn rt pointer" @click="titleClose">X</span>
                </div>
                <div class="popup_body">
                    <slot></slot>
                </div>
                <div class="popup_footer">
                    <div class="btn btn-default rt" @click="close">
                        {{popData.footer.cancleText || '取消'}}
                    </div>
                    <div class="btn btn-primary rt" @click="ensure" v-if="popData.footer.hasSure !=false">
                        {{popData.footer.sureText || '确定'}}
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<style lang='less' rel="stylesheet/less" scoped>
    .popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        .content{
            position: relative;
            border-radius: 10px;
            box-shadow: 4px 6px 14px 5px;
            top:200px;
            margin: auto;
            background: #fff;
            padding: 10px 15px;
            .popup_title{
                overflow: hidden;
                border-bottom: 1px solid #ccc;
                padding: 5px;
                .title,.closeBtn{
                    color: #333;
                    display: inline-block;
                    font-size: 16px;
                }
            }
            .popup_body{
                min-height: 50px;
            }
            .popup_footer{
                overflow: hidden;
                padding: 10px 20px 0 0;
                border-top: 1px solid #ccc;

                .btn{
                    cursor: pointer;
                    margin-right: 10px;
                    font-size: 16px;
                    padding:3px 10px;
                }
            }
        }
    }
</style>
<script>
    export default {
        name: 'tabBoxModel',
        props:{
            width: {
                type: String,
                default:'400px'
            },
            popData: {
                type: Object,
                default: function(){
                    return {
                        title: {
                            text: 'title',
                            class: 'ffff',
                            isClose: true,
                            close: ()=>{console.log(43434)},
                        },
                        footer: {
                            sureText: '确定1',
                            cancleText: '取消1',
                            hasSure: true,
                            ensure: ()=>{console.log(2345432)},
                            close: ()=>{console.log('close')}
                        }
                    }
                }
            }
        },
        data: function(){
            return {
                
            }
        },
        mounted:function(){
            
        },
        computed:{
            useWidth(){
                return /px|rem|em/.test(this.width) ? this.width : this.width+'px';
            }
        },
        methods:{
            ensure(){
                this.popData.footer.ensure ? this.popData.footer.ensure() : alert('请添加确认事件')
            },
            close(){
                this.popData.footer.close ? this.popData.footer.close() : alert('请添加取消事件')
            },
            titleClose(){
                this.popData.title.close ? this.popData.title.close() : alert('请添加取消事件')
            }
        }
    }
</script>