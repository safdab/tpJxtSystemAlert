const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category=require("./Category")
const Status=require("./Status")
const uuidv1 = require('uuid/v1')

const alertSchema = new Schema({
   id: {type: String, required: false}, 
   type: {type: Category, required: true},
   label : {type: String, required: true},
   status : {type: Status, required: true},
   from : {type: String, required: true},
   to : {type: String, required: true}
})

mongoose.set('useFindAndModify', false);

const Alert =  mongoose.model('Alert', alertSchema);
module.exports = Alert;



const add = (alert, callback) =>{
   const monAlert = {
      ...alert
      // ,id: uuid1()
   }
  const newAlert = new Alert(monAlert)
  newAlert.save().then((result) => {
      callback(null, result)
  }).catch((err) =>{
     callback(err, null)
  })
}


const get = (alertId, callback) => {
   Alert.find({id: alertId}, (err, alert) =>{
      err ? callback(err, null) : callback(null, alert)
   })
}


const update = (id, newAlertProperties, callback) => {
   Alert.findOneAndUpdate({id: id},
      newAlertProperties, {new: true}, 
      (err, alert) =>{
         if(err) callback(err, null)
         else{
            callback(null, alert)
         }
      }
   )
}

const remove = (id, callback) => {
   Alert.findOneAndDelete({id: id}, (err, result)=>{
      if(err) callback(err, null)
      else{
         callback(null, result)
      }
   })
}


const getFromCriterias = (criteria,callback) => {
   Alert.find({status:{$in:criteria}},(err,alert)=>{
   err ? callback(err,null): callback(null,alert)
   })
  };



module.exports.get = get
module.exports.add = add
module.exports.update = update
module.exports.remove = remove
module.exports.getFromCriterias = getFromCriterias