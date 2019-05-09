var express = require('express');

var accountRepo = require('../repos/accountRepo');

var md5 = require('crypto-js/md5')

var router = express.Router();
router.post('/addDoctor' , (req, res) => {
    try {
     let doctor = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        specializeIn: req.body.specializeIn,
        username: req.body.username,
        password: (req.body.password).toString()
     }
    accountRepo.addDoctor(doctor).then(
        next => {
            res.json(doctor);
        },
        err => {
            res.json(err)
        }
    )
    } catch (error) {
        
    }
})

router.post('/login', (req, res) => {
    try {
        var info = {
            username: req.body.username,
            password: (req.body.password).toString()
        };
        console.log(info)
        accountRepo.doctorLogin(info).then(
            doctor => {
                res.json(doctor);
            }
        )
    } catch (error) {
       res.json(error)
    }
})

router.get('/listDoctors', (req, res) => {
    accountRepo.getListDoctors().then(
        doctors => {
            res.json(doctors)
        },
        err => res.json(err)
    )
})


router.post('/addElder', (req, res) => {
    let elder = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        icid: req.body.icid,
        doctorId: req.body.doctorId,
        weight: req.body.weight,
        height: req.body.height
    }
    accountRepo.addElder(elder).then(
        next => {
            res.json({
                status: 200,
                message: 'Create Elder Success!'
            })
        },
        err => res.json(err)
    )
})

router.post('/listElders', (req, res) => {
    let doctorId = req.body.doctorId;
    accountRepo.getListElders(doctorId).then(
        elders => {
            res.json(elders);
        },
        err => res.json(err)
    )
})

router.post('/detailElder', (req, res) => {
    let elderId = req.body.elderId;
    accountRepo.elderDetail(elderId).then(
        elders => {
            res.json(elders[0]);
        },
        err => res.json(err)
    )
})
router.post('/listRelatives', (req,res) => {
    let elderId = req.body.elderId;

    accountRepo.getListRelatives(elderId).then(
        relatives => {
            res.json(relatives);
        },
        err => res.json(err)
    )

})

module.exports = router;