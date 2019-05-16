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
 var doctorController = require('./controllers/doctorController');
 var medicineController = require('./controllers/medicineController');
//  var healthIndexesController = require('./controllers/healthIndexesController');
 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 app.use('/account', accountController);
 app.use('/doctor', doctorController);
 app.use('/medicine', medicineController);

//  app.use('/healthIndexes', healthIndexesController);
 // set port
 const port = process.env.PORT || 6900;
 app.listen(port, () => {
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

var j = schedule.scheduleJob('6 * * * * *', function(){
        var ref = firebase.database().ref('/Patients');
        ref.once("value", (snapshot) => {
            // console.log("the result we get from firebase in shcedule functions: ", Object.keys(snapshot.val()));
            Object.keys(snapshot.val()).forEach(elderId => {
                var detailRef = firebase.database().ref(`Patients/${elderId}/Config/DataSleepToday`);
                detailRef.set(false, (e) => {
                    if (e) {
                        console.log("we get some error here: ", e);
                    } else {
                        console.log("we set value to firebase success!");
                    }
                })
            });
        })
    // console.log('The answer to life, the universe, and everything!');

  });