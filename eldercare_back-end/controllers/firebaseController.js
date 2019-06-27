var firebase = require('firebase');

var express = require('express'),
    router = express.Router();


router.post('/getCalories', (req, res, next ) => {
    if(firebase.apps.length > 0)
        next();
}, (req, res) => {
    let elderId = req.body.elderId;
    firebase.database().ref('Patients').child(elderId).child('Calories').once('value',
    calories  => {
        if (calories.val()) {
            console.log("data calories: ", calories.val())
            res.json({
                data: calories.val()
            });
        }else {
            res.json({
                msg: 'no data'
            })
        }
    },
    err => res.json(err)
    )
});

router.post('/getStepCounts', (req, res, next ) => {
    if(firebase.apps.length > 0)
        next();
}, (req, res) => {
    let elderId = req.body.elderId;
    firebase.database().ref('Patients').child(elderId).child('StepCounts').once('value',
    step  => {
        if (step.val()) {
           console.log(step.val())
            res.json({
                data: step.val()
            });
        }else {
            res.json({
                msg: 'no data'
            })
        }
    },
    err => res.json(err)
    )
});

router.post('/getHeartRates',(req, res, next) => {
    if(firebase.apps.length > 0)
        next();
}, (req, res) => {
    
    let elderId = req.body.elderId;
    firebase.database().ref('Patients').child(elderId).child('HeartRate').once('value', 
    heartRates => {
        if (heartRates.val()) {
            let bigArray = Object.values(heartRates.val());
            
            res.json({
                data: bigArray
            });
            console.log(bigArray.length);
        } else {
            res.json({
                msg: 'no data'
            })
        }
    }),
    err => res.json(err);
})
module.exports = router;