/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

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
}
