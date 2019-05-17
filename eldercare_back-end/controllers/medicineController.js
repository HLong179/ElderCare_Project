var express = require('express');


var medicineRepo = require('../repos/medicineRepo');
var router = express.Router();

router.post('/addPrescription', (req, res) => {
    let prescription = {
        elderId: req.body.elderId,
        doctorId: req.body.doctorId,
        imageUrl: req.body.imageUrl,
        script: req.body.script
    }
    medicineRepo.addPrescription(prescription).then(
        pres => {
            res.json({
                ...prescription,
                msg: 'create prescription success!'
            })
        },
        err => res.json(err)
    )
})
router.post('/getPescription', (req, res) => {
    let elderId = req.body.elderId;
    medicineRepo.getPrescription(elderId).then(
        pres => {
            res.json(pres);
        },
        err => res.json(err)
    )
})
 
router.post('/updatePrescription', (req, res) => {
    let id = req.body.id;
    let dataChanged = {
        imageUrl: req.body.imageUrl,
        script: req.body.script
    }
    medicineRepo.updatePrescription(id, dataChanged).then(
        next => {
            res.json({
                ...dataChanged,
                msg: 'update prescription success!'
            })
        },
        err => res.json(err)
    )
})

module.exports = router;