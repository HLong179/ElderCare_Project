var express = require('express');


var medicineRepo = require('../repos/medicineRepo');
var router = express.Router();

router.post('/addMedicine', (req, res) => {
    let medicine = {
        elderId: req.body.elderId,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        script: req.body.script,
        morning: req.body.morning,
        afternoon: req.body.afternoon,
        evening: req.body.evening
    }
    medicineRepo.addMedicine(medicine).then(
        pres => {
            res.json({
                ...medicine,
                msg: 'create prescription success!'
            })
        },
        err => res.json(err)
    )
})
router.post('/getMedicinesByTime', (req, res) => {
    let elderId = req.body.elderId;
    let time = req.body.time;
    medicineRepo.getMedicineOfPatientByTime(elderId, time).then(
        listMedicines => {
            res.json(listMedicines);
        },
        err => res.json(err)
    )
})

router.post('/updateMedicine', (req, res) => {
    let elderId = req.body.elderId;
    let dataChanged = {
        imageUrl: req.body.imageUrl,
        script: req.body.script,
        name: req.body.name,
        morning: req.body.morning,
        afternoon: req.body.afternoon,
        evening: req.body.evening
    }
    medicineRepo.updateMedicine(elderId, dataChanged).then(
        next => {
            res.json({
                ...dataChanged,
                msg: 'update medicine success!'
            })
        },
        err => res.json(err)
    )
})

module.exports = router;