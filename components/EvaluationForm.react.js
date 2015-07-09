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
    this.state = {
      parameters : props.initialParameters
    };
  }

  _handleInputChange(parameterId){

    var value = this.refs["parameter_" + parameterId].getValue();
    this.state.parameters.forEach((parameter) => {
      if (parameter.id === parameterId){
        parameter.value = value;
        return;
      }
    });
    this.setState({
      parameters : this.state.parameters
    });
  }
  componentWillReceiveProps (nextProps){
    this.setState({
      parameters: nextProps.initialParameters
    });
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
          this.state.parameters.map((parameter) => {
            return <p key={parameter.id}>
              <label>{parameter.name} - ({parameter.weight})</label>
              <TextField
                ref={"parameter_" + parameter.id}
                value={parameter.value === 0 ? null : parameter.value}
                onChange={this._handleInputChange.bind(this, parameter.id)}/>
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
    this.state.parameters.forEach((parameter) => {
      parameters.push({
        parameterId: parameter.id,
        value: this.refs["parameter_" + parameter.id].getValue()
      });
    });
    this.props.saveEvaluationMark({
      teamId: this.props.team.id,
      parameters: parameters
    });
  }
}
