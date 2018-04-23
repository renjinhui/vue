const React = require('react');
const ReactRedux = require('react-redux');
const fetchJSONP = require('fetch-jsonp');
const connect = ReactRedux.connect;
const actions = require('../../../reducers/banner/bannerActions');

// window.jsonpcallback = function(data){
//   console.log(data);
// };
const BannerBar = React.createClass({
  getInitialState:function(){
    return{
      bannerData:[]
    }
  },
  componentWillMount:function(){
    // this.props.getBannerData()
  },
  componentDidMount:function() {
  },
  getBannerData:function () {
    var _this = this;
    // fetchJSONP('https://help.huli.com/element/financial_list/index.json',{
    //   jsonpCallback: 'jsonpcallback'
    // }).then(function(data){
    //   console.log(data);
    // })
    // $.ajax({
    //   async:false,
    //   url: 'https://help.huli.com/element/financial_list/index.json',
    //   type: "GET",
    //   jsonpCallback: 'jsonpcallback',
    //   dataType: 'jsonp',
    //   success:function(data){
    //
    //     _this.state.bannerState = data;
    //     _this.setState(Object.assign({}, _this.state.bannerState, data));
    //   }
    // })

  },
  showPic:function(i){
    $('.banner-images a').css({zIndex:0});
    $('.banner-images a').eq(i).css({zIndex:1});
    $('.circle-guide a').removeClass('current');
    $('.circle-guide a').eq(i).addClass('current');
  },
  render:function() {
    var str = '';
    var dot = [];
    if(this.props.bannerData.data){
      str = this.props.bannerData.data.map(function(item,index){
        let cursor = item.link ? 'pointer' : 'default';
        // let target = item.link ? 'target="_blank"' : '';
        return <a href={item.link ? item.link : 'javascript:;'} target={item.link ? '_blank' : '_self'} key={index} style={{cursor:cursor,backgroundImage: "url("+item.picture+')'}}></a>
      });
    }

    if(this.props.bannerData && this.props.bannerData.data.length > 1){
    // if(this.state.bannerState){
      for(let i =0;i<this.props.bannerData.length;i++){
        if(i==0){
          dot.push(<a href="javascript:" className="current" onClick={this.showPic.bind(this,i)} ></a>);
        }else{
          dot.push(<a href="javascript:" onClick={this.showPic.bind(this,i)}></a>);
        }
      }
    }

    return (
      <div className="invest-top-boxs">
        <div className="main-banner">
          <div className="banner-images">
            {str}
          </div>
          <div className="circle-guide">
            {dot}
          </div>
        </div>
      </div>

    )
  }
});

// module.exports = {
//   Banner
// };


const mapStateToProps = (state, ownProps) => {
  return{
    bannerData:state.bannerData
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBannerData:()=>{
      dispatch(actions.bannerDataPosts());
    }
  }
};

export const Banner = connect(
  mapStateToProps,mapDispatchToProps
)(BannerBar);