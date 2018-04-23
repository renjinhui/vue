export const Util = {
    cookie: {
        get: function(name){
            let cookies = document.cookie.split('; ');
            for (let i = 0, len = cookies.length; i < len; i++) {
                let arr = cookies[i].split('=');
                if (arr[0] == name) return cookies[i].replace(arr[0] + '=', '');
            }
            return '';
        },
        del: function (name,domain) {
            document.cookie = name + "=;path=/;expires=" + (new Date(0)).toGMTString() + ';domain=' + (domain || '.huli.com');
        },
        add: function(name, value, iDay, domain){
            if(!iDay) return;
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + value + ';path=/;expires=' + oDate.toGMTString() + ';domain=' + (domain || '.huli.com');
        },
    },
    turnData:{
        form(obj){
            let str='';
            Object.keys(obj).map((item,index) => {
                str+= (index!=0?'&':'') + item + '=' + obj[item]
            })
            return str
        }
    },
    mainFunc(e){
        const event = e || window.event;
        const func =  Util.cache.func;
        if (event.which == 13) {
            func && func();
        }
    },
    //回车绑定事件回调 state控制状态 作用限制多次点击
    enterClick(state,func){
        if(typeof func !== 'function')return ;
        this.cache.func = func;
        if(window.addEventListener){
            window.addEventListener('keydown',Util.mainFunc)
        }else {
            window.attachEvent('keydown', Util.mainFunc)
        }
    },
    removeClick(func){
        const state = true;
        if(typeof func !== 'function')return ;
        this.cache.func = func;
        if ( document.addEventListener ) {
            window.removeEventListener('keydown', Util.mainFunc)
        }else {
            window.detachEvent('keydown',Util.mainFunc)
        }
    },
    cache:{

    }
}