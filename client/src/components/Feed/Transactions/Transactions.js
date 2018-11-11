import React, { Component } from "react";
import "./Transactions.css";
import CryptoRankings from "../../CryptosRanking";
import FeedCard from "../FeedCard";
import Layout from "../../Layout";

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    //es6 Promise syntax
    //fetch transactions info
    const data = await fetch(
      "http://localhost:3001/api/transactions/community/payment_received"
    );
    const transactions = await data.json(); //convert to JSON format

    this.setState({ transactions });
  }

  render() {
    return (
      <div>
        <Layout/>
        <div className="transactions-content">
          <CryptoRankings />
          <div className="w-50">
            <FeedCard transactions={this.state.transactions} />
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
