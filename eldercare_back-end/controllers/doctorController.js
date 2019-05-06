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
        password: md5(req.body.password).toString()
     }
    accountRepo.addDoctor(doctor).then(
        next => {
            res.json(doctor);
        },
        err => {
            console.log(err)
        }
    )
    } catch (error) {
        
    }
})




router.post('/login', (req, res) => {
    try {
        var info = {
            username: req.body.username,
            password: md5(req.body.password).toString()
        };
        accountRepo.doctorLogin(info).then(
            doctor => {
                res.json(doctor);
            }
        )
    } catch (error) {
        console.log(error)
    }
})

router.get('/listDoctors', (req, res) => {
    accountRepo.getListDoctors().then(
        doctors => {
            res.json(doctors)
        },
        err => console.log(err)
    )
})

module.exports = router;