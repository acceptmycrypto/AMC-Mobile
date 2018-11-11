export async function _loadCryptoSettings (token) {
    const Cryptosettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const profile_crypto = await fetch("http://localhost:3001/profile/crypto", Cryptosettings)
    const user_crypto = await profile_crypto.json();

    return({user_crypto});
  
  }

  export async function _loadMatchedFriends (token) {
    const Matchedsettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const matched = await fetch("http://localhost:3001/profile/matched/friends", Matchedsettings)
    const matched_friends = await matched.json();

    return({matched_friends});
  
  }

  export async function _makeFriends (token, matched_friend_id) {
    const Friendssettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token, matched_friend_id})
    };
 
  
    const friendship = await fetch("http://localhost:3001/settings/make/friends", Friendssettings)
    const friends = await friendship.json();

    return("done");
  
  }

  export async function _loadAllTransactions (token) {
    const Transactionssettings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
 
  
    const allTransactions = await fetch("http://localhost:3001/profile/user/transactions", Transactionssettings)
    const transactions = await allTransactions.json();

    return({transactions});
  
  }