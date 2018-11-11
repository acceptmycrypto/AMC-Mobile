export async function _loadPhoto(token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token })
  };
  const photo_data = await fetch("http://localhost:3001/navbar/photo", settings)
  const photo = await photo_data.json();



  return ({ photo });

}

export async function _isLoggedIn(token) {
  const login = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token })
  };
  const user_logged_in = await fetch("http://localhost:3001/loggedIn", login)

  const logged_in = await user_logged_in.json();

  return await (logged_in);


}