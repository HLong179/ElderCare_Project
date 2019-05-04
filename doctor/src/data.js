const data = []
for (let i = 0; i < 4; i++) {
  data.push({
    key:  i,
    name: i % 2 === 0 ? `Trần Văn A` : `Nguyễn Thị B`,
    age: 32,
    gender: i % 2 === 0 ? "Nam" : "Nữ",
    cmnd: "12345678" + i,
    address: `178 Trần Hưng Đạo, phường ${i}, quận 1, HCM`,
    patient_status: `Cao huyết áp, có vấn đề về tim mạch`,
  })
}

module.exports = data
