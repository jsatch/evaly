/*
 * Module dependencies
 */
import Reflux from 'reflux';
import request from 'request';

import evaluationActions from '../actions/EvaluationActions'

// service URI
import config from '../../config';

var EvaluationStore = Reflux.createStore({
  events : {
    EVALUATION_LOADED: 'EVALUATION_LOADED',
    START_EVALUATION: 'START_EVALUATION',
    SAVE_EVALUATION_MARK: 'SAVE_EVALUATION_MARK',
    GET_EVALUATION_DATA: 'GET_EVALUATION_DATA'
  },
  init: function(){
    this.listenTo(evaluationActions.listEvaluationsAction,
      'onListEvaluationsAction');
    this.listenTo(evaluationActions.listEvaluationsAction.completed,
      'onListEvaluationsCompletedAction');
    this.listenTo(evaluationActions.startEvaluationAction ,
      'onLoadEvaluationAction');
    this.listenTo(evaluationActions.startEvaluationAction.completed,
      'onLoadEvaluationCompletedAction');
    this.listenTo(evaluationActions.saveEvaluationMarkAction,
      'onSaveEvaluationMarkAction');
    this.listenTo(evaluationActions.saveEvaluationMarkAction.completed,
      'onSaveEvaluationMarkCompletedAction');
    this.listenTo(evaluationActions.getEvaluationDataAction,
      'onGetEvaluationDataAction');
    this.listenTo(evaluationActions.getEvaluationDataAction.completed,
      'onGetEvaluationDataCompletedAction');
  },
  onListEvaluationsAction: function(){
    console.log("EvaluationStore", "Se hará conexión remota");
    // Se debe de hacer la conexión remota
    request.get(
      `${config.URL_REST_SERVICES}/evaluation`,
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          evaluationActions.listEvaluationsAction.completed(JSON.parse(body));
        }else{
          // TODO: Debe de poder manejarse el error
        }
      }
    );
  },
  onListEvaluationsCompletedAction: function(data){
    this.trigger({
      event: this.events.EVALUATION_LOADED,
      data: data
    });
  },
  onLoadEvaluationAction: function(idEval){
    request.get(
      `${config.URL_REST_SERVICES}/evaluation/${idEval}`,
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          console.log(JSON.parse(body));
          evaluationActions.startEvaluationAction.completed(JSON.parse(body));
        }else{
          // TODO: Debe de poder manejarse el error
        }
      }
    );
  },
  onLoadEvaluationCompletedAction: function(data){
    this.trigger({
      event: this.events.START_EVALUATION,
      data: data
    });
  },

  onSaveEvaluationMarkAction: function(evaluation){
    console.log("EvaluationStore.onSaveEvaluationMarkAction", evaluation);
    request.post({
        url: `${config.URL_REST_SERVICES}/evaluation`,
        json: evaluation
      },
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          evaluationActions.saveEvaluationMarkAction.completed({error: ''});
        }else{
          // TODO: Debe de poder manejarse el error
        }
      }
    );
  },
  onSaveEvaluationMarkCompletedAction: function(data){
    this.trigger({
      event: this.events.SAVE_EVALUATION_MARK,
      data: data
    });
  },
  onGetEvaluationDataAction: function(idEval, idTeam){
    console.log("EvaluationStore.onGetEvaluationDataAction", idTeam);

    request.get(
      `${config.URL_REST_SERVICES}/evaluation/${idEval}/${idTeam}`,
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          evaluationActions.getEvaluationDataAction.completed(JSON.parse(body));
        }else{
          // TODO: Debe de poder manejarse el error
        }
      }
    );

    /*evaluationActions.getEvaluationDataAction.completed({
      idEvaluation: idEval,
      team: {id:2, name: 'Los cuates'},
      parameters: [
        {id: 1, name: 'Dicción', min_range: 0, max_range: 5, weight: 0.5, value: 56},
        {id: 2, name: 'Programación', min_range: 0, max_range: 5, weight: 0.5, value: 44}
      ],
      teams:[
        {id:1, name: 'Grupo 5'},
        {id:2, name: 'Los cuates'},
      ]
    });*/
  },
  onGetEvaluationDataCompletedAction: function(data){
    this.trigger({
      event: this.events.GET_EVALUATION_DATA,
      data: data
    });
  }
});
export default EvaluationStore;
