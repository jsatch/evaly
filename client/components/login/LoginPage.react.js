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
        <form>
          <div>
          <TextField
            ref="usuario"
            hintText="Ingrese su usuario"/>
          </div>
          <div>
          <TextField
            ref="password"
            hintText="Ingrese su password"/>
          </div>
          <div>
          <FlatButton
            label="Guardar"
            primary={true} />
          </div>
        </form>
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
