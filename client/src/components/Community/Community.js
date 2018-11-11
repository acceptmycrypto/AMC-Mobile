import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Community.css";
import Layout from "../Layout"
class Community extends Component {
    constructor() {
        super();
        this.state = {
            allCryptos:[]
        }
    }

    componentDidMount() {
        return fetch("http://localhost:3001/community")
        .then((res) => res.json())
        .then(allCryptos => {
            console.log(allCryptos);
            this.setState(allCryptos)
        })
    }

    render() {
        return (
            <div>
                <Layout/>
                <div>
                    <h1>all cryptos</h1>
                    {this.state.allCryptos.map(crypto =>
                    <Link to={"/forum/"+crypto.id} data-name={crypto.crypto_metadata_name}>
                        <i className="cryptoDiv" id={"cryptoDiv"+crypto.id} key={"cryptoDiv"+crypto.id} data-id={crypto.id} /> {crypto.crypto_metadata_name}
                    </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default Community;
