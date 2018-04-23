const React =require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const IndexRedirect = require('react-router').IndexRedirect;
const IndexRoute = require('react-router').IndexRoute;


const WdLendListBox = React.createClass({

	
	render:function(){
		
		return(
            <div>
                <div className="sydinlist-title cols-four" style={{position:'relative'}}>
                    <Link to="/myaccount/wd_lend/normal" className='cols-one' activeClassName='current' style={{width:'228px'}}>回款中</Link>
                    <Link to="/myaccount/wd_lend/open" activeClassName='current' style={{width:'228px'}}>冻结中</Link>
                    <Link to="/myaccount/wd_lend/over" activeClassName='current' style={{width:'230px'}}>已结清（含已转让）</Link>
                    <Link to="/myaccount/wd_lend/drain" activeClassName='current' style={{width:'229px'}}>已流标</Link>
                </div>
                <div className="vertical-high-20"></div>
                {this.props.children}
            </div>          
		);
	}
});
module.exports={
	WdLendListBox
}