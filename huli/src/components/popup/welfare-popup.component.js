// const React = require('react');
// const ReactRedux = require('react-redux');
// const connect = ReactRedux.connect;
// const actions = require('../../reducers/welfarePopup/welfarePopupActions');
// const WelfarePopupMain = React.createClass({
//
//   isLtIE10(){
//
//     let useragent = navigator.userAgent.toLowerCase();
//
//     if(useragent.indexOf('msie 6') > -1 || useragent.indexOf('msie 7') > -1 || useragent.indexOf('msie 8') > -1 || useragent.indexOf('msie 9') > -1){
//       return true;
//     }
//
//     return false;
//   },
//
//   close(){
//     $('.rc-dialog-mask').hide();
//     if(this.isLtIE10()){
//       $('.rc-dialog-wrap').hide();
//     }else{
//       $('.rc-dialog-wrap').removeClass('popup-more').addClass('popup-disappear');
//     }
//
//   },
//   //获取服务器时间
//   getDataTime(){
//    $.post('/ajax/sysTime', { format: 'yyyy-MM-dd HH:mm:ss' }, function(data){
//     var nowTime = data;
//     var nowtimestamp = Date.parse(new Date(nowTime.replace(/\-/g, '/')));
//     nowtimestamp = nowtimestamp / 1000;
//
//      // var startTime = "2017-8-15 00:00:00";
//      // var starttimestamp = Date.parse(new Date(startTime));
//      // starttimestamp = starttimestamp / 1000;
//
//      //  var endTime = "2017-8-17 23:59:59";
//      // var endtimestamp = Date.parse(new Date(endTime));
//      // endtimestamp = endtimestamp / 1000;
//     //从bs获取活动时间
//     var coupon_alert_time = codes.local_tooltip.coupon_alert_time.replace(/\-/g, '/').split('"');
//       if(coupon_alert_time.length === 9){
//         //活动开始时间
//         var startTime = coupon_alert_time[3];
//          var starttimestamp = Date.parse(new Date(startTime));
//          starttimestamp = starttimestamp / 1000;
//          //活动结束时间
//          var endTime = coupon_alert_time[7];
//          var endtimestamp = Date.parse(new Date(endTime));
//          endtimestamp = endtimestamp / 1000;
//
//          if((starttimestamp-nowtimestamp)<=0 && (endtimestamp-nowtimestamp)>=0){
//           $(".rc-dialog-wrap").addClass('country')
//          }else{
//            $(".rc-dialog-wrap").removeClass('country')
//          }
//         }
//     });
//   },
//   render() {
//     let _this = this;
//     let list = '';
//     let hasClass = 'rc-dialog-wrap redpack-bac1 popup-more';
//     let lengthClass = '';
//     let length = 0;
//     let boxClass = 'redpack-boxs';
//     if(this.props.welfareState.isFetching == 1){
//       this.getDataTime();
//       length = this.props.welfareState.data.data && this.props.welfareState.data.data.items.length;
//       if(length !== 1){
//         boxClass = 'redpack-boxs cf';
//       }
//       if(this.props.welfareState.data.data && this.props.welfareState.data.data.items.length ==2){
//         hasClass = 'rc-dialog-wrap redpack-bac1 redpack-bac2';
//         lengthClass = 'margin-30';
//       }
//       if(this.props.welfareState.data.data && this.props.welfareState.data.data.items.length >=3){
//         hasClass = 'rc-dialog-wrap redpack-bac1 redpack-bac3';
//         lengthClass = 'margin-10';
//       }
//       list = this.props.welfareState.data.data && this.props.welfareState.data.data.items.map(function(item,index){
//         let Name ='redpack-items';
//         if(length == 2 && index !== length-1){
//           Name = 'redpack-items margin-30'
//         }else if(length >= 3 && index !== 2){
//             Name = 'redpack-items margin-10'
//         }else{
//           Name = 'redpack-items'
//         }
//         if(index < 3){
//           return (<a href={item.pcSkipUrl ? item.pcSkipUrl : 'javascript:;'} target={item.pcSkipUrl ? '_blank' : '_self'} className={Name}>
//             <p className="one-text"><i>{item.value}</i><span>{item.valueUnit}</span></p>
//             <p className="two-text">{item.usageDesc}</p>
//             <span className="three-text">{item.expireText}</span>
//             <p className="fore-text">{item.name}</p>
//           </a>)
//         }
//
//       });
//     }
//
//     return (
//       <div>
//         <div className="rc-dialog-mask"></div>
//
//         <div className={hasClass} >
//           <a href="javascript:" className="redpack-close" onClick={this.close}></a>
//           <p className="redpack-title">{this.props.welfareState.data.data ? this.props.welfareState.data.data.title : ''}</p>
//           <div className={boxClass}>
//             {list}
//           </div>
//           <div className="redpack-button" onClick={this.close}>{this.props.welfareState.data.data ? this.props.welfareState.data.data.buttonText : ''}</div>
//         </div>
//       </div>
//     )
//   }
// });
//
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     welfareState:state.welfarePopupData
//   }
// };
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getData(){
//       dispatch(actions.welfarePopupPosts())
//     }
//   }
// };
//
// export const WelfarePopup = connect(
//   mapStateToProps,mapDispatchToProps
// )(WelfarePopupMain);
//
//
