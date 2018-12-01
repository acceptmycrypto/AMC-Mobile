let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';

export const _signUp = (username, email, password, cryptoProfile) => {
  return fetch(url + '/register/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password, cryptoProfile })
  }).then(res => res.json());
};

export const _login = (email, password) => {
  return fetch(url + '/signin/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());
};

export const _verifier = token => {
  console.log('VERIFIER!!!' + JSON.stringify({ token }));
  return fetch(url + '/profile/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  }).then(res => res.json());
};

export async function _loadCryptocurrencies() {
  const cryptocurrencies = await fetch(url + '/cryptocurrencies/');
  const cryptos = await cryptocurrencies.json();

  return cryptos;
}
