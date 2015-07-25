/*
 * Module dependencies
 */
import LoginController from './LoginController';
import ListaEvaluacionesController from './ListaEvaluacionesController';

export default {
  '/login' : LoginController.show,
  '/main' : ListaEvaluacionesController.show
};
