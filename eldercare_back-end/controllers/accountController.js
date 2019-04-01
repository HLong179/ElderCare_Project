var express = require('express');

var accountRepo = require('../repos/accountRepo');

var md5 = require('crypto-js/md5')

var router = express.Router();

router.post('/addUser', (req, res) => {
    try {
        var user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            username: req.body.username,
            password: md5(req.body.password).toString()
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
            password: md5(req.body.password).toString()
        };
        accountRepo.getUserByUsername(info.username)
        .then((user, err) => {
            if (err) {
               return res.status(500).send("[LOGIN] Something went wrong!");
            }
            if (!user) {
                return res.status(404).send("[LOGIN] No user found");
            }
            if (info.password === user[0].rlPassword) {
                res.status(200).send({
                    auth: true,
                    curUser: user
                })
            }
            else {
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
module.exports = router;