/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var Menu = Mui.Menu;

export default class Menubar extends React.Component{
  constructor(props) {
    super(props);
    this.nestedMenuItems = [
      { payload: '1', text: 'Evaluaciones'},
      { payload: '2', text: 'Quiénes somos'},
    ];
  }
  render() {
    return (
      <Menu menuItems={this.nestedMenuItems} autoWidth={false}/>
    );
  }
}
