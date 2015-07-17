/*
 * Module dependencies
 */
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import EvaluationForm from './EvaluationForm.react';
import EvaluationGroups from './EvaluationGroups.react';

// Stores
import EvaluationStore from '../stores/EvaluationStore';

// Actions
import evaluationActions from '../actions/EvaluationActions';

export default class Evaluation extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      eventConfig: props.initialEventConfig,
      status: ''
    }

    // Bindings for this
    this.saveEvaluationMark = this.saveEvaluationMark.bind(this);
    this.onEventsFinished = this.onEventsFinished.bind(this);
    this.onTeamSelected = this.onTeamSelected.bind(this);
  }
  saveEvaluationMark(data) {
    this.setState({
      eventConfig : this.state.eventConfig,
      status: 'saving'
    });
    evaluationActions.saveEvaluationMarkAction(data);
  }
  onTeamSelected(pos){
    evaluationActions.getEvaluationDataAction(
      this.state.eventConfig.idEvaluation, pos);
  }
  onEventsFinished(data){
    if (data.event === EvaluationStore.events.SAVE_EVALUATION_MARK){
      this.setState({
        eventConfig : this.state.eventConfig,
        status: 'saved'
      });
    }else if (data.event === EvaluationStore.events.GET_EVALUATION_DATA){
      console.log(data.data);
      this.setState({
        eventConfig : data.data,
        status: ''
      });
    }

  }
  componentDidMount(){
    this.unsubscribe = EvaluationStore.listen(this.onEventsFinished);
  }
  render() {
    return (
      <Grid className="evaluation">
        <Row>
          <Col md={8}>
            <EvaluationForm
              initialParameters={this.state.eventConfig.parameters}
              team={this.state.eventConfig.team}
              saveEvaluationMark={this.saveEvaluationMark}
              status={this.state.status}/>
          </Col>
          <Col md={4}>
            <EvaluationGroups
              teams={this.state.eventConfig.teams}
              onTeamSelected={this.onTeamSelected}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
