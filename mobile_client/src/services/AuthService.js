const url = 'http://localhost:3001/' || 'https://amc-web.herokuapp.com/';

export const _signUp = (username, email, password, cryptoProfile) => {
  return fetch('https://amc-web.herokuapp.com/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password, cryptoProfile })
  }).then(res => res.json());
};

export const _login = (email, password) => {
  return fetch('https://amc-web.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());
};

export async function _loadCryptocurrencies() {
  const cryptocurrencies = await fetch('https://amc-web.herokuapp.com/cryptocurrencies');
  const cryptos = await cryptocurrencies.json();

  return cryptos;
}
