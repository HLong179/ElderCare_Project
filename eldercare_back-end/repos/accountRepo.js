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
    var sql = `insert into elder(name, gender, age, ICID, weight, doctorNumPhone) values ('${elder.name}', '${elder.gender}', ${elder.age}, '${elder.icid}', ${elder.weight}, '${elder.doctorPhoneNum}')`
    return db.insert(sql);
}
exports.updateElderWeight = (elderId, value) => {
    var sql = `update elder set weight = ${value} where ICID = '${elderId}'`;
    return db.insert(sql);
}


exports.addNote = (note) => {
    var sql = `insert into note(elderId, time, title, script) value values('${note.elderId}', '${note.time}', '${note.title}', '${note.script}')`;
    return db.insert(sql);
}
exports.getNotes = (elderId) => {
    var sql = `select * from note  where elderId = '${elderId}'`;
    return db.load(sql);
}

exports.removeNote = (noteId) => {
    var sql = `delete from note where id = ${noteId}`;
    return db.delete(sql);
}

exports.updateNote = (note) => {
    var sql = `update note set time = '${note.time}', title = '${note.title}', script = '${note.script}' where id = ${note.id}`;
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