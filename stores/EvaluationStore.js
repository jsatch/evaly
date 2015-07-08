/*
 * Module dependencies
 */
import Reflux from 'reflux';

import evaluationActions from '../actions/EvaluationActions'

var EvaluationStore = Reflux.createStore({
  events : {
    EVALUATION_LOADED: 'EVALUATION_LOADED',
    START_EVALUATION: 'START_EVALUATION',
    SAVE_EVALUATION_MARK: 'SAVE_EVALUATION_MARK'
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
      'onSaveEvaluationMarkCompletedAction')
  },
  onListEvaluationsAction: function(){
    console.log("EvaluationStore", "Se hará conexión remota");
    // Se debe de hacer la conexión remota
    evaluationActions.listEvaluationsAction.completed([
      {id : 1, name: 'Evaluacion 1', status: 'Iniciado'},
      {id : 2, name: 'Evaluacion 2', status: 'Por Iniciar'},
      {id : 3, name: 'Evaluacion 3', status: 'Finalizado'},
      {id : 4, name: 'Evaluacion 4', status: 'Iniciado'}
    ]);
  },
  onListEvaluationsCompletedAction: function(data){
    this.trigger({
      event: this.events.EVALUATION_LOADED,
      data: data
    });
  },
  onLoadEvaluationAction: function(idEval){
    evaluationActions.startEvaluationAction.completed({
      parameters: [
        {id: 1, name: 'Dicción', min_range: 0, max_range: 5, weight: 0.5},
        {id: 2, name: 'Programación', min_range: 0, max_range: 5, weight: 0.5}
      ],
      teams:[
        {id:1, name: 'Grupo 5'},
        {id:2, name: 'Los cuates'},
      ]
    });
  },
  onLoadEvaluationCompletedAction: function(data){
    this.trigger({
      event: this.events.START_EVALUATION,
      data: data
    });
  },

  onSaveEvaluationMarkAction: function(evaluation){
    console.log("EvaluationStore.onSaveEvaluationMarkAction", evaluation);
    evaluationActions.saveEvaluationMarkAction.completed({
      error: ''
    });
  },
  onSaveEvaluationMarkCompletedAction: function(data){
    this.trigger({
      event: this.events.SAVE_EVALUATION_MARK,
      data: data
    });
  }
});
export default EvaluationStore;
