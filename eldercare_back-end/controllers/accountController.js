var express = require('express');

var accountRepo = require('../repos/accountRepo');

var md5 = require('crypto-js/md5')

var router = express.Router();

router.post('/addElder', (req, res) => {
    let elder = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        icid: req.body.icid,
        weight: 0,
        doctorPhoneNum: req.body.doctorPhoneNum
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


router.post('/updateWeight', (req, res ) => {
    let elderId = req.body.elderId,
        value = req.body.value;
    accountRepo.updateElderWeight(elderId, value).then(
        next => {
            req.json({
                msg: "update success!"
            })
        },
        err => res.json(err)
    )
})

router.post('/addNote', (req,res) => {
    let note = {
        elderId: req.body.elderId,
        time: req.body.time,
        title: req.body.title,
        script: req.body.script
    }
    accountRepo.addNote(note).then(
        next => {
            res.json({
                ...note,
                msg: "add note success"
            })
        },
        err => res.json(err)
    )
})

router.post("/removeNote", (req, res) => {
    let noteId = req.body.noteId;
    accountRepo.removeNote(noteId).then(
        next => {
            res.json({
                msg: "remove note success"
            })
        },
        err => res.json(err)
    )
})

router.post("/updateNote", (req,res) => {
    let note = {
        id: req.body.noteId,
        time: req.body.time,
        title: req.body.title,
        script: req.body.script
    };
    accountRepo.updateNote(note).then(
        next => {
            res.json({
                ...note,
                msg: "update note success"
            })
        },
        err => res.json(err)
    )
})

router.post('/elderDetail', (req, res) => {
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
        accountRepo.getAllPateintsId().then(
            listId => {
                if (listId && listId.includes(req.body.elder_id)) {
                   return res.json({
                        msg: "This Patient already have a main relative"
                    })
                }
                else {
                    accountRepo.addUser(user)
                    .then(result => {
                        console.log("User number", result ,"was added");
                        res.json(user);
                    })
                }
            }
        )
        
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
    accountRepo.elderDetail(elderId).then(
        elder => {
            if (elder[0].doctorNumPhone) {
               res.json({
                   doctorPhoneNum: elder[0].doctorNumPhone
               });
            } else {
                res.json({msg: 'no doctor phone number found with this patient!'})
            }
            
        },
        err => res.json(err)
    )
})
module.exports = router;