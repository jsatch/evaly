/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';
import EvaluationListToolbar from './EvaluationListToolbar.react';
import EvaluationListTable from './EvaluationListTable.react';



export default class EvaluationList extends React.Component{
  constructor(props) {
    super(props);
    this.evaluationSelectedId = -1;
  }
  render() {
    return (
      <div>
        <div>
          <EvaluationListToolbar
            onButtonEvaluationStartClicked={this.onButtonEvaluationStartClicked.bind(this)}/>
          </div>
        <div>
          <EvaluationListTable
            evaluationList={this.props.evaluationList}
            onEvaluationSelected={this.onEvaluationSelected.bind(this)}/>
        </div>
      </div>
    );
  }
  onButtonEvaluationStartClicked() {
    console.log("EvaluationList.react", "Debe iniciar la evaluacion " +
      this.evaluationSelectedId);
    (this.props.onEvaluationStart)(this.evaluationSelectedId);
  }
  onEvaluationSelected (rows){
    this.evaluationSelectedId = rows[0];
  }
}
