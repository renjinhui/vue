const React =require('react');
const ReactRouter = require('react-router');
const Route = ReactRouter.Route;
const IndexRedirect = ReactRouter.IndexRedirect;
const demo = require('../demo-component/');

function demoRouter(){
	return (
		<Route path="/demo"   component={demo.Demo}>
            <Route path="/demo/table" component={demo.TableList} />
            <Route path="/demo/tab" component={demo.TabList} />
            <Route path="/demo/modal" component={demo.PopupResult} />
        </Route>
	)
}

export { demoRouter }