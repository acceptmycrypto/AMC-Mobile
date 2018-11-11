import React, { Component } from "react";
import "./MatchedFriends.css";
import CryptoRankings from "../../CryptosRanking";
import FeedCard from "../FeedCard";
import Layout from "../../Layout";
import { Link } from "react-router-dom";

class MatchedFriends extends Component {
  constructor() {
    super();

    this.state = {
      friends_transactions: []
    };
  }

  async componentDidMount() {
    let token = await localStorage.getItem('token');
    const user_settings  = await {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };

    const data = await fetch("http://localhost:3001/matchedFriends/feed", user_settings);
    const friends_transactions = await data.json(); //convert to JSON format

    this.setState({ friends_transactions });
  }

  render() {
    return (
      <div>
        <Layout/>
        <div className="transactions-content">
          <CryptoRankings />
          <div className="w-50">
          { this.state.friends_transactions.length > 0
            ? <FeedCard transactions={this.state.friends_transactions}/>
            : <h2 className="text-center"><Link to={`/feed/deals`} style={{ textDecoration: 'none'}}>Make Purchases to get Matched with Friends who have bought items with the same Crypto</Link></h2>
          }
            
          </div>
        </div>
      </div>
    );
  }
}

export default MatchedFriends;