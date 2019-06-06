var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");
var schedule = require('node-schedule');
var app = express();
var firebase = require('firebase')
app.use(bodyParser.json());
app.use(cors());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 var accountController = require('./controllers/accountController');
 var medicineController = require('./controllers/medicineController');
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
  
  var afternoon = schedule.scheduleJob('43 16 * * *', () => {
    var ref = firebase.database().ref('/Patients');
    ref.once("value", (snapshot) => {
        // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
        Object.keys(snapshot.val()).forEach(elderId => {
            var medicinePath = firebase.database().ref(`Patients/${elderId}/Config/MedicineTime`);
            medicinePath.set(new Date().getTime(), (e) => {
                if (e) {
                    console.log('we get some error here: ', e);
                } else {
                    console.log('set time medicine success')
                }
            })
        });
    })
  })

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


 app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
 });

 