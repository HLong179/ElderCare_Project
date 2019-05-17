var db = require('../fn/db');

exports.addPrescription = (prescription) => {
    var sql = `insert into prescription(elderId, doctorId, imageUrl, script ) values ('${prescription.elderId}', ${prescription.doctorId}, '${prescription.imageUrl}', '${prescription.script}')`;
    return db.insert(sql);
}
exports.getPrescription = (elderId) => {
    var sql = `select * from prescription where elderId = '${elderId}'`;
    return db.load(sql);
}
exports.updatePrescription = (id, prescription) => {
    var sql = `update prescription set imageUrl = '${prescription.imageUrl}', script = '${prescription.script}' where id = '${id}'`;
    return db.insert(sql);
}
// exports.addPrescription = (prescription) => {
//     var sql = `insert into prescription()`
// }