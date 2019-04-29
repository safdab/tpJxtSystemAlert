const express = require('express')
const router = express.Router()
const alert = require('./../model/Alert')


//control usermodel initialisation
router.use((req, res, next) =>{
    if(!alert){
       res
        .status(500)
        .json({message: 'model not initialised'}) 
    }
    next()
})




//get a specific alert by id
router.get('/:id', function(req, res, next){
    const id = req.params.id
    if(id){
        try{
           const alertFound = alert.get(id)
           if(alertFound){
               res.json("successful operation")
               res.status(200)
           } 
           else{
               res  
                  .status(404)
                  .json({message: `alert not found with id ${id}`})
           } 
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

router.get('/', (req, res) =>{
    // res.json(alert)
    res.json("alertsModel")

})


//create a new alert in the alerts list
router.post('/alerts', (req, res) =>{
    const newAlert = new alert({
        id : req.body.id,
        type: req.body.type,
        label: req.body.label,
        status: req.body.status,
        from: req.body.from,
        to: req.body.to
    })

    //saving the new alert into the database
    newAlert.save().then((result) => {
        console.log(result)
        res.json('Alert created successfully ')
    }).catch((err) => {
        console.log("error "+ err);
    });

    
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

router.post('/alerts', function(req, res, next){
    const newAlert = red.body
    
} )

module.exports=router;