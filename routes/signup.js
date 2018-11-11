var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); //generates uuid for us
//use sendgrid
var sgMail = require("@sendgrid/mail");
var keys = require("../key");
sgMail.setApiKey(keys.sendgrid);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
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



router.post('/register', function(req, res) {
  console.log(req.body);
  var selectedCryptos = req.body.cryptoProfile;
//First we make a query to see if user exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [req.body.email],
    function(error, result, fields) {
      if (error) throw error;

//if we find the user exists in the database, we send "User already exists" to the client
      if (result[0]) return res.status(404).json({ error: 'User already exists' });

      if (!req.body.password) return res.status(401).json({ error: 'you need a password' });

      if (req.body.password.length <= 5) return res.status(401).json({ error: 'password length must be greater than 5' });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, password_hash) {
//1) insert the new user into users table

          connection.query('INSERT INTO users (email, password, username, email_verification_token) VALUES (?, ?, ?, ?)',
          [req.body.email, password_hash, req.body.username, uuidv4()],
          function (error, results, fields) {

            if (error) {
              console.log(error)
            } else {
              //send a notificiation to the client side to let user verify their email
              res.json({
                  message: "We sent you an email for email verification. Please confirm your email."
              });

              let UserID; //make a available to be resused when insert into users_cryptos table

                //query the new inserted user to get the user-id and email verification code
                connection.query(
                  'SELECT * FROM users WHERE email = ?',
                  [req.body.email],
                  function(error, result, fields) {
                    if (error) throw error;
                    userID = result[0].id;

                    let photo = ['fa-user-secret', 'fa-user-circle', 'fa-user-astronaut', 'fa-user-tie', 'fa-user'];
                    let photo_index = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

                    connection.query(
                      'INSERT INTO users_profiles (user_id, photo ) VALUES(?,?)',
                      [result[0].id, photo[photo_index], ],
                      function(error, result, fields) {
                        if (error) throw error;
                      }
                    );

                    //use sendgrid to send email
                    let link = "http://localhost:3001/email-verify/" + userID + "/" + result[0].email_verification_token;

                    const email_verification = {
                      to: req.body.email,
                      from: 'simon@acceptmycrypto.com',
                      subject: 'Please click the link below to verify your email.',
                      html: `<a href=${link}>Verify Email</a>`
                    };
                    sgMail.send(email_verification);
                  }



                );

                //insert selected cryptos into users_cryptos table
                connection.query(
                  "SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name WHERE crypto_name IN (?)",
                  [selectedCryptos],
                  function(error, results, fields) {
                    if (error) throw error;
                    const userID_cryptoID = [];

                    const cryptoIDs = results.map(crypto => {
                      return crypto["id"]
                    })

                    for (let i = 0; i < cryptoIDs.length; i++) {
                      let innerArr = [];
                      innerArr.push(userID, cryptoIDs[i]);
                      userID_cryptoID.push(innerArr);
                    }

                //Now we insert the userID_cryptoID array into the users_cryptos table
                    connection.query(
                      'INSERT INTO users_cryptos (user_id, crypto_id) VALUES ?',
                      [userID_cryptoID],
                      function(error, user_cryptos, fields) {
                        if (error) throw error;
                      }


                    );

                  }
                );

            }
          });

        });//bcrypt.hash closing bracket

      }); //bcrypt.getsalt closing bracket

    }
  );
});


 //Once the user clicks on the email verification, we get the id and email verification params
router.get('/email-verify/:user_id/:email_verification_token', function(req, res) {
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.user_id],
    function(error, result, fields) {
      if (error) throw error;

      //if user is verified already then send a message to user that the account is verified
      if (result[0].verified_email === 1) {
        res.send("Your account has been verified, please login.")
      } else {
        //update verified email to true
        connection.query(
          'UPDATE users SET ? WHERE ?',
          [{verified_email: 1}, {id: req.params.user_id}],
          function(error, results, fields) {
            if (error) throw error;
            res.send("Your email has been verified, please login.")
            //TODO: rediect user to the matched deal page
          }
        );

      }

    }
  );
});

//Anyone can access this route
//grab the cryptos list for user to select
router.get('/cryptocurrencies', function(req, res) {

  connection.query(
    'SELECT crypto_metadata_name, crypto_symbol FROM crypto_info LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name',
    function(error, results, fields) {

      if (error) throw error;

      res.json(results);
    }
  );
});

module.exports = router;
