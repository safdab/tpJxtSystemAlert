const express = require('express')
const router = express.Router()
const category = require('./../model/Category')
const status = require('./../model/Status')


let alertsModel = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!alertsModel) {
    res
      .status(500)
      .json({message: 'model not initialised'})
  }
  next()
})


// function addAlert(){
//     const al = new Alert();
//     al.id = "monID";
//     al.type = category.weather;
//     al.label = "Mon Premier Alert";
//     al.status = status.get(1);
//     al.from = "Now";
//     al.to = "tomorrow"
//     al.save.then((result) => {
//         console.log(result)
//     }).catch((err) => {
//         console.log("error "+ err);
//     });
// }


//get a specific alert by id
router.get('/:id', function(req, res, next){
    // addAlert();
    const id = req.params.id
    if(id){
        try{
        //    const alertFound =  alertsModel.get(id).exec(function(err, alerts) {
        //     console.log(alerts);
            alertsModel.get(id, (err, alertFound) => {

           if(alertFound){
               res.json(alertFound)
               res.status(200)
           } 
           else{
               res  
                  .status(404)
                  .json({message: `alert not found with id ${id}`})
           } 
          })
        }
        catch (exc){
            res.status(404)
            res.json({message: exc.message})
        }
    }
    else{
        res.status(400)
        res.json({message: "Invalid ID supplied"})
    }
})

// router.get('/', (req, res) =>{
//     // res.json(Alert.findById(req.params.id))
//     alertsModel.find(null, (err, mesAlerts)=>{
//         if(err) {throw err };
//         res.json({'alerts': mesAlerts});
//     })
//     res.json("alertsModel")

// })


//create a new alert in the alerts list
router.post('/alerts', (req, res) =>{
    const newAlert = req.body

    alertsModel.add(newAlert, (err, result) =>{
        if(err){
            console.log("result dans post " + result)
            res
               .status(405)
               .json("Invalid input")
        }
        else{
            console.log("result dans post " + result)
            res.status(200)
            res.json("successful operation ")
        }
    })
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const newAlertProperties = req.body
  
    /* istanbul ignore else */
    if (id && newAlertProperties) {
        alertsModel.update(id, newAlertProperties, (err, result) => {
            if (err) {
              if (err.message === "alert not found")
                res
                    .status(404)
                    .json({ message: err.message });
              else {
                res
                    .status(400)
                    .json({ message: err.message });
              }
            } else {
              res
                .status(200)
                .json({message:'Alert updated succesfully'});
            }
        });
    } else {
          res
            .status(405)
            .json({ message: 'wrong parameters' });
      }
      next()
})

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id
    if(id){
        alertsModel.remove(id, (err, results)=>{
            if(err) {
                res.status(404).json("Alert not found")
            }
            else{
                res.status(200).json("Alert successfully deleted")
            }
        })
    }
    else{
        res.status(400).json("Invalid ID supplied")
    }
})


function alertFound(alertFound){
    return {
        id: alertFound.id,
        type: alertFound.type,
        label : alertFound.label,
        status: alertFound.status,
        from: alertFound.from,
        to: alertFound.to 
    }
}

// router.post('/alerts', function(req, res, next){
//     const newAlert = red.body
    
// } )

/** return a closure to initialize model */
module.exports = (model) => {
    alertsModel = model
    return router
  }