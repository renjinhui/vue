const React = require('react');

const XjgBan = React.createClass({
  getInitialState:function(){
    return{
      num:0,
      timer:null
    }
  },
  componentDidMount:function(){
    let _this = this;
    this.state.timer = setInterval(function(){
      if(_this.state.num > 2){
        _this.state.num = 0;
      }
      _this.showPic(_this.state.num);
      _this.state.num++;
    },3000);

    $('.hq-circle-boxs a').click(function(){
      _this.state.num = $(this).index();
      clearInterval(_this.state.timer);
      _this.showPic(_this.state.num);
    });

    $('.banner-items').mouseover(function(){
      clearInterval(_this.state.timer);
    });

    $('.banner-items').mouseout(function(){
      _this.state.timer = setInterval(function(){
        if(_this.state.num > 2){
          _this.state.num = 0;
        }
        _this.showPic(_this.state.num);
        _this.state.num++;
      },3000);
    });
  },

  showPic:function(i){
    $('.banner-boxs a').css({zIndex:0});
    $('.banner-boxs a').eq(i).css({zIndex:1});
    $('.hq-circle-boxs a').removeClass('current');
    $('.hq-circle-boxs a').eq(i).addClass('current');
  },
  render:function() {

  	// let carousel = function(){
  	// 	let ind = $('.banner-boxs .banner-items').length;
  	// 	console.log(ind+'df')
  	// 	let m = 0;
  	// 	for(m;m < 3;m++){
  	// 		console.log(m)
  	// 		$('.banner-items').css({zIndex:0});
  	// 		$('.banner-items').eq(m).css({zIndex:1});
  	// 		$('.hq-circle-boxs a').removeClass('current');
  	// 		$('.hq-circle-boxs a').eq(m).addClass('current');
  	// 	}
  	// };
  	// carousel();

  	// let showBan = function(_this,i){
  	// 	$('.banner-items').css({zIndex:0});
  	// 	$('.banner-items').eq(i).css({zIndex:1});
  	// 	$('.hq-circle-boxs a').removeClass('current');
  	// 	$('.hq-circle-boxs a').eq(i).addClass('current');
  	// }
    return (
    	<div className="hq-detais-banner">
    	    <div className="banner-boxs">
    	        <a href="javascript:" className="banner-items cf" style={{zIndex:1}}>
    	            <div className="banner-left lt">
    	                <p className="banner-title">资金零站岗</p>
    	                <p className="banner-explain">简捷投资，随时回款随时投，资金不再站岗。收益天天有，轻松又省心。</p>
    	            </div>
    	            <div className="rt"><img src="https://static.huli.com/images/hq-gold/hq-banner1.png" alt="" /></div>
    	        </a>
    	        <a href="javascript:" className="banner-items cf" style={{zIndex:0}}>
    	            <div className="banner-left lt">
    	                <p className="banner-title">进出乐无忧</p>
    	                <p className="banner-explain">零手续费，随时转入转出，T+1确认。投资计划合理安排，助您捕捉更多投资机会。</p>
    	            </div>
    	            <div className="rt"><img src="https://static.huli.com/images/hq-gold/hq-banner2.png" alt="" /></div>
    	        </a>
    	        <a href="javascript:" className="banner-items cf" style={{zIndex:0}}>
    	            <div className="banner-left lt">
    	                <p className="banner-title">点滴汇财富</p>
    	                <p className="banner-explain">首次转入100元起，1元的整数倍递增。账户资金充分利用，积少成多，寸积铢累，财富点滴汇聚。</p>
    	            </div>
    	            <div className="rt"><img src="https://static.huli.com/images/hq-gold/hq-banner3.png" alt="" /></div>
    	        </a>
    	    </div>
    	    <div className="hq-circle-boxs">
    	        <a href="javascript:" className="current"></a>
    	        <a href="javascript:"></a>
    	        <a href="javascript:"></a>
    	    </div>
    	</div>
    	);
  }
});

module.exports = {
  XjgBan
};