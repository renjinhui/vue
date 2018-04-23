module.exports = {

  showDetail:function(){

    $("body").append($("<div class='version-detail-hover calendar-detail-hover'>"+
      "<div class='arrow useful'>"+
      "<div class='arrow-up'></div>"+
      "<div class='arrow-up-in'></div>"+
      "</div>"+
      "<div class='version-useful-account cf'><a class='lcLink' href='/myaccount/capital/assets_willgain' target='_blank'> "+
      "<em class='lt'>理财</em>"+
      "<i class='rt calendar-lc'>理财</i>"+
      "</a></div>"+
    "<div class='version-useful-account cf'><a class='wdLink' href='https://www.souyidai.com/myaccount/capital/willgain' target='_blank'>"+
    "<em class='lt'>网贷</em>"+
    "<i class='rt calendar-wd'>网贷</i>"+
    "</a></div>"+
    "</div>"));
    /*动态生成tooltips-end*/
    var $tooltipcol = $(".payment-status .sums");
    var $toolTip = $(".calendar-detail-hover");//tip浮层

    $(document).on("mouseenter",".payment-status .sums,.today .sums",function(){//修复翻页刷新数据-》执行
      var _this = $(this);
      var jjs = _this.attr('data-jjs');
      var p2p = _this.attr('data-p2p');
      var time = new Date(Number(_this.attr('data-time')));
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      month = month >=10 ? month : '0'+month;
      var day = time.getDate();
      day = day >=10 ? day : '0'+day;
      var param = year+''+month+''+day;
      $('.lcLink').attr('href','/myaccount/capital/assets_willgain?t='+param + '-'+param);
      $('.wdLink').attr('href','https://www.souyidai.com/myaccount/capital/willgain?t='+param + '-'+param);
      $('.calendar-lc').html(jjs);
      $('.calendar-wd').html(p2p);

      var $left = _this.offset().left;
      var $top = _this.offset().top;
      var $toolTipW = $toolTip.width()/2;
      $toolTip.css({left:($left-$toolTipW)-16+_this.width()/2,top:$top+_this.height()-2});
      $toolTip.show();
    });
    $(document).on("mouseleave",".payment-status .sums,.calendar-detail-hover",function(){
      $toolTip.hide();
    });
    $(document).on("mouseenter",".calendar-detail-hover",function(){
      $toolTip.show();
    });
  }
};