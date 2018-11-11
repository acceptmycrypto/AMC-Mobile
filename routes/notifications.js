var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

var path = require("path");

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));


var connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'password',  
    database: 'crypto_db'   
});


router.get('/notification', function(req, res){
    connection.query(
        'SELECT notifications.id, notifications.unread, users.id, users.username, venues.venue_name, deals.deal_name, deals.deal_description',
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


module.exports = router;