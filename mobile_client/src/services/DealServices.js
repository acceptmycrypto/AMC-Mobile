export async function _loadDeals(token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  const dealsList = await fetch("http://localhost:3001/api/deals", settings);
  const deals = await dealsList.json();

  return {deals}
}

export async function _loadDealItem (deal_name) {
  const dealItemArr = await fetch(`http://localhost:3001/api/deals/${deal_name}`);
  const dealItem = await dealItemArr.json();

  return dealItem
}

export async function _fetchTransactionInfo (crypto_name, crypto_symbol, deal_id, amount, token) {

	return fetch('http://localhost:3001/checkout', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({crypto_name, crypto_symbol, deal_id, amount, token})
    }).then(res => res.json())
    
}