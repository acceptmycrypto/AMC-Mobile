let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';

export async function _updateCryptoTable(crypto_address, id, token) {
  const crypto_settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ crypto_address, id, token })
  };

  const data = await fetch(
    url + '/profile/addAddress?_method=PUT',
    crypto_settings
  )
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(e => {
      return e;
    });

  const user_settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  };

  // const userProfileData = await fetch(url + '/profile', user_settings);
  // const user_info = await userProfileData.json();

  const userCryptoData = await fetch(url + '/profile/crypto', user_settings);
  const user_crypto = await userCryptoData.json();
  const crypto_view = await 'owned';
  const add_address = await false;

  return { user_crypto, crypto_view, add_address };
}

export async function _loadProfile(token) {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  };
  const profile = await fetch(url + '/profile', settings);
  const user_info = await profile.json();

  const profile_crypto = await fetch(url + '/profile/crypto', settings);
  const user_crypto = await profile_crypto.json();

  const profile_friends = await fetch(url + '/profile/friends', settings);
  const friends_array = await profile_friends.json();

  const profile_transactions = await fetch(
    url + '/profile/user/transactions',
    settings
  );
  const transactions = await profile_transactions.json();

  const remaining_options = await fetch(url + '/crypto/left', settings);
  const remaining_cryptos = await remaining_options.json();

  return { user_info, user_crypto, friends_array, transactions, remaining_cryptos};
}
