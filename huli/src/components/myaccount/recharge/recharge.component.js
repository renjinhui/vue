const React = require('react')
const Link = require('react-router').Link;

//控制tab显示状态
export const rechargeMain = React.createClass({
    render(){
        return (
            <div className="myacoount-right-con lt">
                <div className="aside-area-content">
                    <div className="aside-right">
                        <div className="headline borrowing-tab">
                            <Link className='default-left-bg invest-tabs' to="/myaccount/recharge/Main" activeClassName="headline-current">充值</Link>
                            <Link className='default-left-bg invest-tabs' to="/myaccount/recharge/lc-history" activeClassName="headline-current">慧赚充值历史</Link>
                            <Link className='default-left-bg invest-tabs' to="/myaccount/recharge/wd-history" activeClassName="headline-current">搜易贷充值历史</Link>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})