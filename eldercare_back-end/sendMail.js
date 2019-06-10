const accountRepo = require("./repos/accountRepo");
const async = require("async")
const nodeMailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport")

exports.sendEmail = async () => {
    let listEmail = await accountRepo.getRelativeSendEmailInfo()
    listEmail = listEmail.map(email => email)
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
