var db = require('../fn/db');
var md5 = require('crypto-js/md5');

exports.addUser = (newUser) => {
    var sql = `insert into relative(elderId, name, email, phone, address, rlUsername, rlPassword, permission) values('${newUser.elder_id}', '${newUser.name}', '${newUser.email}', '${newUser.phone}', '${newUser.address}', '${newUser.username}', '${newUser.password}', '${newUser.permission}')`;
    return db.insert(sql);
}
exports.logIn = (user) => {
    var sql = `select * from relative where rlUsername = '${user.username}' and rlPassword = '${user.password}'`;
    return db.load(sql);
}
exports.getListDoctors = () => {
    var sql = `select * from doctor where permission = 'doctor'`;
    return db.load(sql);
}
exports.addElder = (elder) => {
    var sql = `insert into elder(name, gender, age, ICID, doctorId, weight, height) values ('${elder.name}', '${elder.gender}', ${elder.age}, '${elder.icid}', ${elder.doctorId}, ${elder.weight}, ${elder.height})`
    return db.insert(sql);
}
exports.getListElders = (doctorId) => {
    var sql = `select * from elder where doctorId = ${doctorId}`;
    return db.load(sql);
}
exports.elderDetail = (elderId) => {
    var sql = `select * from elder where ICID = ${elderId}`;
    return db.load(sql);
}

exports.getElderInformation = (elderId) => {
    var sql = `select * from elder where ICID = '${elderId}'`;
    return db.load(sql);
}

exports.getDoctorPhoneNumber = (doctorId) => {
    var sql = `select phone from doctor where doctorId = ${doctorId} `;
    return db.load(sql);
}

exports.doctorLogin = (doctor) => {
    var sql = `select * from doctor where username = '${doctor.username}' and password = '${doctor.password}'`;
    return db.load(sql);
}
exports.getUserByUsername = username => {
    var sql = `select * from relative where rlUsername = '${username}'`;
    return db.load(sql);
}
exports.addDoctor = (doctor) => {
    var sql = `insert into doctor(name, email, phone, specializeIn, username, password, permission) values 
    ('${doctor.name}', '${doctor.email}', '${doctor.phone}', '${doctor.specializeIn}', '${doctor.username}', '${doctor.password}', 'doctor')`;
    return db.insert(sql);
}

exports.getListRelatives = (elderId) => {
    let sql = `select * from relative where elderId = '${elderId}'`;
    return db.load(sql);
}