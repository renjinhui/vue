<style lang='less' rel='stylesheet/less'>
    .point1{
        width: 100%;
        height: 100%;
        .calentarWidth{
            width: 560px;
        }
        .showMonth{
            height: 50px;
            text-align: center;
        }
        .calendarBox{
            overflow: hidden;
            ul{
                list-style: none;
            }
            .til,.dayBox{
                width: 100%;
                height: 50px;
                line-height: 50px;
                li{
                    width: 80px;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    &.current{
                        background-color: #ccc;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="point1">
        <div class="showMonth calentarWidth">
            <strong>{{monthStr}}</strong>
        </div>
        <div class="calendarBox lt calentarWidth">
            <ul class="til">
                <li class="lt">星期日</li>
                <li class="lt">星期一</li>
                <li class="lt">星期二</li>
                <li class="lt">星期三</li>
                <li class="lt">星期四</li>
                <li class="lt">星期五</li>
                <li class="lt">星期六</li>
            </ul>
            <ul class="dayBox">
                <li class="lt" v-for="item in month" :class='item.current ? "current" : ""'>
                    {{item.date}}
                </li>
            </ul>  
        </div>
                  
    </div>
</template>

<script>
export default {
    name: 'point1',
    data () {
        return {
            monthStr: '',
            month: []
        }
    },
    mounted(){
        let time = new Date();
        this.getDateArray(time)
    },
    methods:{
        getDateArray(time){
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            let t = new Date(y,m,0).getDate();//当月天数
            let w = this.getWeekDay(time);
            let ary = [];
            for(let i = 0; i< (t+w); i++){
                if(i < w){
                    ary.push({date:''})
                }else{
                    if(i-w+1 == new Date().getDate()){
                        ary.push({date:i-w+1,current: true})
                    }else{
                        ary.push({date:i-w+1})
                    }
                }
            }
            this.month = ary;
            this.monthStr = new Date(time).toLocaleString().split(' ')[0]
        },
        getWeekDay(time){
            let date = new Date(time);
            date.setDate(1);
            return date.getDay();
        }
    }
}
</script>
