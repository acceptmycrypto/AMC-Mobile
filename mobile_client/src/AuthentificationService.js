let url = "http://localhost:3000";

export const _register = (username, email, password) => {

  return fetch(url + '/register/', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
  }).then(res => res.json());
};

export const _login = (username, password) => {

  return fetch(url + '/login/', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }).then(res => res.json());
};

export const _verifier = token => {

  console.log('VERIFIER!!!' + JSON.stringify({ token }));
  return fetch(url + '/verifier/', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  }).then(res => res.json());
};
