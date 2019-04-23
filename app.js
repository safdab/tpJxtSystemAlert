const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')

//Definition des routeurs
const alertsRouter = require('./routes/alerts-v1')
const alertModel = require('./model/Alert')

const app = express();

app.use(helmet({noSniff: true}))

// Injection du model dans les routeurs. Ceci permet de supprimer
// la dépendance directe entre les routeurs et le modele
// app.use('/v1/alert', alertsRouter(alertModel))

exports.app = app