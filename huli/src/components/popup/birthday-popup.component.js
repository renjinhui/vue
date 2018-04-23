// const React = require('react');
// const ReactRedux = require('react-redux');
// const connect = ReactRedux.connect;
// const actions = require('../../reducers/birthdayPopup/birthdayPopupActions');
// const Birthday = React.createClass({
//
// getInitialState(){
//   return{
//     top:0
//   }
// },
// isLtIE10(){
//
//     let useragent = navigator.userAgent.toLowerCase();
//
//     if(useragent.indexOf('msie 6') > -1 || useragent.indexOf('msie 7') > -1 || useragent.indexOf('msie 8') > -1 || useragent.indexOf('msie 9') > -1){
//       return true;
//     }
//
//     return false;
//   },
// componentDidMount(){
//   let birthday = this.tabDOM;
//   let winH = $(window).height();
//   //console.log(parseInt(window.getComputedStyle(birthday).height));
//   let bH = 622;
//   let scH = document.body.scrollTop;
//   this.state.top = (winH - bH)/2 +scH;
//   this.faireFn();
//   //红包蜡烛动效
//   let ary = [
//     'https://static.huli.com/images/static-pages/birthday-popup/cake1.png',
//     'https://static.huli.com/images/static-pages/birthday-popup/cake2.png',
//     'https://static.huli.com/images/static-pages/birthday-popup/cake3.png',
//   ];
//   var img1 = null, img2 = null, img3 = null, count = 0;
//   const objImg = [img1, img2, img3];
//   for(var i = 0; i < ary.length; i++){
//     objImg[i] = new Image()
//     objImg[i].src = ary[i];
//     objImg[i].onload = function(){
//       count++;
//       if(count === ary.length){
//         //所有都加载完了
//       }
//     }
//   };
//
// (function()
// {
//   var bgCounter = 0,
//     backgrounds = [
//     "birth-top3",
//      "birth-top2",
//     ];
//   function changeBackground()
//   {
//     bgCounter = (bgCounter+1) % backgrounds.length;
//     $('.birth-top').toggleClass(backgrounds[bgCounter]);
//     setTimeout(changeBackground, 1000);
//   }
//   changeBackground();
// })();
// },
// close(){
//     $('.rc-dialog-mask').hide();
//     $('.birthdaypop').hide();
//     this.stateChange(1);
//
//   },
// stateChange(n){
//   this.props.dispatch(actions.birPopupState(n))
// },
// faireFn(){
//   //烟花爆炸效果
//   //封装一个随机背景
//   function randomBgColor(){
//     var png=parseInt(Math.random()*10);
//     var pngBg= 'url(https://static.huli.com/images/static-pages/birthday-popup/'+png+'.png)';
//     // console.log(pngBg)
//     return pngBg;
//   }
// //创建一个制造烟花的构造函数，第一个参数为元素，第二参数为初始x轴位置，第三参数为y轴位置。
//   function Fireworks(Div,x,y){
//     Div.style.background=randomBgColor();   //给烟花添加背景色
//     Div.style.zIndex=9999999;
//     Div.className="firworks";         //添加一个class
//     Div.style.width=6+'px';
//     Div.style.height=6+'px';
//     Div.style.position = "absolute";
//     document.body.appendChild(Div);
//     Div.style.left=x+"px";            //把鼠标点击坐标给div
//     Div.style.top=y+"px";
//     var speedX = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*15 + 1);  //三目运算符随机移动方向，概率50%,为1时往正方向移动，负1时往反方向移动第二个随机数随机速度快慢
//     var speedY = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*20 + 1);
//     this.move=function(){
//       var i = 3;
//       var j = 1;
//       var time1=setInterval(function(){
//         i++;
//         j = j - 0.03;
//         Div.style.left=Div.offsetLeft+speedX+"px";
//         Div.style.top=Div.offsetTop+speedY+i+"px";   //当i+speedY>0时,烟花朝下运动。
//         Div.style.opacity=j;
//         var wid=$(window).width()-(($(".birthdaypop").width())/2);
//         // if(Div.offsetLeft-wid < 0 || Div.offsetRight-wid < 0) {
//         //   Div.remove();   //移动出可视区域记得删除div和清除定时器
//         //   clearInterval(time1);
//         // }
//         if(Div.offsetLeft+Div.offsetWidth>window.innerWidth|| Div.offsetLeft<2 || Div.offsetTop+Div.offsetHeight>window.innerHeight || Div.offsetTop<2 ){
//           Div.remove();   //移动出可视区域记得删除div和清除定时器
//           clearInterval(time1);
//         }
//       },80);
//     }
//   }
//
//     (function(e)
//       {
//           var evt=e||window.event;  //兼容性处理
//         function changeBackground()
//         {
//           for(var i=0;i<80;i++){    //随机烟花的数量
//           var div=document.createElement("div");
//           var b=new Fireworks(div,($(window).width()/2),($(window).height()/2)-270)
//           b.move();
//         }
//         }
//         changeBackground();
//       })();
//
//     function fnzha2(){
//       (function(e){
//         var evt=e||window.event;  //兼容性处理
//         function changeBackground(){
//           for(var i=0;i<80;i++){    //随机烟花的数量
//             var div=document.createElement("div");
//             var b=new Fireworks(div,($(window).width()/2),($(window).height()/2)-350);
//             b.move();
//           }
//         }
//         changeBackground();
//       })()
//     };
//     setTimeout(function(){
//     fnzha2()
//   },1000);
// },
//   render() {
//     let loginUrl = 'https://passport.huli.com/?backurl=' + location.href;
//     return (
//         <div>
//           <div className="rc-dialog-mask"></div>
//           <div className="rc-dialog-wrap birthdaypop" ref={dom => {this.tabDOM = dom}} style={{'top':this.state.top+'px'}}>
//               <div className="birth-top">
//                   <div className="quitBtn" onClick={this.close}></div>
//               </div>
//               <div className="birth-content">
//                    <p className="msg-title">{this.props.birState.data.data.headLine}</p>
//                    <p className="msg-text">
//                        {this.props.birState.data.data.bodyLines[0]}<span className="msg-money">{this.props.birState.data.data.bodyLines[1]}</span>
//                        {this.props.birState.data.data.bodyLines[2]}
//                    </p>
//
//                    <p className="msg-data">{this.props.birState.data.data.birthday}</p>
//                    <div className="incomeBtn" onClick={this.close}></div>
//                 </div>
//             </div>
//         </div>
//     )
//   }
// });
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     state,
//     birState:state.birthdayPopupData
//   }
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     dispatch,
//     getData(){
//       dispatch(actions.birthdayPopupPosts())
//     }
//   }
// };
//
// export const BirthdayPopup = connect(
//   mapStateToProps,mapDispatchToProps
// )(Birthday);
//
//
//
