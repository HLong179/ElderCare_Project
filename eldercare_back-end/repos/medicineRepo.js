var db = require('../fn/db');

exports.addMedicine = (medicine) => {
    var sql = `insert into medicine(elderId, imageUrl, name, script, morning, afternoon, evening ) values ('${medicine.elderId}', '${medicine.imageUrl}', '${medicine.name}}', '${medicine.script}', ${medicine.morning}, ${medicine.afternoon}, ${medicine.evening})`;
    return db.insert(sql);
}
exports.getMedicineOfPatientByTime = (elderId, time) => {
    var sql;
   switch (time) {
        case 1: 
            sql = `select * from medicine where elderId = '${elderId}' and morning = 1`
            break;
        case 2: sql =  `select * from medicine where elderId = '${elderId}' and afternoon = 1`
        break;
        case 3: sql =  `select * from medicine where elderId = '${elderId}' and evening = 1`;
        break;
   }
   return db.load(sql);
}
exports.getMedicinesOfPatient = (elderId) => {
    var sql = `select * from medicine where elderId = '${elderId}'`;
    return db.load(sql);
}
exports.updateMedicine = (elderId, medicine) => {
    var sql = `update medicine set imageUrl = '${medicine.imageUrl}', script = '${medicine.script}' , name = '${medicine.name}', morning = ${medicine.morning}, afternoon = ${medicine.afternoon}, evening = ${medicine.evening} where elderId = '${elderId}'`;
    return db.insert(sql);
}
// exports.addPrescription = (prescription) => {
//     var sql = `insert into prescription()`
// }