// this res.json will be exported to either coordinates.js(the file where we have
// the current coordinates)
// or we can just give straight to the mapSearch.js file and sort it there
// It's probably better to do it in the coordinates.js so we can filter out
// what variables should hold coordinates and what variables should hold the names and
// description etc.

export const _getMapLocations = crypto => {
  return fetch("http://localhost:3000/maplocations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    // In the stringify argument, we will put the search information
    // namely the crypto currency the user wants to search for
    body: JSON.stringify({ crypto })
  }).then(res => res.json());
};
