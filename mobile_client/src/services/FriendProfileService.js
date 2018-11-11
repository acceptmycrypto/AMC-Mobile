
  export async function _loadFriendProfile (id, token) {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, token})
    };

    const profile = await fetch("http://localhost:3001/friend/profile", settings)
    const user_info = await profile.json();
  
    const profile_crypto = await fetch("http://localhost:3001/friend/profile/crypto", settings)
    const user_crypto = await profile_crypto.json();
  
  
    const profile_friends = await fetch("http://localhost:3001/friend/profile/friends", settings)
    const friends_array = await profile_friends.json();
  
    const profile_transactions = await fetch("http://localhost:3001/friend/profile/user/transactions", settings)
    const transactions = await profile_transactions.json();

    const redirect_initial = await fetch("http://localhost:3001/friend/isUser", settings)
    const redirect = await redirect_initial.json();
    
    return({user_info, user_crypto, friends_array, transactions, redirect});
  
  }