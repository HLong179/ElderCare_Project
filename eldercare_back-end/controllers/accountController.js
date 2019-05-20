var express = require('express');

var accountRepo = require('../repos/accountRepo');

var md5 = require('crypto-js/md5')

var router = express.Router();

router.post('/addMainUser', (req, res) => {
    try {
        var user = {
            elder_id: req.body.elder_id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            username: req.body.username,
            password: (req.body.password).toString(),
            permission: "Main"
        };
        accountRepo.addUser(user)
        .then(result => {
            console.log("User number", result ,"was added");
            res.json(user);
        })
    }
    catch (err) {
        console.log(">>>>> Error:", err);
    }
})



router.post('/addSubUser', (req, res) => {
    try {
        var user = {
            elder_id: req.body.elder_id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            username: req.body.username,
            password: (req.body.password).toString(),
            permission: "Sub"
        };
        accountRepo.addUser(user)
        .then(result => {
            console.log("User number", result ,"was added");
            res.json(user);
        })
    }
    catch (err) {
        console.log(">>>>> Error:", err);
    }
})

router.post('/login', (req, res) => {
    try {
        var info = {
            username: req.body.username,
            password: (req.body.password).toString()
        };
        accountRepo.getUserByUsername(info.username)
        .then((user, err) => {
            if (err) {
                console.log(err)
               return res.status(500).send("[LOGIN] Something went wrong!");
            }
            if (!user || user.length === 0) {
                console.log('No user found')
                return res.status(404).send({message: "[LOGIN] No user found"});
            }
            if (info.password === user[0].rlPassword) {
               console.log('data login: ', user)
                return res.status(200).send({
                    auth: true,
                    curUser: user
                })
            }
            else {
                console.log(info)
                res.status(401).send({
                    auth: false,
                    message: "Wrong password"
                })
            }
        })
    }
    catch (err) {
        console.log(">>>>> Error:", err);
    }
})


router.post('/getDoctorPhoneNum', (req, res) => {
    let elderId = req.body.elderId;
    accountRepo.getElderInformation(elderId).then(
        elder => {
            if (elder[0].doctorId) {
                accountRepo.getDoctorPhoneNumber(elder[0].doctorId).then(
                    numPhone => {
                        res.json({
                            doctorPhoneNum: numPhone
                        });
                    },
                    except => res.json(except)
                )
            } else {
                res.json({msg: 'no doctor found with this patient!'})
            }
            
        },
        err => res.json(err)
    )
})
module.exports = router;