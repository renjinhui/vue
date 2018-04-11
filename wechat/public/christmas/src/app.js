var fishGame = fishGame || {};

function getCookie(name){
    var result = null;
    //对cookie信息进行相应的处理，方便搜索
    var myCookie = ""+document.cookie+";";
    var searchName = ""+name+"=";
    var startOfCookie = myCookie.indexOf(searchName);
    var endOfCookie;
    if(startOfCookie != -1){
        startOfCookie += searchName.length;
        endOfCookie = myCookie.indexOf(";",startOfCookie);
        result = (myCookie.substring(startOfCookie,endOfCookie));
    }
    return result;
}

fishGame.getParameter = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
};

window.IS_HELP = fishGame.getParameter('is_help')==1;

if(window.IS_HELP){
    fishGame.HELP = {
        is_help: 1,
        uid: fishGame.getParameter('friend_uid'),
        self_uid: getCookie('syd_event_id')
    };
}else{
    fishGame.HELP = {
        is_help: 0,
        self_uid: getCookie('syd_event_id')
    }
}

fishGame.Constant = {
    MAX: 66,
    DOWNLOAD: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.souyidai.investment.android&ckey=CK1289998290990'
}
