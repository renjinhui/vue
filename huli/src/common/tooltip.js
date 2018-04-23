module.exports = {
  showToolTip: function(){

    function SydLocal(){
    }

    SydLocal.COMMON="local_common";
    SydLocal.WWW="local_www";
    SydLocal.PAY="local_pay";
    SydLocal.PASSPORT="local_passport";
    SydLocal.TOOTIP="local_tooltip";
    SydLocal.BILLTOOTIP="bill";

    SydLocal.prototype.get=_getLocal;
    SydLocal.prototype.getCOMMON=_getCommonLocal;
    SydLocal.prototype.getWWW=_getWwwLocal;
    SydLocal.prototype.getPAY=_getPayLocal;
    SydLocal.prototype.getPASSPORT=_getPassportLocal;
    SydLocal.prototype.getToolTip=_getToolTipLocal;
    SydLocal.prototype.getBillToolTip=_getBillToolTipLocal;
    SydLocal.prototype.fmt=_fmtLocal;
    SydLocal.prototype.fmtCOMMON=_fmtCommonLocal;
    SydLocal.prototype.fmtWWW=_fmtWwwLocal;
    SydLocal.prototype.fmtPAY=_fmtPayLocal;
    SydLocal.prototype.fmtPASSPORT=_fmtPassportLocal;
    SydLocal.prototype.fmtToolTip=_fmtToolTipLocal;
    SydLocal.prototype.fmtBillToolTip=_fmtBillToolTipLocal;

    function _getCommonLocal(key){
      return _getLocal(SydLocal.COMMON,key);
    }
    function _getWwwLocal(key){
      return _getLocal(SydLocal.WWW,key);
    }
    function _getPayLocal(key){
      return _getLocal(SydLocal.PAY,key);
    }
    function _getPassportLocal(key){
      return _getLocal(SydLocal.PASSPORT,key);
    }
    function _getToolTipLocal(key){
      return _getLocal(SydLocal.TOOTIP,key);
    }
    function _getBillToolTipLocal(key){
      return _getLocal(SydLocal.BILLTOOTIP,key);
    }

    function _getLocal(type,key){
      try{
        var s = codes[type][key];
        if(s==null || s=='undefined' || s==''){
          return key;
        }
        return s;
      }catch(e){}
      return "";
    }

    function _fmtCommonLocal(key,args){
      return _fmtLocal(SydLocal.COMMON,key,args);
    }

    function _fmtWwwLocal(key,args){
      return _fmtLocal(SydLocal.WWW,key,args);
    }

    function _fmtPayLocal(key,args){
      return _fmtLocal(SydLocal.PAY,key,args);
    }
    function _fmtPassportLocal(key,args){
      return _fmtLocal(SydLocal.PASSPORT,key,args);
    }

    function _fmtToolTipLocal(key,args){
      return _fmtLocal(SydLocal.TOOTIP,key,args);
    }

    function _fmtBillToolTipLocal(key,args){
      return _fmtLocal(SydLocal.BILLTOOTIP,key,args);
    }

    function _fmtLocal(type,key,args){
      try{
        var s = codes[type][key];
        if(s==null || s=='undefined' || s==''){
          return key;
        }
        var numargs = args.length;
        if(numargs === 0 ){
          return s;
        }
        for (var i = 0 ; i < numargs; i++){// 获取参数内容。
          var reg = "{"+i+"}"; //创建正则RegExp对象
          s=s.replace(reg,args[i]);
        }
        return s;

      }catch(e){
      }
      return "";
    }

    var _ll=new SydLocal();


    /*动态生成tooltips层*/
    $("body").append($("<div  class='tool-tip'>" +
      "<div class='tool-tip-recive'>tooltips内容</div>" +
      "<p class='ar_up'></p>" +
      "<p class='ar_up_in'></p>" +
      "</div>"));
    /*动态生成tooltips-end*/
    var $tooltipcol = $(".tooltipcol");
    var $toolTip = $(".tool-tip");//tip浮层
    var $toolTipRecive = $(".tool-tip-recive");

    //$tooltipcol.on("mouseenter",function(){
    $(document).on("mouseenter",".tooltipcol",function(){//修复翻页刷新数据-》执行
      var _this = $(this);
      var $dataText = _this.attr("data-text");
      var $dataParams = _this.attr("data-param") ? _this.attr("data-param").split("@@") : [];
      //_ll.getToolTip(key);
      //$toolTipRecive.html($dataText);
      if(_ll.fmtToolTip($dataText,$dataParams) == $dataText){
        $toolTipRecive.html(_ll.fmtBillToolTip($dataText,$dataParams));
      }else{
        $toolTipRecive.html(_ll.fmtToolTip($dataText,$dataParams));
      }
      $toolTipRecive[0].innerText ? $toolTipRecive[0].innerHTML = $toolTipRecive[0].innerText : null;
      
      /*
       *当前图标添加hover
       * */
      if(_this.hasClass("version-tooltip-css")){
        _this.addClass("version-tooltip-csshover");
      }
      $tooltipcol["flag"] = _this;

      var $left = _this.offset().left;
      var $top = _this.offset().top;
      var $toolTipW = $toolTip.width()/2;

      //_this.width()/2本身元素宽度的一半
      //-16箭头的总宽度
//        $toolTip.css({left:$left-$toolTipW,top:$top+_this.height()+8});
      $toolTip.css({left:($left-$toolTipW)-16+_this.width()/2,top:$top+_this.height()+8});
      $toolTip.show();
    });
    $(document).on("mouseleave",".tooltipcol,.tool-tip",function(){
      $toolTip.hide();
      var $version_tooltip_css = $(".version-tooltip-css");
      if($version_tooltip_css){
        $version_tooltip_css.removeClass("version-tooltip-csshover");
      }
    });
    $(document).on("mouseenter",".tool-tip",function(){
      $toolTip.show();
      var $version_tooltip_css = $(".version-tooltip-css");
      if($version_tooltip_css){
        $tooltipcol["flag"].addClass("version-tooltip-csshover");
      }
    });
    /*tooltips-end*/
  }
};