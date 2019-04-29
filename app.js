const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose');


//Definition des routeurs
const alertsRouter = require('./routes/alerts-v1')
const alertModel = require('./model/Alert')

const app = express();

mongoose.Promise = global.Promise;
// //set up connection to the database
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:3000/alertSchema";

// MongoClient.connect(url, function(err, db) {
//   if (err){
//     console.log("Error " + err);

//   };
//   console.log("Database created!");
//   db.close();
// });


// Set up mongoose connection
let dev_db_url = "mongodb://localhost:3000/alertSchema";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
    .connect(mongoDB, {useMongoClient: true })
    .then(function(){
    console.log('Database connected. ');
    })

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(helmet({noSniff: true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
// app.use('/', (req, res)=>{
//     res.json({message: "bienvenus !!!"})
// });

app.use('/v1/alerts', alertsRouter)

// Injection du model dans les routeurs. Ceci permet de supprimer
// la dépendance directe entre les routeurs et le modele
// app.use('/v1/alert', alertsRouter(alertModel))

exports.app = app


