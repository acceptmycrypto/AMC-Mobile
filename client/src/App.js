import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";

import SignUp from "./components/Home/SignUp";
import SignIn from "./components/Home/SignIn";

import Profile from "./components/Profile/UserProfile";
import Friend from "./components/Profile/FriendProfile";
import Settings from "./components/UserSettings/Settings"


import Community from "./components/Community";
import CryptoForum from "./components/Community/CryptoForum"
// import FeedVenues from "./components/Feed/Venues";

import FeedDeals from "./components/Feed/Deals";
import DealItem from "./components/Feed/Deals/DealItem";
import FeedFriends from "./components/Feed/MatchedFriends";
import FeedTransactions from "./components/Feed/Transactions";
// import Layout from "./components/Layout";


import "./App.css";

class App extends Component {
  render() {
    return (
        <Switch>
          <div>
            {/* <Layout /> */}
              <Route exact path="/" component={SignIn} />
              <Route exact path="/SignUp" component={SignUp} />


              <Route exact path="/profile" component={Profile} />

              <Route path="/profile/:id" component={ (props) => < Friend {...props}/>} />

              
              <Route exact path ="/settings" component={Settings} />
              <Route exact path="/crypto" component={Crypto} />

              <Route exact path="/community" component={Community} />
              <Route path="/forum/:crypto_id" component={CryptoForum} />
              {/* <Route path="/feed/venues" component={FeedVenues} /> */}
              <Route exact path="/feed/deals" component={FeedDeals} /> 
              <Route path='/feed/deals/:deal_name' component={DealItem}/>

              <Route exact path="/feed/friends" component={FeedFriends} />
              <Route exact path="/feed/transactions" component={FeedTransactions} />

              {/* this will redirect none of the matched above Routes to the root route (when not logged in root route is sign in page and when logged in root route is deals page)  */}
              {/* additionally when not logged in this will not allow user to access any sites other than sign in or sign up */}
              <Redirect to="/"/>

            {/* <Layout /> */}
          </div>
        </Switch>
    );
  }
}

export default App;
