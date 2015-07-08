/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var TextField = Mui.TextField;
var FlatButton = Mui.FlatButton;

export default class EvaluationForm extends React.Component{
  constructor(props){
    super(props);
    this.saveEvaluation = this.saveEvaluation.bind(this);
  }

  render() {
    var progress;
    if (this.props.status == 'saving'){
      progress = 'guardando...';
    }else if (this.props.status == 'saved'){
      progress = 'guardado';
    }
    return (
      <div className="evaluation-form">
        <h3>{this.props.team.name}</h3>
        {
          this.props.parameters.map((parameter) => {
            return <p key={parameter.id}>
              <label>{parameter.name} - ({parameter.weight})</label>
              <TextField ref={"parameter_" + parameter.id} hintText="Ingrese su calificación" />
            </p>
          })
        }
        <p>
          <FlatButton
            label="Guardar"
            secondary={true}
            onClick={this.saveEvaluation} />
          {progress}
        </p>
      </div>
    )
  }

  saveEvaluation() {
    var parameters = [];
    this.props.parameters.forEach((parameter) => {
      parameters.push({
        parameterId: parameter.id,
        mark: this.refs["parameter_" + parameter.id].getValue()
      });
    });
    this.props.saveEvaluationMark({
      teamId: this.props.team.id,
      parameters: parameters
    });
  }
}
