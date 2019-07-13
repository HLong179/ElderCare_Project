var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

var schedule = require('node-schedule');
var app = express();
var firebase = require('firebase');
var socketIO = require('socket.io');
app.use(bodyParser.json());
app.use(cors());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 
 var accountController = require('./controllers/accountController');
 var medicineController = require('./controllers/medicineController');
 var firebaseController = require('./controllers/firebaseController');
 var mailer = require('./sendMail');
//  var healthIndexesController = require('./controllers/healthIndexesController');
 // default route







 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 console.log('hello')
 app.use('/account', accountController);
 app.use('/medicine', medicineController);
 app.use('/firebase',  firebaseController);

//  app.use('/healthIndexes', healthIndexesController);
 // set port
 const port = process.env.PORT || 6900;
 const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
var config = {
    apiKey: "AIzaSyBhkXtTybamYMmxnZU2aYdoHf2Hy2uH1DQ",
    authDomain: "eldercare-5e4c8.firebaseapp.com",
    databaseURL: "https://eldercare-5e4c8.firebaseio.com",
    projectId: "eldercare-5e4c8",
    storageBucket: "eldercare-5e4c8.appspot.com",
    messagingSenderId: "49718683704",
    appId: "1:49718683704:web:7deb43f5933fa2b3"
  };
firebase.initializeApp(config);






var io = socketIO(server);


let patientsRef = firebase.database().ref("Patients");
patientsRef.once("value", (snapshot) => {
    Object.keys(snapshot.val()).forEach(elderId => {
        patientsRef.child(elderId).child("Config").child("Interval").once("value", (interval) => {
            console.log("value interval of this elderID: ", elderId, interval.val())
            if (interval.val()) {
                console.log("we start schedule functions to get data");
                if (interval.val() <= 60) {
                    schedule.scheduleJob(`${elderId}`, `*/${interval.val()} * * * *`, () => {
                        console.log("elder with id: ", elderId, "get data from watch: ", new Date().getMinutes());
                        patientsRef.child(elderId).child("Config").child("ValueHeartRateTime").set(
                            new Date().getTime(), (e)=> {
                                if (e) {
                                    console.log(e);
                                }
                            }
                        )
                    })
                } else {
                    console.log("data hour: ", Math.round(interval.val()/60));
                    schedule.scheduleJob(`${elderId}`, `0 0 */${Math.round(interval.val()/60)} * * *`, () => {
                        console.log("elder with id: ", elderId, "get data from watch: ", new Date().getMinutes());
                        patientsRef.child(elderId).child("Config").child("ValueHeartRateTime").set(
                            new Date().getTime(), (e)=> {
                                if (e) {
                                    console.log(e);
                                }
                            }
                        )
                    })
                    
                }



               
            } else {
                console.log("elder does'nt have any interval time to get data so we get a default value interval 1 hour");
                patientsRef.child(elderId).child("Config").child("Interval").set(
                    60, (e) => {
                        if (e) {
                            console.log("e get error: ", e);
                        } else {
                            console.log("set interval default success");
                        }
                    }
                )
                schedule.scheduleJob(`${elderId}`, `*/60 * * * *`, () => {
                    console.log("elder with id: ", elderId, "get data from watch: ", new Date().getMinutes());
                    patientsRef.child(elderId).child("Config").child("ValueHeartRateTime").set(
                        new Date().getTime(), (e)=> {
                            if (e) {
                                console.log(e);
                            }
                        }
                    )
                })
            }
           
        })
    })
})



io.sockets.on('connection', (socket) => {
    console.log("a socket connected");
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on("data-interval", data=> {
       if ( schedule.scheduledJobs[data.elderId]) {
            console.log("we cancel this elder schedule")
            schedule.scheduledJobs[data.elderId].cancel();
            // schedule.scheduledJobs[data.elderId].re
       }
       if (data.value && data.value <= 60) {
        schedule.scheduleJob(`${data.elderId}`,`*/${data.value} * * * *`, () => {
            console.log("this time need to get data :))", new Date().getMinutes())
            firebase.database().ref('Patients').child(data.elderId).child("Config").child("ValueHeartRateTime").set(new Date().getTime(), (e) => {
                if (e) {
                    console.log("some thing wrong: ", e);
                }
            });
            })
        } else {
            schedule.scheduleJob(`${data.elderId}`, `0 0 */${Math.round(data.value/60)} * * *`, () => {
                console.log("elder with id: ", elderId, "get data from watch: ", new Date().getMinutes());
                patientsRef.child(elderId).child("Config").child("ValueHeartRateTime").set(
                    new Date().getTime(), (e)=> {
                        if (e) {
                            console.log(e);
                        }
                    }
                )
            })
        }
       
        
    })

    socket.on('stop-schedule', data => {
        if (schedule.scheduledJobs[data.elderId]) {
            schedule.scheduledJobs[data.elderId].cancel();
        }
    })
})

schedule.scheduleJob('SendMail', {hour: 18, minute: 45, dayOfWeek: 0}, () => {
    console.log("we send email");
    mailer.sendEmail();
})


schedule.scheduleJob('0 0 */2 * * *', () => {
    console.log("i need one things like that", new Date().getHours(), 'h', new Date().getMinutes());
})


schedule.scheduleJob('Tonghop', '*/5 * * * *', () => {
    console.log("all jobs now: ", Object.keys(schedule.scheduledJobs));
})

function getStepCounts  (elderId)  {
    firebase.database().ref("Patients").child(elderId).child("Config").child("ValueStepCountsTime").set(
        new Date().getTime(), (e) => {
            if (e) 
                console.log(e);
            else
            console.log("get stepcounts")
        }
    )
}

function getCalories (elderId) {
    firebase.database().ref("Patients").child(elderId).child("Config").child("ValueCaloriesTime").set(
        new Date().getTime(), (e) => {
            if (e) 
                console.log(e);
            else
            console.log("get calories")
        }
    )
}


function getMedicines (elderId) {
    var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
    medicinePath.set(new Date().getTime(), (e) => {
        if (e) {
            console.log('we get some error here: ', e);
        } else {
            console.log('set time medicine success')
        }
    })
}


var morning = schedule.scheduleJob( 'setMedicinesMorning','01 7 * * *', () => {
    var ref = firebase.database().ref('/Patients');
    ref.once("value", (snapshot) => {
        // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
        Object.keys(snapshot.val()).forEach(elderId => {
                getMedicines(elderId);
        });
    })
  })




  

var afternoon = schedule.scheduleJob('setMedicinesAfternoon','3O 10 * * *', () => {
    var ref = firebase.database().ref('/Patients');
    ref.once("value", (snapshot) => {
        // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
        Object.keys(snapshot.val()).forEach(elderId => {
            getCalories(elderId);
            getStepCounts(elderId);
            getMedicines(elderId);
        });
    })
  })


  
var eve = schedule.scheduleJob('setMedicinesEvening','37 17 * * *', () => {
    var ref = firebase.database().ref('/Patients');
    ref.once("value", (snapshot) => {
        // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
        Object.keys(snapshot.val()).forEach(elderId => {
            getCalories(elderId);
            getStepCounts(elderId);
            getMedicines(elderId);
        });
    })
  })


var endDate = schedule.scheduleJob('getTotalInTheEnd', '00 23 * * *', () => {
    var ref = firebase.database().ref('/Patients');
    ref.once("value", (snapshot) => {
        // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
        Object.keys(snapshot.val()).forEach(elderId => {
            getCalories(elderId);
            getStepCounts(elderId);
        });
    })
  });
