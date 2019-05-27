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

exports.addElder = (elder) => {
    var sql = `insert into elder(name, gender, age, ICID, doctorNumPhone) values ('${elder.name}', '${elder.gender}', ${elder.age}, '${elder.icid}', '${elder.doctorPhoneNum}')`
    return db.insert(sql);
}

exports.elderDetail = (elderId) => {
    var sql = `select * from elder where ICID = ${elderId}`;
    return db.load(sql);
}





exports.getAllPateintsId = () => {
    var sql = `select ICID from elder`;
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