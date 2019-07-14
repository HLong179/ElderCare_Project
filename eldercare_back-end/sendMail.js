const accountRepo = require("./repos/accountRepo")
const async = require("async")
const nodeMailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
const moment = require("moment")
const firebase = require("firebase")

exports.sendEmail = async () => {
  let listData = []
  let listId = await accountRepo.getElderIdFromRelative()
  let temp = await Promise.all(
    listId.map(async elderId => {
      let result = {
        elderId: elderId.elderId,
        email: []
      }
      let listEmail = await accountRepo
        .getEmailRelativeByElderId(elderId.elderId)
        .then(elderId => elderId)
      for (let i = 0; i < listEmail.length; i++) {
        result.email.push(listEmail[i].email)
      }
      listData.push(result)
    })
  )

  let transporter = nodeMailer.createTransport(
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
    listData,
    async function(data, callback) {
      const getAvg = grades => grades.reduce((p, c) => p + c) / grades.length

      let heartRate = [],
        stepCounts = [],
        calories = []
      let startOfWeek = moment()
        .startOf("isoweek")
        .toDate()
        .valueOf()
      let caloriesFB = {}
      let stepCountFB = {}
      let heartRateFB = {}
      const patientsRef = firebase.database().ref("Patients")
      const snapshot = await patientsRef.once("value")
      if (snapshot.val()[data.elderId]) {
        if (snapshot.val()[data.elderId]["Calories"]) {
          caloriesFB = snapshot.val()[data.elderId]["Calories"]
        }
        if (snapshot.val()[data.elderId]["StepCounts"]) {
          stepCountFB = snapshot.val()[data.elderId]["StepCounts"]
        }

        if (snapshot.val()[data.elderId]["HeartRate"]) {
          heartRateFB = snapshot.val()[data.elderId]["HeartRate"]
        }
      }

      if (Object.keys(caloriesFB).length !== 0) {
        for (let patient in caloriesFB) {
          if (parseInt(patient, 10) >= startOfWeek) {
            calories.push(caloriesFB[patient])
          }
        }
      }
      if (Object.keys(stepCountFB).length !== 0) {
        for (let patient in stepCountFB) {
          if (parseInt(patient, 10) >= startOfWeek) {
            stepCounts.push(stepCountFB[patient])
          }
        }
      }
      if (Object.keys(heartRateFB).length !== 0) {
        for (let patient in heartRateFB) {
          if (parseInt(heartRateFB[patient]["time"], 10) >= startOfWeek) {
            heartRate.push(heartRateFB[patient]["value"])
          }
        }
      }
      let elderDetail = await accountRepo.elderDetail(data.elderId)
      elderDetail = elderDetail[0]

      let listScript = await accountRepo.getNotes(data.elderId).then(res => res)

      let emails = data.email.join(",")

      mailOptions.to = emails

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
        <h3>Thống kê dữ liệu sức khỏe:<h3>
        <div style="font-weight: 300; font-size: 13px">
        <h4>Nhịp tim</h4>
        ${
          heartRate[0]
            ? `<ul>
        <li>Nhỏ nhất : ${Math.min(...heartRate)} bpm</li>
        <li>Lớn nhất : ${Math.max(...heartRate)} bpm</li>
        <li>Trung bình : ${getAvg(heartRate).toFixed(2)} bpm</li>
      </ul>`
            : `Không có dữ liệu`
        }
      
        <h4>Calories</h4>
        ${
          calories[0]
            ? `<ul>
          <li>Nhỏ nhất : ${Math.min(...calories)}</li>
          <li>Lớn nhất : ${Math.max(...calories)}</li>
          <li>Trung bình : ${getAvg(calories).toFixed(2)}</li>
        </ul>`
            : `Không có dữ liệu`
        }
      
        <h4>Bước đi</h4>
        ${
          stepCounts[0]
            ? `<ul>
        <li>Nhỏ nhất : ${Math.min(...stepCounts)}</li>
        <li>Lớn nhất : ${Math.max(...stepCounts)}</li>
        <li>Trung bình : ${getAvg(stepCounts).toFixed(2)}</li>
      </ul>`
            : `Không có dữ liệu`
        }
      
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
