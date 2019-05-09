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


module.exports = router;