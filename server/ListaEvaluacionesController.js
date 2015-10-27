/*
 * Module dependencies
 */
import React from 'react';

var JSX = require('node-jsx').install({harmony: true});

//import EvalyApp from '../client/components/evaluations/EvalyApp.react';
import EvaluationListPage from '../client/components/evaluations/EvaluationListPage.react';

// Stores
import EvaluationStore from '../stores/EvaluationStore';

// Actions
import evaluationActions from '../actions/EvaluationActions';

export default class ListaEvaluacionesController {
  static show(req, res){
    console.log("SERVER:", "entra a ListaEvaluacionesController");

    var unsuscribe = EvaluationStore.listen((data) => {
      if (data.event === EvaluationStore.events.EVALUATION_LOADED){
        var reactHtml = React.renderToString(<EvaluationListPage evaluationList={data.data}/>);
        res.render('index.ejs', {
          reactOutput: reactHtml,
          state: JSON.stringify({
            evaluationList: data.data
          })
        });
        unsuscribe();
      }
    });

    (evaluationActions.listEvaluationsAction)();


  }
}
