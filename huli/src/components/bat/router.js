const React = require('react');
const Router = require('react-router').Router;
const browserHistory = require('react-router').browserHistory;
// const App = require('../app.components')['default'];
const App = require('../app').App;
const About = require('../about.component').About;
const Inbox = require('../inbox.component').Inbox;
const Capital = require('../myaccount/capital/capital.component').CapitalMain;

const InvestList = require('../investList/investList.component').InvestList;
const Investing = require('../investList/investing/investList-investing.component').InvestingList;

const HY = require('../investList/investing/hy/investing-hy-main.component').Main;
const P2P = require('../investList/investing/p2p/investing-p2p-main.component').Main;



//设置路由
const Root = require('../Root').Root;



const RouterLink = React.createClass({
  render:function(){

    const routeConfig = [
      // {
      //   path:'/',
      //   component:App,
      //   childRoutes: [
      //     { path: 'about', component: About },
      //     { path: 'inbox', component: Inbox },
      //     { path: 'capital', component: Capital },
      //   ]
      // },
      {
        path:'/',
        component:InvestList,
        childRoutes: [
          {
            path:'investing',
            component: Investing ,
            childRoutes:[
              { path: 'hy', component: HY },
              { path: 'p2p', component: P2P },
              { path: 'capital', component: Capital },
            ]
          }

        ]
      }
    ];

    const config = [
      {
        path:'/',
        component:InvestList,
        childRoutes: [
          {
            path:'investing',
            component: Investing ,
            childRoutes:[
              { path: 'hy', component: HY },
              { path: 'p2p', component: P2P },
              { path: 'capital', component: Capital },
            ]
          }

        ]
      }
    ];

    return (

      <Router history={browserHistory} routes={config}/>
    )
  }
});


module.exports = {
  RouterLink
};
