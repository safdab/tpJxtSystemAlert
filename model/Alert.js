const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category=require("./Category")
const Status=require("./Status")

const alertSchema = new Schema({
   id: {type: String, required: false}, 
   type: {type: Category, required: true},
   label : {type: String, required: true},
   status : {type: Status, required: true},
   from : {type: String, required: true},
   to : {type: String, required: true}
})

const add = (user) => {
    
}
const get = (id) => {

}

const getAll = () =>{

}

const update = (id, newAlertProperties) => {

}

const remove = (id) => {

}


// Export the model
module.exports = mongoose.model('Alert', alertSchema);

