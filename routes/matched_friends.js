var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");


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

// var id = 1;


router.post("/matchedFriends/feed", verifyToken, function (req, res) {
  let id = req.decoded._id;
  connection.query(
    "SELECT users_purchases.date_purchased, users_purchases.amount, deals.deal_name, users.username, users_profiles.photo, venues.venue_name, crypto_metadata.crypto_symbol AS crypto_symbol FROM users_purchases LEFT JOIN deals ON users_purchases.deal_id = deals.id LEFT JOIN users ON users_purchases.user_id = users.id LEFT JOIN crypto_info ON users_purchases.crypto_id = crypto_info.id LEFT JOIN crypto_metadata ON crypto_metadata_name = crypto_metadata.crypto_name LEFT JOIN venues ON venue_id = venues.id LEFT JOIN users_profiles ON users_profiles.user_id = users.id WHERE payment_received = ? AND NOT permission = ? AND users.id IN (SELECT matched_friend_id AS id FROM users_matched_friends WHERE user_id = ? AND both_accepted = 1) ORDER BY users_purchases.date_purchased DESC",
    [1, "private", id], //1 is true for payment received //community means any user on acceptmycrypto platform //friends means only matched friends can see transactions
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});


router.post("/settings/make/friends", verifyToken, function (req, res) {
  let user_id = req.decoded._id;
  let matched_friend_id = req.body.matched_friend_id;
  // console.log(id);
  console.log(matched_friend_id);
  connection.query(
    "UPDATE users_matched_friends SET user_accepted = 1 WHERE ? AND ?",
    [{ user_id }, { matched_friend_id }],
    function (error, results, fields) {
      if (error) throw error;
      connection.query(
        "SELECT user_accepted FROM users_matched_friends WHERE user_id = ? AND matched_friend_id = ?",
        [matched_friend_id, user_id],
        function (error, res, fields) {
          if (error) throw error;
          else if (res[0].user_accepted == 1) {
            connection.query(
              "UPDATE users_matched_friends SET both_accepted = 1 WHERE user_id = ? AND matched_friend_id = ? OR user_id = ? AND matched_friend_id = ?",
              [user_id, matched_friend_id, matched_friend_id, user_id],
              function (error, data, fields) {
                
              }
            );

          }
          
        }
      );
      res.json(results);
    }
    
  );
});



module.exports = router;