const React = require('react');

export const partNin = React.createClass({
    render(){
        return (
            <div className="forget stepend">
                <div className="endImg"></div>
                <h3 className="sucInfo">密码重置成功，请重新登录</h3>
                <p className="sucEnd">页面2秒后将自动跳转，若无跳转<a className="link-blue" href="https://passport.huli.com/">点击这里</a></p>
            </div>
        )
    },
    componentWillMount(){
        window.setTimeout(function () {
            location.href= 'https://passport.huli.com/';
        },2000)
    }
})