/*
 * Module dependencies
 */

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

import config from './config';

const port = 3000;
const app = express();

var MongoClient = mongodb.MongoClient;

// Configurar la ruta de archivos estaticos
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res ) => {
    res.sendFile(__dirname + '/index.html');
});

let server = http.createServer(app).listen(port, () =>{
    console.log(`El servidor esta escuchando en el puerto ${port}`);
});

/*
 * API REST
 */

// Get a list of evaluations
app.get('/evaluation', (req, res) => {
  MongoClient.connect(config.URL_MONGODB, (err, db) => {
    if (err) {
      console.log('No es posible conectarse al servidor mongodb. Error:', err);
      res.json({error: err});
    } else {
      var colEvaluations = db.collection('evaluation');

      var arrEvaluations = [];
      colEvaluations.find().each((err, doc) => {
        if (err) {
          console.log("error: ", err);
        }else{
          if (doc != null){
            arrEvaluations.push({id : doc._id, name: doc.name, status: doc.status});
          }else{
            res.json(arrEvaluations);
          }
        }
      });
    }
  });

});

// Get info from evaluation (start)
app.get('/evaluation/:idEvaluation', (req, res) => {
  MongoClient.connect(config.URL_MONGODB, (err, db) => {
    if (err) {
      console.log('No es posible conectarse al servidor mongodb. Error:', err);
      res.json({error: err});
    } else {
      var colParameters = db.collection('parameter');
      var colTeams = db.collection('team');

      var arrParameters = [];
      var arrTeams = [];
      colParameters.find(
        {evaluationId: req.params.idEvaluation}
      ).each((err, doc) => {
        if (err) {
          console.log("error: ", err);
        }else{
          if (doc != null){
            arrParameters.push({
                id : doc._id,
                name: doc.name,
                max_range: doc.max_range,
                min_range: doc.min_range,
                weight: doc.weight,
                value: 0
            });
          }else{
            // Getting teams
            colTeams.find({evaluationId: req.params.idEvaluation}).each((err, doc) => {
              if (err) {
                console.log("error: ", err);
              }else{
                if (doc != null){
                  arrTeams.push({
                    id: doc._id,
                    name: doc.name
                  });
                }else{
                  // Building json to send
                  res.json({
                    idEvaluation: req.params.idEvaluation,
                    team: arrTeams[0],
                    parameters: arrParameters,
                    teams: arrTeams
                  });
                }
              }
            });
          }
        }
      });
    }
  });

});

// Get info from evaluation and a team
app.get('/evaluation/:idEvaluation/:idTeam', (req, res) => {
  // parameter: 559eadf6e4b0075ae55ed919
  // team : 559eb239e4b0075ae55ed92e
  //        559eb260e4b0075ae55ed92f
  //        559eb26de4b0075ae55ed930
  MongoClient.connect(config.URL_MONGODB, (err, db) => {
    if (err) {
      console.log('No es posible conectarse al servidor mongodb. Error:', err);
      res.json({error: err});
    } else {
      var colParameters = db.collection('parameter');
      var colTeams = db.collection('team');
      var colValues = db.collection('value');

      var arrParameters = [];
      var arrTeams = [];

      var team;

      colParameters.find(
        {
          evaluationId: req.params.idEvaluation
        }
      ).each((err, doc) => {
        if (err) {
          console.log("error: ", err);
        }else{
          if (doc != null){
            colValues.findOne({
              parameterId: doc._id,
              teamId: req.params.idTeam
            }, (err, elemento) => {
              console.log("elemento", elemento);
              arrParameters.push({
                  id : doc._id,
                  name: doc.name,
                  max_range: doc.max_range,
                  min_range: doc.min_range,
                  weight: doc.weight,
                  value: elemento.value
              });
            });
          }else{
            // Getting teams
            colTeams.find({evaluationId: req.params.idEvaluation}).each((err, doc) => {
              if (err) {
                console.log("error: ", err);
              }else{
                if (doc != null){
                  if (doc._id == req.params.idTeam){
                    team = {id: doc._id,name: doc.name}
                  }
                  arrTeams.push({
                    id: doc._id,
                    name: doc.name
                  });
                }else{
                  // Building json to send
                  res.json({
                    idEvaluation: req.params.idEvaluation,
                    team: team,
                    parameters: arrParameters,
                    teams: arrTeams
                  });
                }
              }
            });
          }
        }
      });
    }
  });


  // res.json({
  //   idEvaluation: req.params.idEvaluation,
  //   team: {id:req.params.idTeam, name: 'Xuatinos'},
  //   parameters: [
  //     {id: 1, name: 'Dicción', min_range: 0, max_range: 5, weight: 0.5, value: 4},
  //     {id: 2, name: 'Programación', min_range: 0, max_range: 5, weight: 0.5, value: 4}
  //   ],
  //   teams:[
  //     {id:1, name: 'Grupo 7'},
  //     {id:2, name: 'Los cuatinhos'},
  //   ]
  // });
});

// Post a evaluation scores
app.post('/evaluation', (req, res) => {
  console.dir(req.body);
  res.json({});
});
