var db = require('../fn/db');

exports.addMedicine = (medicine) => {
    var sql = `insert into medicine(abbr, name, imageURL) values ('${medicine.abbr}', '${medicine.name}', '${medicine.imageUrl}')`;
    return db.insert(sql);
}
// exports.addPrescription = (prescription) => {
//     var sql = `insert into prescription()`
// }