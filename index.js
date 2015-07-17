/*
 * Module dependencies
 */

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

import config from './config';
import routes from './server/routes';

const port = 3000;
const app = express();

var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

// Configuramos las rutas dinamicas de nuestro proyecto
for (var key in routes){
  console.log("SER:", key);
  app.get(key, routes[key]);
}

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
            colParameters.find(
              {
                evaluationId: req.params.idEvaluation
              }
            ).each((err, docParam) => {
              if (err) {
                console.log("error: ", err);
              }else{
                if (docParam != null){
                  var elem = {
                      id : docParam._id,
                      name: docParam.name,
                      max_range: docParam.max_range,
                      min_range: docParam.min_range,
                      weight: docParam.weight,
                      value: 0
                  };
                  arrParameters.push(elem);

                }else{
                  arrParameters.forEach((param, index) => {
                    var colValues = db.collection('value');
                    console.log("TID:", arrTeams[0].id);
                    console.log("PID:", param.id.toHexString());
                    colValues.findOne({
                      teamId: arrTeams[0].id.toHexString(),
                      parameterId: param.id.toHexString()
                    }, (err, elemento) => {
                      if (err) {
                        console.log(err);
                      } else if (elemento) {
                        param.value = elemento.value;
                        if (index == arrParameters.length-1){
                          // es el ultimo
                          console.log("Paramas2:" , arrParameters);
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
            var colValues = db.collection('value');
            colValues.findOne({
              teamId: req.params.idTeam,
              parameterId: doc._id.toHexString()
            }, (err, elemento) => {
              if (err) {
                console.log(err);
              } else if (elemento) {
                arrParameters.push({
                    id : doc._id,
                    name: doc.name,
                    max_range: doc.max_range,
                    min_range: doc.min_range,
                    weight: doc.weight,
                    value: elemento.value
                });
              }else{
                console.log("No hay una valor con esos valores");
              }
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
});

// Post a evaluation scores
app.post('/evaluation', (req, res) => {
  console.dir(req.body);
  MongoClient.connect(config.URL_MONGODB, (err, db) => {
    if (err) {
      console.log('No es posible conectarse al servidor mongodb. Error:', err);
      res.json({error: err});
    }else{
      var teamId = req.body.teamId;
      var colValues = db.collection('value');

      req.body.parameters.forEach((param)=>{
        colValues.update({
            parameterId: param.parameterId,
            teamId: req.body.teamId
          }, {
            $set: {value: param.value}
          }, {
            upsert:true, w: 1
          }, function(err, result) {
            if (err){
              console.log('Error al actualizar el parametro.value: ', err);
            }else{
              res.json({});
            }
          }
        );
      });
    }
  });

});
