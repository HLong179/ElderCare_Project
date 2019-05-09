var db = require('../fn/db');

exports.addPrescription = (prescription) => {
    var sql = `insert into prescription(elderId, doctorId, imageUrl, script ) values ('${prescription.elderId}', ${prescription.doctorId}, '${prescription.imageUrl}', '${prescription.script}')`;
    return db.insert(sql);
}
// exports.addPrescription = (prescription) => {
//     var sql = `insert into prescription()`
// }