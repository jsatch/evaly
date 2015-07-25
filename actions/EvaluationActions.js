/*
 * Module dependencies
 */
import Reflux from 'reflux';

export default Reflux.createActions({
  "listEvaluationsAction": {children: ["completed","failed"]},
  "startEvaluationAction": {children: ["completed","failed"]},
  'saveEvaluationMarkAction': {children: ["completed","failed"]},
  'getEvaluationDataAction': {children: ["completed","failed"]}
});
