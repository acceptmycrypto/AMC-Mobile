var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken =  require ("./utils/validation");


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


router.post('/navbar/photo',verifyToken, function (req, res) {
    var id = req.decoded._id;
    connection.query('SELECT users_profiles.photo FROM users_profiles LEFT JOIN users ON users.id = users_profiles.user_id WHERE users.id = ?;', [id], function (error, results, fields) {
        if (error) throw error;
        // console.log("photo:", results[0].photo);
        res.json(results[0].photo);
    });
});

router.post('/loggedIn', verifyToken, function (req, res){
    if(req.decoded._id){
        res.json({"message": "Right Token"});
    }else{
        res.status(403).json({"message": "No Token"});
    }
})



module.exports = router;