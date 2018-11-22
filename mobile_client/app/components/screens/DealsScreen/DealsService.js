let routeURL = "http://localhost:3000"

export const _loadPosts = () => {
	return fetch(routeURL + "/posts").then(res => res.json());
}

export const _addPosts = (title, location_id, user_id, price, information, ingredients) => {
	 return fetch(routeURL + "/posts", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        location_id,
        user_id,
        price,
        information,
        ingredients,
      }),
    }).then(res => res.json());
}

export const _loadOnePosts = (post_id) => {
	return fetch(routeURL + "/1").then(res => res.json());
}