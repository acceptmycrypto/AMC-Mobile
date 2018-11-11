require('dotenv').config()

var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var keys = require("../key");
//use sendgrid
// var sgMail = require("@sendgrid/mail");
// var keys = require("../key");
// sgMail.setApiKey(keys.sendgrid);

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


function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);
  if (token) {
      jwt.verify(token, keys.JWT_SECRET, (err, decod) => {
          if (err) {
              res.status(403).json({
                  message: "Wrong Token"
              });
          } else {
              req.decoded = decod;
              next();
          }
      });
  } else {
      res.status(403).json({
          message: "No Token"
      });
      console.log(token);
  }
}

router.post('/signin', function(req, res) {
  var email = req.body.email;

    connection.query('SELECT * FROM users WHERE email = ?',
    [email, 1],
     function(error, result, fields) {
      if (error) console.log(error);
      console.log(result);
      if (!result[0]) return res.status(404).json({ error: 'user not found' });

      if (!bcrypt.compareSync(req.body.password, result[0].password)) return res.status(401).json({ error: 'incorrect password ' });

        var payload = {
            email: result[0].email,
            _id: result[0].id
        };


        var token = jwt.sign(payload, keys.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
            message: 'successfuly authenticated',
            token: token
        });
    });
})


module.exports = router;