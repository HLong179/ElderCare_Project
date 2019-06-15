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
 var mailer = require('./sendMail');
//  var healthIndexesController = require('./controllers/healthIndexesController');
 // default route







 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 console.log('hello')
 app.use('/account', accountController);
 app.use('/medicine', medicineController);

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






// var io = socketIO(server);


// let patientsRef = firebase.database().ref("Patients");
// patientsRef.once("value", (snapshot) => {
//     Object.keys(snapshot.val()).forEach(elderId => {
//         patientsRef.child(elderId).child("Config").child("Interval").once("value", (interval) => {
//             console.log("value interval of this elderID: ", elderId, interval.val())
//             if (interval.val()) {
//                 console.log("we start schedule functions to get data");
//                 schedule.scheduleJob(`${elderId}`, `*/${interval.val()} * * * *`, () => {
//                     console.log("elder with id: ", elderId, "get data from watch: ", new Date().getMinutes());
//                     patientsRef.child(elderId).child("Config").child("ValueTime").set(
//                         new Date().getTime(), (e)=> {
//                             if (e) {
//                                 console.log(e);
//                             }
//                         }
//                     )
//                 })
//             } else {
//                 console.log("elder does'nt have any interval time to get data");
//             }
           
//         })
//     })
// })



// io.sockets.on('connection', (socket) => {
//     console.log("a socket connected");
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
//     socket.on("data-interval", data=> {
//         console.log("data interval changed: ", data);
//        if ( schedule.scheduledJobs[data.elderId]) {
//             console.log("we cancel this elder schedule")
//             schedule.scheduledJobs[data.elderId].cancel();
//        }
//         schedule.scheduleJob(`${data.elderId}`,`*/${data.value} * * * *`, () => {
//             console.log("this time need to get data :))", new Date().getMinutes())
//             firebase.database().ref('Patients').child(data.elderId).child("Config").child("ValueTime").set(new Date().getTime(), (e) => {
//                 if (e) {
//                     console.log("some thing wrong: ", e);
//                 }
//             });
//         })
        
//     })
// })

// schedule.scheduleJob('SendMail', '19 * * 6', () => {
//     console.log("we send email");
//     mailer.sendEmail();
// })


// schedule.scheduleJob('Tonghop', '*/5 * * * *', () => {
//     console.log("all jobs now: ", Object.keys(schedule.scheduledJobs));
// })



// function createAJob(elderId, value) {
    
//     if (typeof(elderId) === "J")
// }




// var sleeper = schedule.scheduleJob('5 10 * * *', () => {
//         var ref = firebase.database().ref('/Patients');
//         ref.once("value", (snapshot) => {
//             // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
//             Object.keys(snapshot.val()).forEach(elderId => {
//                 var detailRef = firebase.database().ref(`Patients/${elderId}/Config/DataSleepToday`);
//                 // var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
//                 detailRef.set(false, (e) => {
//                     if (e) {
//                         console.log("we get some error here: ", e);
//                     } else {
//                         console.log("we set value sleep request to firebase success!");
//                     }
//                 })
//                 // medicinePath.set(true, (e) => {
//                 //     if (e) {
//                 //         console.log('we get some error here: ', e);
//                 //     } else {
//                 //         console.log('set time medicine success')
//                 //     }
//                 // })
//             });
//         })
//     // console.log('The answer to life, the universe, and everything!');

//   });

//   var morning = schedule.scheduleJob('5 7 * * * ', () => {
//     var ref = firebase.database().ref('/Patients');
//     ref.once("value", (snapshot) => {
//         // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
//         Object.keys(snapshot.val()).forEach(elderId => {
//             var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
//             medicinePath.set(true, (e) => {
//                 if (e) {
//                     console.log('we get some error here: ', e);
//                 } else {
//                     console.log('set time medicine success')
//                 }
//             })
//         });
//     })
//   })



// let i = 1;

// var Mailer = schedule.scheduleJob(`*/${i} * * * *` , () => {
//     // let listElderId = await accountRepository.getAllPateintsId();
//     // console.log(listElderId)
//     // listElderId.forEach(async id => {
//     //     let listEmails = await accountRepository.getRelativeEmails(id.ICID);
//     //     console.log(listEmails)
//     // });
    
//     console.log("run it")

// })
  
// schedule.scheduleJob('test', '*/1 * * * *', () => {
//     console.log("we test")
// })
//   var afternoon = schedule.scheduleJob('setMedicines','43 16 * * *', () => {
//     var ref = firebase.database().ref('/Patients');
//     ref.once("value", (snapshot) => {
//         // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
//         Object.keys(snapshot.val()).forEach(elderId => {
//             var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
//             medicinePath.set(new Date().getTime(), (e) => {
//                 if (e) {
//                     console.log('we get some error here: ', e);
//                 } else {
//                     console.log('set time medicine success')
//                 }
//             })
//         });
//     })
//   })

//   schedule.scheduleJob('toltalJob', '30 17 * * *', () => {
//       console.log("all job run: ", Object.keys(schedule.scheduledJobs))
//       let index = Object.keys(schedule.scheduledJobs).findIndex(e => (e === 'test'));
//       if (index != -1) {
//           let a = Object.keys(schedule.scheduledJobs)[index];
//           console.log('we cancel this', a)
//           schedule.scheduledJobs[a].cancel();
//       }
//   })
  
// console.log("list of jobs we have: ", schedule.scheduledJobs)
//   var eve = schedule.scheduleJob('32 16 * * *', () => {
//     var ref = firebase.database().ref('/Patients');
//     ref.once("value", (snapshot) => {
//         // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
//         Object.keys(snapshot.val()).forEach(elderId => {
//             var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
//             medicinePath.set(new Date().getMilliseconds(), (e) => {
//                 if (e) {
//                     console.log('we get some error here: ', e);
//                 } else {
//                     console.log('set time medicine success')
//                 }
//             })
//         });
//     })
//   })


 

 
