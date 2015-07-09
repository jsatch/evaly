/*
 * Module dependencies
 */

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();

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
  res.json([
    {id : 1, name: 'Evaluacion 1', status: 'Iniciado'},
    {id : 2, name: 'Evaluacion 2', status: 'Por Iniciar'},
    {id : 3, name: 'Evaluacion 3', status: 'Finalizado'},
    {id : 4, name: 'Evaluacioncita 4', status: 'Iniciado'}
  ]);
});

// Get info from evaluation (start)
app.get('/evaluation/:idEvaluation', (req, res) => {
  res.json({
    idEvaluation: req.params.idEvaluation,
    team: {id:1, name: 'Grupo 7'},
    parameters: [
      {id: 1, name: 'Dicción', min_range: 0, max_range: 5, weight: 0.5, value:0},
      {id: 2, name: 'Programación', min_range: 0, max_range: 5, weight: 0.5, value:0}
    ],
    teams:[
      {id:1, name: 'Grupo 7'},
      {id:2, name: 'Los cuatinhos'},
    ]
  });
});

// Get info from evaluation and a team
app.get('/evaluation/:idEvaluation/:idTeam', (req, res) => {
  res.json({
    idEvaluation: req.params.idEvaluation,
    team: {id:req.params.idTeam, name: 'Xuatinos'},
    parameters: [
      {id: 1, name: 'Dicción', min_range: 0, max_range: 5, weight: 0.5, value: 4},
      {id: 2, name: 'Programación', min_range: 0, max_range: 5, weight: 0.5, value: 4}
    ],
    teams:[
      {id:1, name: 'Grupo 7'},
      {id:2, name: 'Los cuatinhos'},
    ]
  });
});

// Post a evaluation scores
app.post('/evaluation', (req, res) => {
  console.dir(req.body);
  res.json({});
});
