const Util = require('./util').isIE8;
module.exports = {

    getRiskInfo: (options) => {
        let res = {};
        // 判断是否做过风险评估 0:未评估 1:已评估未过期 2:已评估已过期
        let userRiskStatus = options.riskStatus * 1;
        switch (userRiskStatus) {
            case 0:
                res.type = 'risk-first';
                break;
            case 2:
                res.type = 'risk-again';
                break;
            case 1:
                if(options.bidInfo && options.bidInfo.isCompare){
                    res.type = 'risk-lower';
                    if(options.bidInfo.riskValue && options.riskValue.length >= options.bidInfo.riskValue.length){
                        res.type = 'risk-succ'
                    }
                }else{
                    res.type = 'risk-succ'
                }
                break;
        }
        return res;
    },
    // 辅助方法，金额格式化
    tansformMoney: function(money, length, isYuan) {
        if (length !== 0) {
            length = length | 2;
        }
        if (typeof parseInt(money) === 'number' && !isYuan) {
            money = (money / 100).toFixed(length);
        }else{
            money = (money * 1).toFixed(length);
        }
        money = ('' + money).replace(/(\d)(?=(?:\d{3})+(?:\.\d+)?$)/g, "$1,");
        return money;
    },
    transformTime:function(time,type){
        if(!time)return "";
        type = type ? type : '-';
        var y = new Date(time).getFullYear();
        var m = (new Date(time).getMonth()+1)<10?'0'+(new Date(time).getMonth()+1):(new Date(time).getMonth()+1);
        var d = new Date(time).getDate()<10?'0'+new Date(time).getDate():new Date(time).getDate();
        return ''+y+type+m+type+d;
    },
    setProgress:function(oCircle,pre){
        if(!oCircle.getContext) return;

        //项目完成进度
        var oGC = oCircle.getContext("2d");
        var objColor = { "zero" : "#e7e6e6", "small" : "#ffd200", "midium" : "#ff510d", "big" : "#81c931" };
        var arrCircle = [];
        var x = 28, y = 28, lineWidth = 3, radius = 26;
        // oGC.clearRect(0, 0, $(oCircle).width(), $(oCircle).height());
        oGC.clearRect(0, 0, oCircle.offsetWidth, oCircle.offsetHeight);
        var bili = pre * 1;
        var type = bili == 0 ? "zero" : (bili > 0 && bili < 50 ? "small" : bili >= 50 && bili < 100 ? "midium" : "big");
        // arrCircle.push( { "color" : objColor[type], "circle" : 100 -bili } );

        arrCircle.push( { "circle" : bili } );
        arrCircle.push( { "color" : "#ececec", "circle" :  100 - bili } );

        var isIE8 = Util;	//如果不支持，则为IE8及以下浏览器

        var lastAngle = 0;
        if(pre == 100 || pre == 0){
            oGC.beginPath();
            oGC.arc(x, y, radius, 0,  Math.PI*2);
            oGC.lineWidth = lineWidth;
            oGC.strokeStyle = '#ececec';
            oGC.stroke();
            oGC.closePath();
        }else{
            for (var i = 0; i < arrCircle.length; i++) {
                if(lastAngle == 270) break;

                var angle = arrCircle[i].circle / 100 * 360;
                var start = i == 0 ? -90 : lastAngle;
                var end = lastAngle = start + angle;
                if(end == 270 && isIE8) end = -90;	//该处为了兼容ie8下： -90 到 270 整圆画不出来的bug
                oGC.beginPath();
                oGC.arc(x, y, radius, start / 180 * Math.PI, end / 180 * Math.PI);

                var grad1 = oGC.createLinearGradient(22,0,22,70);
                grad1.addColorStop(0, "#fb5c17");
                grad1.addColorStop(1, "#fba117");
                oGC.strokeStyle = grad1;

//      grad1.addColorStop(1, "#fb5c17");

//      oGC.strokeStyle = arrCircle[i].color;
                if(i == 0){
                    if(pre == 100){
                        oGC.strokeStyle = '#ececec';
                    }else{
                        if(isIE8){
                            oGC.strokeStyle = '#FF781A';
                        }else{
                            oGC.strokeStyle = grad1;
                        }
                    }

                    // oGC.lineCap = 'round';
                }else{
                    oGC.strokeStyle = arrCircle[i].color;
                }

                oGC.lineWidth = lineWidth;

                oGC.stroke();
                oGC.closePath();
            }
        }
    },
    transformCutDownTime:function(time){
        if(!time){return 0}
        let now = new Date();
        let nowTime = now.getTime();
        let ToTime = new Date(time).getTime();
        let timeObj = {};
        let res = '';

        let difftime = ToTime - nowTime;

        if(difftime < 0){
            return false;
        }else{

            timeObj.hours    = difftime/ 1000 / 60 / 60 ;
            timeObj.hoursRound   = Math.floor(timeObj.hours);
            timeObj.minutes   = difftime / 1000 /60 - (60 * timeObj.hoursRound);
            timeObj.minutesRound  = Math.floor(timeObj.minutes);
            timeObj.seconds   = difftime/ 1000 - (60 * 60 * timeObj.hoursRound) - (60 * timeObj.minutesRound);
            timeObj.secondsRound = Math.floor(timeObj.seconds);

      res = (timeObj.hoursRound  >= 10 ? timeObj.hoursRound : '0'+ timeObj.hoursRound)+ ':' + (timeObj.minutesRound >= 10 ? timeObj.minutesRound : '0'+timeObj.minutesRound)+ ':' + (timeObj.secondsRound >= 10 ? timeObj.secondsRound : '0'+timeObj.secondsRound);
      return res;
    }
  },

    fmtPercent : function(num,length,isGet){
        if(num === undefined){return ''}
        if (length !== 0) {
            length = length || 2;
        }

        if (typeof parseInt(num) === 'number' && !isGet) {
            num = (num / 100).toFixed(length);
        }else{
            num = (num * 1).toFixed(length);
        }

    return num;
  },
  MillisecondToDate:function(msd,isNoHours) {
    var timeObj = {};
    // var days    = msd / 1000 / 60 / 60 / 24;
    // var daysRound   = Math.floor(days);
    var hours,hoursRound,minutes,minutesRound,seconds,secondsRound;

    if(!isNoHours){
       hours    = msd/ 1000 / 60 / 60 ;
       hoursRound   = Math.floor(hours);
       minutes   = msd / 1000 /60 - (60 * hoursRound);
       minutesRound  = Math.floor(minutes);
       seconds   = msd/ 1000 - (60 * 60 * hoursRound) - (60 * minutesRound);
       secondsRound  = Math.floor(seconds);
    }else{
       minutes   = msd / 1000 /60;
       minutesRound  = Math.floor(minutes);
       seconds   = msd/ 1000 - (60 * minutesRound);
       secondsRound  = Math.floor(seconds);
    }
    // timeObj.day = daysRound;
    timeObj.hours = hoursRound ? hoursRound : 0;
    timeObj.minutes = minutesRound;
    timeObj.seconds = secondsRound;


        return timeObj
    },
    isIE8:function () {
        let browser=navigator.appName;
        let b_version=navigator.appVersion;
        if(b_version.indexOf(';')==-1)return false;
        let version=b_version.split(";");
        let trim_Version=version[1].replace(/[ ]/g,"");
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") {
            return true;
        }
        return false;
    },
    bankCardInit(num){
        return num.substr(0, 4) +' **** **** ' + num.substr(-4);
    },
    convertCurrency(currencyDigits) {
        // Constants:
        var MAXIMUM_NUMBER = 99999999999.99;
        // Predefine the radix characters and currency symbols for output:
        var CN_ZERO = "零";
        var CN_ONE = "壹";
        var CN_TWO = "贰";
        var CN_THREE = "叁";
        var CN_FOUR = "肆";
        var CN_FIVE = "伍";
        var CN_SIX = "陆";
        var CN_SEVEN = "柒";
        var CN_EIGHT = "捌";
        var CN_NINE = "玖";
        var CN_TEN = "拾";
        var CN_HUNDRED = "佰";
        var CN_THOUSAND = "仟";
        var CN_TEN_THOUSAND = "万";
        var CN_HUNDRED_MILLION = "亿";
        var CN_SYMBOL = "人民币";
        var CN_DOLLAR = "元";
        var CN_TEN_CENT = "角";
        var CN_CENT = "分";
        var CN_INTEGER = "整";

        // Variables:
        var integral;    // Represent integral part of digit number.
        var decimal;    // Represent decimal part of digit number.
        var outputCharacters;    // The output result.
        var parts;
        var digits, radices, bigRadices, decimals;
        var zeroCount;
        var i, p, d;
        var quotient, modulus;

        currencyDigits = currencyDigits.toString();
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            $(".error").css({display:"block"}).children("span").html("请输入有效金额");
            return "";
        }

        // Normalize the format of input digits:
        currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters.
        currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            alert("金额过大，应小于1000亿元！");
            return "";
        }

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = currencyDigits.split(".");
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        }
        else {
            integral = parts[0];
            decimal = "";
        }
        // Prepare the characters corresponding to the digits:
        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);
        // Start processing:
        outputCharacters = "";
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                }
                else {
                    if (zeroCount > 0)
                    {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                    zeroCount = 0;
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        // Process decimal part if there is:
        if (decimal != "") {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }
        // Confirm and return the final output string:
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "") {
            outputCharacters += CN_INTEGER;
        }
        //outputCharacters = CN_SYMBOL + outputCharacters;
        outputCharacters = outputCharacters;
        return outputCharacters;
    },
    //时间转换函数  传入时间戳
    /**
     * time 时间戳
     * format 时间格式  'yyyy年MM月dd日 hh:mm:ss' 'yyyy/MM/dd hh:mm:ss' yyyy年MM月dd日
     * **/
    format : function(time,format){
        if(!time )return;
        var date = new Date(time);
        var o = {
            "M+" : date.getMonth()+1, //month
            "d+" : date.getDate(), //day
            "h+" : date.getHours(), //hour
            "m+" : date.getMinutes(), //minute
            "s+" : date.getSeconds(), //second
            "q+" : Math.floor((date.getMonth()+3)/3), //quarter
            "S" : date.getMilliseconds() //millisecond
        };

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    },
    offsetLeft(ele){
        let l = 0;
        if(ele.offsetParent.tagName.toLowerCase() == 'td'){
            while(ele.offsetParent.tagName.toLowerCase() != 'body'){
                l += parseFloat(ele.offsetLeft);
                ele = ele.offsetParent;
            }
            l += parseFloat(ele.offsetLeft);
        }else{
            l = ele.offsetLeft
        }
        return l;
    },
    offsetTop(ele){
        let t = 0;
        if(ele.offsetParent.tagName.toLowerCase() == 'td'){
            while(ele.offsetParent.tagName.toLowerCase() != 'body'){
                t += parseFloat(ele.offsetTop);
                ele = ele.offsetParent;
            }
            t += parseFloat(ele.offsetTop);   
        }else{
            t = ele.offsetTop;
        }
        
        return t;
    },
};
