import React from 'react';
import Router from 'react-router';
import { history } from 'react-router/lib/History';
import Mui from 'material-ui';

import EvalyApp from './components/EvalyApp.react'
import LoginPage from './components/login/LoginPage.react';


/*React.render((
  <Router history={history}>
    <Route path="/" handler={LoginPage}>
      <Route path="/main" handler={EvalyApp}/>
    </Route>
  </Router>
), document.getElementById('container'));*/

//React.render(<EvalyApp/>, document.getElementById('container'));

var Route = Router.Route;

var routes =(
  <Route path="/" handler={App}>
    <Route path="login" handler={LoginPage}/>
    <Route path="main" handler={EvalyApp}/>
  </Route>
);
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component{
  render(){
    <div>
      <RouteHandler />
    </div>
  }
};

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('container'));
});
