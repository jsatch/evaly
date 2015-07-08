/*
 * Module dependencies
 */
import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Menubar from './Menubar.react'
import EvaluationList from './EvaluationList.react'

export default class EvaluationListContent extends React.Component{
  render() {
    return (
      <Grid className="evaluation-list-content">
        <Row>
          <Col md={2}>
            <Menubar/>
          </Col>
          <Col md={10}>
            <EvaluationList
              evaluationList={this.props.evaluationList}
              onEvaluationStart={this.props.onEvaluationStart}
              />
          </Col>
        </Row>
      </Grid>
    );
  }
}
