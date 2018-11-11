$.ajax({
  url: '/api/cryptos_venues',
  method: 'GET'
}).then(function(data) {
  console.log(data);
  var venue = '';
  var venue_description = '';
  var crypto = '';
  var cryptocurrencies = [];

  for (var i = 0; i < data.length; i++) {
    var table, row, div_venue, div_desc, div_crypto, cryptoList;

    if (venue !== data[i].venue_name) {
      venue = data[i].venue_name;
      venue_description = data[i].venue_description;
      crypto = data[i].crypto_name;

      table = $('.table');
      row = $('<div class="row"></div>');
      div_venue = $(`<div class="cell" data-title="venue">${venue}</div>`);
      div_desc = $(
        `<div class="cell" data-title="description">${venue_description}</div>`
      );
      div_crypto = $(`<div class="cell" data-title="crypto">${crypto}</div>`);

      cryptocurrencies = [];
      cryptocurrencies.push(crypto);

      row.append(div_venue);
      row.append(div_desc);
      row.append(div_crypto);
      table.append(row);
    } else {
      crypto = data[i].crypto_name;
      cryptocurrencies.push(crypto);
      cryptoList = cryptocurrencies.join(', ');
      div_crypto.text(cryptoList);
    }
  }
});
