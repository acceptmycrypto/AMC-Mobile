//Get the name of the crypto from the url param
var crypto_param = window.location.href.split('/cryptos/')[1];
var cryptoParamArr = crypto_param.split('%20');
var acceptedCrypto = cryptoParamArr.join(' ');

$.ajax({
  url: '/api/cryptos_venues',
  method: 'GET'
}).then(function(data) {
  var venue = '';
  var venue_description = '';
  var cryptocurrencies = [];

  for (var i = 0; i < data.length; i++) {
    var table, row, div_venue, div_desc, div_crypto, cryptoList;

    if (acceptedCrypto === data[i].crypto_name) {
      venue = data[i].venue_name;
      venue_description = data[i].venue_description;

      for (var v = 0; v < data.length; v++) {
        if (venue === data[v].venue_name) {
          var crypto = data[v].crypto_name;
          cryptocurrencies.push(crypto);
        }
      }

      table = $('.table');
      row = $('<div class="row"></div>');
      div_venue = $(`<div class="cell" data-title="venue">${venue}</div>`);
      div_desc = $(
        `<div class="cell" data-title="description">${venue_description}</div>`
      );
      div_crypto = $(`<div class="cell" data-title="crypto"></div>`);

      cryptoList = cryptocurrencies.join(', ');
      div_crypto.text(cryptoList);

      row.append(div_venue);
      row.append(div_desc);
      row.append(div_crypto);
      table.append(row);

      cryptocurrencies = [];
    }
  }
});
