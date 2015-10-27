import React from 'react';
import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { history } from 'react-router/lib/History';
import Mui from 'material-ui';

//import EvalyApp from './components/evaluations/EvalyApp.react'
import EvaluationListPage from './components/evaluations/EvaluationListPage.react'
import LoginPage from './components/login/LoginPage.react';

injectTapEventPlugin();

var Route = Router.Route;

var routes =(
  <Route path="/" handler={App}>
    <Route path="login" handler={LoginPage}/>
    <Route path="main" handler={EvaluationListPage}/>
  </Route>
);
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component{
  render(){
      <RouteHandler />
  }
};

Router.run(routes, Router.HistoryLocation, (Root) => {
  var initialState = JSON.parse(
    document.getElementById('initial-state').innerHTML);
  React.render(<Root initialState={initialState} />, document.getElementById('container'));
});
