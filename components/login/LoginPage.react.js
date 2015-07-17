/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var TextField = Mui.TextField;
var FlatButton = Mui.FlatButton;

var ThemeManager = new Mui.Styles.ThemeManager();

export default class LoginPage extends React.Component{

  render() {
    return (
      <div className='login'>
        <TextField
          ref="usuario"
          hintText="Ingrese su usuario"/>
        <TextField
          ref="password"
          hintText="Ingrese su password"/>
        <FlatButton
          label="Guardar"
          primary={true} />
      </div>
    );
  }
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}

LoginPage.childContextTypes = {
  muiTheme: React.PropTypes.object
};
