var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('express-flash')
var path = require('path');
//use session
var cookieParser = require('cookie-parser');
var session = require('express-session');
//login
var bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: 'app',
  cookie: { maxAge: 60000}
 }
));
app.use(flash());

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

//admin
router.get('/admin/signup', function(req, res) {
  if (req.session.user_id) {
    res.redirect('/admin');
  } else {
    res.render('pages/admin/signup');
  }
});

router.post('/admin/signup/create', function(req, res){

  if (/@acceptmycrypto.com\s*$/.test(req.body.email)) {
    bcrypt.genSalt(10, function(err, salt) {

	    bcrypt.hash(req.body.password, salt, function(err, p_hash) {

	    	connection.query('INSERT INTO admin_users (email, password) VALUES (?, ?)', [req.body.email, p_hash],function (error, results, fields) {

          if (error) throw error;
          req.flash('info', "You're signed up successfully.");
	    	  res.redirect("/admin/signin");

	    	});
	    });
    });
  } else {
    req.flash('info', "Please use the company's domain");
    res.redirect('/admin/signup');
  }

});

router.get('/admin', function(req, res) {
  if (req.session.user_id) {
    connection.query(
      'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name ORDER by crypto_metadata.id ASC',
      function(err, data, fields) {
        res.render('pages/admin/index', {
          cryptos: data
        });
      }
    );
  } else {
    res.redirect('/admin/signin');
  }
});

// router.get('/admin/edit', function(req, res) {
//   if (req.session.user_id) {
//     connection.query(
//       'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name',
//       function(err, data, fields) {
//         res.render('pages/admin/index', {
//           cryptos: data
//         });
//       }
//     );
//   } else {
//     res.redirect('/admin/signin');
//   }
// });

router.get('/admin/signin', function(req, res) {
  if (req.session.user_id) {
    res.redirect('/admin');
  } else {
    res.render('pages/admin/login');
  }
});

router.get('/admin/logout', function(req, res){
	req.session.destroy(function(err){
    res.redirect('/admin/signin');
	})
});

router.get('/admin/add_venue', function(req, res) {
  res.render('pages/admin/add_venue');
});

router.post('/admin', function(req, res){

	connection.query('SELECT * FROM admin_users WHERE email = ?', [req.body.email],function (error, results, fields) {

	  if (error) throw error;

	  if (results.length == 0){
      req.flash('info', "No username matched.");
      res.redirect('/admin/signin');
	  }else {
	  	bcrypt.compare(req.body.password, results[0].password, function(err, result) {

	  	    if (result == true){

	  	      req.session.user_id = results[0].id;
	  	      req.session.email = results[0].email;

            connection.query(
              'SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name ORDER by crypto_metadata.id ASC',
              function(err, data, fields) {
                res.render('pages/admin/index', {
                  cryptos: data
                });
              }
            );

	  	    }else{
	  	      res.redirect('/admin/signin');
	  	    }
	  	});
	  }
	});
});

router.post('/admin/venues/create', function(req, res) {
  var query = connection.query(
    'INSERT INTO venues SET ?',
    req.body,
    function(err, response) {
      res.redirect('/admin');
    }
  );
});

router.get('/admin/:crypto/accept_venue', function(req, res) {

  connection.query(
    'SELECT crypto_metadata.id AS crypto_id, crypto_metadata.crypto_name, venues.id AS venue_id, venues.venue_name FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id WHERE ?',
    {crypto_name: req.params.crypto},
    function(err, data, fields) {
      connection.query(
        'SELECT * FROM venues WHERE ?',
        {accepted_crypto: false},
        function(err, venue, fields) {
          res.render('pages/admin/accept_venue', {
            cryptos: data,
            venues: venue
          });
        }
      );
    }
  );
});

router.post('/admin/:crypto/accept_venue/create', function(req, res) {
  var query = connection.query(
    'INSERT INTO cryptos_venues SET ?',
    req.body,
    function(err, response) {
      connection.query(
        'UPDATE venues SET ? WHERE ?',
        [
          { accepted_crypto: true },
          { id: req.body.venue_id }
        ],
        function(err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
      res.redirect('/admin');
    }
  );
});

module.exports = router;