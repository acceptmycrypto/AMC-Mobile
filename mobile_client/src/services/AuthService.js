export const _signUp = (username, email, password, cryptoProfile) => {
	return fetch("http://localhost:3001/register/", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, email, password, cryptoProfile})
	  }).then(res => res.json())
}

export const _login = (email, password) => {
	return fetch("http://localhost:3001/signin/", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
			body: JSON.stringify({email, password})
		}).then(res => res.json())
  }

export async function _loadCryptocurrencies () {
  const cryptocurrencies = await fetch('http://localhost:3001/cryptocurrencies');
  const cryptos = await cryptocurrencies.json();

  return cryptos
}