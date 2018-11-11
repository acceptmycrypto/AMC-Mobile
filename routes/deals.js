var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var verifyToken =  require ("./utils/validation");

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

// api
router.post('/api/deals', verifyToken, function(req, res) {
  let id = req.decoded._id;

  if (id) { //if login

    //1) query the users_cryptos table to get the crypto_id that the user is interested/owned
    connection.query(
      'SELECT crypto_id FROM users_cryptos WHERE user_id = ?',
      [id],
      function(error, cryptosID, fields) {
        if (error) console.log(error);

        //2) query the venues that accept those cryptos
        connection.query(
          'SELECT venue_id FROM cryptos_venues WHERE ?',
          cryptosID,
          function(error, venuesID, fields) {
            if (error) console.log(error);

            //query the deals that offered by those venues
            connection.query(
              'SELECT deals.id, deals.deal_name, deals.deal_description, deals.featured_deal_image, deals.pay_in_dollar, deals.pay_in_crypto, venues.venue_name, venues.venue_link FROM deals LEFT JOIN venues ON deals.venue_id = venues.id WHERE ?',
              venuesID,
              function(error, results, fields) {
                if (error) console.log(error);

                res.json(results);
              }
            );

          }
        );

      }
    );

  }

});

//get a deal_item api
router.get('/api/deals/:deal_name', function(req, res) {
  //important! we set this venue name a here so it's available to be used for crytoAccept list querry
  let venue_name;

  connection.query(
    'SELECT * FROM deal_images LEFT JOIN deals ON deals.id = deal_images.deal_id LEFT JOIN venues ON deals.venue_id = venues.id WHERE ?',
    [req.params],
    function(error, deal_images_result, fields) {
      if (error) throw error;

      let newDealItem = [];
      let images = [];

      //find images in the objects and add to images array
      for (let i in deal_images_result) {
        images.push(deal_images_result[i].deal_image);
      }

      //since every object in the array is the same, we just use the first object in the array
      //reassign the deal_image property to images array
      deal_images_result[0].deal_image = images;

      //push the first object into an emptry array so we can use it on the client side for mapping
      newDealItem.push(deal_images_result[0]);

      //assign the venue name to the variable venue_name that we defined earlier
      venue_name = newDealItem[0].venue_name;

      //query the acceptedCryptos list from the given venue
      // venues.venue_name, venues.venue_description, crypto_metadata.crypto_name, crypto_metadata.crypto_symbol
      connection.query(
        'SELECT * FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id LEFT JOIN crypto_info ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name WHERE venue_name = ?',
        [venue_name],
        function(error, results, fields) {

          if (error) throw error;

          let venue = [];

          for (venueObj in results) {
            let cryptoName = results[venueObj].crypto_name;
            let cryptoSymbol = results[venueObj].crypto_symbol;
            let cryptoLogo = results[venueObj].crypto_logo;

            let acceptedCrypto = {};
            acceptedCrypto.crypto_name = cryptoName; //{crypto_name: "bitcoin"}
            acceptedCrypto.crypto_symbol = cryptoSymbol; //{crypto_name: "btc", crypto_symbol: "btc"}
            acceptedCrypto.crypto_logo = cryptoLogo;

            venue.push(acceptedCrypto);
          }
          newDealItem.push(venue);
          res.json(newDealItem);
        }
      );
    }
  );

  //get the accepted cryptos from a venue
  // router.get('/api/deals/venue_name', function(req, res) {
  //   connection.query(
  //     'SELECT venues.venue_name, venues.venue_description, crypto_metadata.crypto_name, crypto_metadata.crypto_symbol FROM cryptos_venues LEFT JOIN venues ON venues.id = cryptos_venues.venue_id LEFT JOIN crypto_metadata ON crypto_metadata.id = cryptos_venues.crypto_id WHERE venue_name = ?',
  //     [venue_name],
  //     function(error, results, fields) {
  //       if (error) throw error;

  //       let venue = '';
  //       let crypto = '';
  //       let cryptoSymbol = '';
  //       let cryptocurrencies = [];
  //       let crypto_symbols = [];
  //       let newObj = {};

  //       results.map((venueObj) => {

  //         if (venueObj.venue_name !== venue) {
  //           venue = venueObj.venue_name;
  //           crypto = venueObj.crypto_name;
  //           cryptoSymbol = venueObj.crypto_symbol;

  //           //when it's a new venue_name, empty the cryptocurrencies array
  //           cryptocurrencies = [];
  //           cryptocurrencies.push(crypto);
  //           crypto_symbols = [];
  //           crypto_symbols.push(cryptoSymbol);
  //           newObj[venueObj.venue_name] = [cryptocurrencies, crypto_symbols];

  //         } else {
  //           crypto = venueObj.crypto_name;
  //           cryptocurrencies.push(crypto);
  //           cryptoSymbol = venueObj.crypto_symbol;
  //           crypto_symbols.push(cryptoSymbol);
  //           newObj[venueObj.venue_name] = [cryptocurrencies, crypto_symbols];
  //         }

  //         return newObj;
  //       });

  //       res.json(newObj);
  //     }
  //   );
  // });

});

module.exports = router;
