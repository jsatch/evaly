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
      teamPos: 0,
      status: ''
    }

    // Bindings for this
    this.saveEvaluationMark = this.saveEvaluationMark.bind(this);
    this.onEventsFinished = this.onEventsFinished.bind(this);
  }
  saveEvaluationMark(data) {
    this.setState({
      teamPos : this.state.teamPos,
      status: 'saving'
    });
    evaluationActions.saveEvaluationMarkAction(data);
  }
  onEventsFinished(){
    this.setState({
      teamPos : this.state.teamPos,
      status: 'saved'
    });
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
              parameters={this.props.eventConfig.parameters}
              team={this.props.eventConfig.teams[this.state.teamPos]}
              saveEvaluationMark={this.saveEvaluationMark}
              status={this.state.status}/>
          </Col>
          <Col md={4}>
            <EvaluationGroups
              teams={this.props.eventConfig.teams}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
