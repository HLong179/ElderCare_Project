var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(cors());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 var accountController = require('./controllers/accountController');
//  var healthIndexesController = require('./controllers/healthIndexesController');
 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 app.use('/account', accountController);
//  app.use('/healthIndexes', healthIndexesController);
 // set port
 const port = process.env.PORT || 6900;
 app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
 });