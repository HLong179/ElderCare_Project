var express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors")
var schedule = require("node-schedule")
var app = express()
var firebase = require("firebase")
const nodemailer = require("nodemailer")
const async = require("async")
const smtpTransport = require("nodemailer-smtp-transport")

const accountRepo = require("./repos/accountRepo")

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

var accountController = require("./controllers/accountController")
var medicineController = require("./controllers/medicineController")
//  var healthIndexesController = require('./controllers/healthIndexesController');
// default route
app.get("/", function(req, res) {
  return res.send({ error: true, message: "hello" })
})
console.log("hello")
app.use("/account", accountController)
app.use("/medicine", medicineController)

//  app.use('/healthIndexes', healthIndexesController);
// set port
const port = process.env.PORT || 6900

var config = {
  apiKey: "AIzaSyBhkXtTybamYMmxnZU2aYdoHf2Hy2uH1DQ",
  authDomain: "eldercare-5e4c8.firebaseapp.com",
  databaseURL: "https://eldercare-5e4c8.firebaseio.com",
  projectId: "eldercare-5e4c8",
  storageBucket: "eldercare-5e4c8.appspot.com",
  messagingSenderId: "49718683704",
  appId: "1:49718683704:web:7deb43f5933fa2b3"
}
firebase.initializeApp(config)

async function sendEmail() {
  let listEmail = await accountRepo.getRelativeSendEmailInfo()
  listEmail = listEmail.map(email => email)
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: "elderlycare.hcmus@gmail.com",
        pass: "doantn2019"
      }
    })
  )

  let mailOptions = {
    from: "elderlycare.hcmus@gmail.com",
    to: "",
    subject: "Dữ liệu sức khỏe định kỳ",
    html: ""
  }
  async.each(
    listEmail,
    async function(data, callback) {
      let elderDetail = await accountRepo.elderDetail(data.elderId)
      elderDetail = elderDetail[0]

      let listScript = await accountRepo.getNotes(data.elderId).then(res => res)

      mailOptions.to = data.email

      let htmlCode = `
        <h3>Thông tin chi tiết:</h3>
        <p>Họ và tên: ${elderDetail.name}</p>
        <p>Tuổi: ${elderDetail.age}</p>
        <p>Giới tính: ${elderDetail.gender}</p>
        <p>Cân nặng: ${elderDetail.weight}</p>
        <h3>Ghi chú quan trọng:<h3>
        <div style="font-weight: 300; font-size: 13px">
          ${listScript.map(
            note =>
              `<p><span>${note.time}</span>  -  <span>${note.title}
              </span>  -  <span>${note.script}</span></p>`
          )}
        </div>
        `
      mailOptions.html = htmlCode

      transporter.sendMail(mailOptions, function(err) {
        if (err) {
          console.log("Sending to " + data.email + " failed: " + err)
        } else {
          console.log("Sent to " + data.email)
          // callback()
        }
      })
    },
    function(err) {
      if (err) {
        console.log("Sending to all emails failed:" + err)
      }
    }
  )
}

sendEmail()

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

//   var afternoon = schedule.scheduleJob('43 16 * * *', () => {
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
  console.log(`Server is running on port ${port}`)
})
