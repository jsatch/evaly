/*
 * Module dependencies
 */
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import TopPart from './TopPart.react';
import EvaluationListContent from './EvaluationListContent.react';
import BottomPart from './BottomPart.react';
import Evaluation from './Evaluation.react';
import Mui from 'material-ui';

// Stores
import EvaluationStore from '../stores/EvaluationStore';

// Actions
import evaluationActions from '../actions/EvaluationActions';

var ThemeManager = new Mui.Styles.ThemeManager();
var Dialog = Mui.Dialog;

export default class EvaluationListPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      evaluationList: [],
      modal: false,
      eventConfig: null
    }
    this.onEvaluationsLoaded = this.onEvaluationsLoaded.bind(this);
  }
  onEvaluationsLoaded(data){
    if (data.event === EvaluationStore.events.EVALUATION_LOADED){
       this.setState({
         evaluationList: data.data,
         modal:false,
         eventConfig: null
       });
    }else if (data.event === EvaluationStore.events.START_EVALUATION){
        this.setState({
          evaluationList: [],
          modal:true,
          eventConfig: data.data
        });
    }

  }

  onEvaluationStart(evaluationId) {
    console.log("EvaluationListPage", evaluationId);
    evaluationActions.startEvaluationAction(evaluationId);
  }

  componentDidMount() {
    this.unsubscribeOnEvalutionLoaded = EvaluationStore.listen(
      this.onEvaluationsLoaded);
    //console.log("EvaluationListPage - EvaluationStore", EvaluationStore);
    //console.log("EvaluationListPage - listEvaluationsAction", listEvaluationsAction);
    (evaluationActions.listEvaluationsAction)();
  }
  render() {
    var dialog;
    if (this.state.modal){
      dialog = <Dialog
        ref="evaluationDialog"
        title="Evaluación"
        modal={true}
        openImmediately={true}>
        <Evaluation eventConfig={this.state.eventConfig}/>
      </Dialog>;
    }

    return (
      <div className="container">
        <TopPart></TopPart>
        <EvaluationListContent
          evaluationList={this.state.evaluationList}
          onEvaluationStart={this.onEvaluationStart.bind(this)}>
        </EvaluationListContent>
        <BottomPart></BottomPart>
        {dialog}
      </div>

    );
  }
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}

EvaluationListPage.childContextTypes = {
  muiTheme: React.PropTypes.object
};