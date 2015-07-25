/*
 * Module dependencies
 */
import React from 'react';
import EvaluationListPage from './EvaluationListPage.react';

export default class EvalyApp extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <EvaluationListPage />
    );
  }
}
