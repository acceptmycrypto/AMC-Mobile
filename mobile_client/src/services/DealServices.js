let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';

export async function _loadDeals(token) {
  const settings = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };

  const dealsList = await fetch(url + '/home/categorized/deals', settings);
  const deals = await dealsList.json();

  return { deals };
}

export async function _loadDealItem(deal_name) {
  const dealItemArr = await fetch(url + `/api/deals/${deal_name}`);
  const dealItem = await dealItemArr.json();

  return dealItem;
}

export async function _fetchTransactionInfo(
  crypto_name,
  crypto_symbol,
  deal_id,
  amount,
  token,
  shippingAddress,
  shippingCity,
  zipcode,
  shippingState,
  fullName,
  selectedSize,
  selectedColor
) {
  return fetch(url + '/checkout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      crypto_name,
      crypto_symbol,
      deal_id,
      amount,
      token,
      shippingAddress,
      shippingCity,
      zipcode,
      shippingState,
      fullName,
      selectedSize,
      selectedColor
    })
  }).then(res => res.json());
}
