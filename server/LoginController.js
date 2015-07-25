/*
 * Module dependencies
 */
import React from 'react';

//var JSX = require('node-jsx').install({harmony: true});

import LoginPage from '../client/components/login/LoginPage.react';

export default class LoginController {
  static show(req, res){
    console.log("SERVER:", "entra a LoginController");

    var reactHtml = React.renderToString(<LoginPage />);
    res.render('index.ejs', {reactOutput: reactHtml});
  }
}
