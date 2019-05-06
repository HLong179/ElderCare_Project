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

exports.doctorLogin = (doctor) => {
    var sql = `select * from doctor where drUsername = '${doctor.username}' and drPassword = '${doctor.password}'`;
    return db.load(sql);
}
exports.getUserByUsername = username => {
    var sql = `select * from relative where rlUsername = '${username}'`;
    return db.load(sql);
}
exports.addDoctor = (doctor) => {
    var sql = `insert into doctor(name, email, phone, specializeIn, drUsername, drPassword) values 
    ('${doctor.name}', '${doctor.email}', '${doctor.phone}', '${doctor.specializeIn}', '${doctor.username}', '${doctor.password}')`;
    return db.insert(sql);
}