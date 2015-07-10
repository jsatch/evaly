import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/History';

import EvalyApp from './components/EvalyApp.react'
import LoginPage from './components/login/LoginPage.react';

/*React.render((
  <Router history={history}>
    <Route path="/" handler={LoginPage}>
      <Route path="/main" handler={EvalyApp}/>
    </Route>
  </Router>
), document.getElementById('container'));*/

React.render(<EvalyApp/>, document.getElementById('container'));
