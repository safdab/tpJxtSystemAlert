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

const Alert =  mongoose.model('Alert', alertSchema);
module.exports = Alert;





const add = (alert, callback) =>{
   const monAlert = {
      ...alert,
      id: uuid1()
   }
  const newAlert = new Alert(monAlert)
  newAlert.save.then((err, result) => {
      if(err) callback(new Error("Alert not saved"), null)
      else{
         callback(null, result)
      }
  })
}


const get = (alertId, callback) => {
   Alert.find({id: alertId}, (err, alert) =>{
      // if(err) return callback(err, null)
      // return callback(null, alert);
      err ? callback(err, null) : callback(null, alert)
   })
}


const update = (id, newAlertProperties) => {
   Alert.findOneAndUpdate({id: id},
      newAlertProperties, {new: true}, 
      (err, alert) =>{
         if(err) throw new Error("Alert non mise a jour !")
         else{
            console.log("Alert ajouté "+alert)
         }
      }
   )
}

const remove = (id) => {

}



// Export the model

module.exports.get = get
module.exports.add = add
module.exports.update = update
module.exports.remove = remove