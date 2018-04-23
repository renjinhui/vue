const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Redirect = ReactRouter.Redirect;
const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;
const ReactRedux = require('react-redux');
const connect = ReactRedux.connect;

const history = require('history');
const useBasename = history.useBasename;
const createHistory = history.createHashHistory;
const historyConfig = useBasename(createHistory)({
  basename: '/'
});

const bannerAction  = require('../../reducers/banner/bannerActions');

//设置路由
const Root = require('../Root').Root;

const RouterLinkBar = React.createClass({

  render:function(){
    return (
      <Router history={historyConfig}>
        <Route path="/" component={Root}>
          <IndexRedirect to="/invest/hy" />
          <Route path="/invest" name="invest" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../investList').InvestList)
            }, 'invest')
          }  } >
            <IndexRedirect to="/invest/hy" />
            <Route path="/invest/hy" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../investList').HY)
              }, 'invest/hy')
            }  }  onEnter={this.props.handleEnter} />
            <Route path="/invest/hyou" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../investList').HYOU)
              }, 'invest/hyou')
            }  }  onEnter={this.props.handleEnter} />
            <Route path="/invest/hb" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../investList').HB)
              }, 'invest/hb')
            }  }  onEnter={this.props.handleEnter} />
            <Route path="/invest/transfer" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../investList').Tranfer)
              }, 'invest/transfer')
            }  }  onEnter={this.props.handleEnter} />
          </Route>
          <Route path="/rry" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../rry/rry.component').RryMain)
            }, 'rry')
          }  } >
          </Route>
          <Route path="/myaccount" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../myaccount').Myaccount)
            }, 'myaccount')
          }  } >
            <IndexRedirect to="/myaccount/capital" />
            <Route path="/myaccount/capital" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').CapitalMain)
              }, 'myaccount/capital')
            }  } />
            <Route path="/myaccount/collocation/takeNow" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../collocation').TakeNow)
              }, 'myaccount/collocation/takeNow')
            }  } />

            <Route path="/myaccount/recharge" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').rechargeMain)
              }, 'myaccount/recharge')
            }  } >
              <IndexRedirect to="/myaccount/recharge/main" />
              <Route path="/myaccount/recharge/Main" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').rechargeBox)
                }, 'myaccount/recharge/Main')
              }  } />
              <Route path="/myaccount/recharge/lc-history" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').LCHistory)
                }, 'myaccount/recharge/lc-history')
              }  } />
              <Route path="/myaccount/recharge/wd-history" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').WDHistory)
                }, 'myaccount/recharge/wd-history')
              }  } />
            </Route>
            <Route path="/myaccount/rry" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').RryModal)
              }, 'myaccount/rry')
            }  } >
              <IndexRedirect to="/myaccount/rry/income" />
              <Route path="/myaccount/rry/income" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').RryIncome)
                }, '/myaccount/rry/income')
              }  } />
              <Route path="/myaccount/rry/output" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').RryOutput)
                }, 'myaccount/rry/output')
              }  } />
              <Route path="/myaccount/rry/profit" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').RryProfit)
                }, 'myaccount/rry/profit')
              }  } />
            </Route>
            <Route path="/myaccount/lc_lend" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').LcLendMain)
              }, 'myaccount/lc_lend')
            }  } >
              <IndexRedirect to="/myaccount/lc_lend/normal" />
              <Route path="/myaccount/lc_lend/normal" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').LclistNormal)
                }, 'myaccount/lc_lend/normal')
              }  } />
              <Route path="/myaccount/lc_lend/open" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').LclistOpen)
                }, 'myaccount/lc_lend/open')
              }  } />
              <Route path="/myaccount/lc_lend/over" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').LclistOver)
                }, 'myaccount/lc_lend/over')
              }  } />
              <Route path="/myaccount/lc_lend/drain" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').LclistDrain)
                }, 'myaccount/lc_lend/drain')
              }  } />
            </Route>
            <Route path="/myaccount/wd_lend" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').WdLendMain)
              }, 'myaccount/wd_lend')
            }  } >
              <IndexRedirect to="/myaccount/wd_lend/normal" />
              <Route path="/myaccount/wd_lend/normal" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').WdlistNormal)
                }, 'myaccount/wd_lend/normal')
              }  } />
              <Route path="/myaccount/wd_lend/open" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').WdlistOpen)
                }, 'myaccount/wd_lend/open')
              }  } />
              <Route path="/myaccount/wd_lend/over" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').WdlistOver)
                }, 'myaccount/wd_lend/over')
              }  } />
              <Route path="/myaccount/wd_lend/drain" getComponent={  (location, callback) => {
                require.ensure([], require => {
                  callback(null, require('../myaccount').WdlistDrain)
                }, 'myaccount/wd_lend/drain')
              }  } />
            </Route>
            <Route path="/myaccount/bankCard" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../myaccount').BankCard)
              }, 'myaccount/bankCard')
            }  } >
            </Route>
          </Route>

          <Route path="/monthbill" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../monthBill/monthBill.component').MonthBill)
            }, 'monthbill')
          }  } >
          </Route>
          <Route path="/findpassword" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../repwd/findpassword').REPWD)
            }, 'findpassword')
          }  } >
          </Route>
            {/* 托管 */}
          <Route path="/collocation" name="collocation">
            <IndexRedirect to="collocation/openAccount" />
            <Route path="/collocation/openAccount" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../collocation').OpenAccount)
              }, 'collocation/openAccount')
            }  } />
            <Route path="/collocation/changeCard" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../collocation').ChangeCard)
              }, 'collocation/changeCard')
            }  } />
          </Route>

          <Route path="/details" name="details" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../details_jjs').Details)
            }, 'details')
          }  } >
            <IndexRedirect to="details/project" />
            <Route path="/details/project" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../details_jjs').Project)
              }, 'details/project')
            }  } />
            <Route path="/details/subscription" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../details_jjs').Subscription)
              }, 'details/subscription')
            }  } />
            <Route path="/details/question" getComponent={  (location, callback) => {
              require.ensure([], require => {
                callback(null, require('../details_jjs').Question)
              }, 'details/question')
            }  } />
          </Route>
          <Route path="/findpassword" getComponent={  (location, callback) => {
            require.ensure([], require => {
              callback(null, require('../repwd/findpassword').REPWD)
            }, 'findpassword')
          }  } >
          </Route>
          {
            process.env.NODE_ENV == 'develop' ? 
            require('../demo-component/demo-router').demoRouter():
            null
          }
          <Redirect from='*' to='/invest/hy' />
        </Route>
      </Router>
    )
  }
});

const mapStateToProps = (state, ownProps) => {
  return{}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleEnter:function(nextState){
      let url = 'https://help.huli.com/element/pclistbanner/huiying/index.json?t='+Math.random();
      if(nextState && nextState.location){
        if(nextState.location.pathname.indexOf('invest/hyou') != -1){
          url = 'https://help.huli.com/element/pclistbanner/huiyou/index.json?t='+Math.random();
          dispatch(bannerAction.bannerDataPosts(url));

        }else if(nextState.location.pathname.indexOf('invest/hy') != -1){
          url = 'https://help.huli.com/element/pclistbanner/huiying/index.json?t='+Math.random();
          dispatch(bannerAction.bannerDataPosts(url));

        }else if(nextState.location.pathname.indexOf('invest/hb') != -1){
          url = 'https://help.huli.com/element/pclistbanner/huibao/index.json?t='+Math.random();
          dispatch(bannerAction.bannerDataPosts(url));

        } else {
          url = 'https://help.huli.com/element/pclistbanner/zhuanrang/index.json?t='+Math.random();
          dispatch(bannerAction.bannerDataPosts(url));
        }


      }
    },
  }
};

export const RouterLink = connect(
  mapStateToProps,mapDispatchToProps
)(RouterLinkBar);

