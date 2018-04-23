const React =require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const IndexRedirect = require('react-router').IndexRedirect;
const IndexRoute = require('react-router').IndexRoute;


const CurDepositListBox = React.createClass({

	
	render:function(){
		
		return(
			<div className='hq-bt' > 
				<div className="hq-nav-tabs">
          <ul>
            <li >
            	<Link to="/myaccount/cur_deposit/income" activeClassName='active' className="cf">
            	收益中
            	</Link>
          	</li>
            <li>
            	<Link to="/myaccount/cur_deposit/mksure" activeClassName='active' className="cf ">
            	确认中
            	</Link>
            </li>
            <li>
            	<Link to="/myaccount/cur_deposit/output" activeClassName='active' className="cf ">
            	已转出
            	</Link>
            </li>
            <li className=''>
            	<Link to="/myaccount/cur_deposit/revoke" activeClassName='active' className="cf ">
            	已撤销
            	</Link>
            </li>
          </ul>
        </div>	
        {this.props.children}
			</div>
		);
	}
});
module.exports={
	CurDepositListBox
}