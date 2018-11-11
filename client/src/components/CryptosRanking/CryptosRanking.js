import React, { Component } from "react";
import "./CryptosRanking.css";

class CryptosRankings extends Component {
  constructor() {
    super();

    this.state = {
      cryptosRanking: []
    };
  }

  async componentDidMount() {
    const cryptosList = await fetch("http://localhost:3001/api/cryptosranking");
    const cryptosRanking = await cryptosList.json();

    this.setState({ cryptosRanking });
  }

  render() {
    return (
      <div id="left" className="column cryptosRanking">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cryptocurrency</th>
              <th scope="col">Venues</th>
              <th scope="col">Price $</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cryptosRanking.map((crypto, i) => (
              <tr key={crypto+i}>
                <th scope="row">{i + 1}</th>
                <td><img src={crypto.crypto_logo} alt="crypto-logo"/> {crypto.crypto_symbol}</td>
                <td>{crypto.venues_count}</td>
                <td>{crypto.crypto_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CryptosRankings;
