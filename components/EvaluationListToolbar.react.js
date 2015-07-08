/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var Toolbar = Mui.Toolbar;
var ToolbarGroup = Mui.ToolbarGroup;
var IconButton = Mui.IconButton;
var ToolbarSeparator = Mui.ToolbarSeparator;
var RaisedButton = Mui.RaisedButton;

export default class EvaluationListToolbar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="right">
          <ToolbarSeparator/>
          <RaisedButton label="Entrar"
            primary={true}
            onClick={this.props.onButtonEvaluationStartClicked}/>
          <RaisedButton label="Modificar" primary={true} />
          <RaisedButton label="Crear" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
