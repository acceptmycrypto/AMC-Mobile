import React, { Component } from "react";
import "./CryptocurrencySettings.css";
import { _loadCryptoSettings } from "../../../services/SettingsService";
import { Menu } from 'semantic-ui-react';


class CryptocurrencySettings extends Component {
    constructor() {
        super();

        this.state = {
            ownObj: [],
            interestedObj: [],
            activeItem: 'Crypto I am Are Interested In'

        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    componentDidMount() {
        return _loadCryptoSettings(localStorage.getItem('token')).then(res => {
            // console.log(res);

            let { user_crypto } = res;
            // console.log(user_info, user_crypto, friends_array, transactions);
            console.log(user_crypto);

            let ownObj = [];
            let interestedObj = [];

            for (let i in user_crypto) {
                if (user_crypto[i].crypto_address == null) {
                    interestedObj.push(user_crypto[i])
                }
                else {
                    ownObj.push(user_crypto[i]);
                }
            }
            console.log(ownObj, interestedObj);

            this.setState({ ownObj, interestedObj });

        });
    }

    render() {

        const { activeItem } = this.state

        return (
            <div className="d-flex flex-direction-row">
                <Menu pointing secondary vertical>
                    {this.state.interestedObj.length > 0
                        ? <Menu.Item
                            name='Crypto I am Are Interested In'
                            active={activeItem === 'Crypto I am Are Interested In'}
                            onClick={this.handleItemClick} />
                        : null
                    }
                    {this.state.ownObj.length > 0
                        ? <Menu.Item
                            name="Crypto I Own"
                            active={activeItem === "Crypto I Own"}
                            onClick={this.handleItemClick}
                        />
                        : null
                    }
                    <Menu.Item
                        name='Update Crypto Portfolio'
                        active={activeItem === 'Update Crypto Portfolio'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                <div className="w-75 mx-0 text-center">

                    <h1 className="text-center lightBlueText">Cryptocurrencies</h1>
                    
                    {this.state.activeItem == "Crypto I am Are Interested In" &&
                        <div>
                            <h4>Crypto I am Are Interested In</h4>
                            {this.state.interestedObj.length > 0
                                ? this.state.interestedObj.map((crypto, i) =>
                                    <div key={"interestedObj " + i}>
                                        <div className="mx-1 my-2 cryptos">
                                            <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                            <br></br>
                                            <img className="cryptoSmall" data-name={crypto.crypto_metadata_name} src={crypto.crypto_logo} data-id={crypto.id} ></img>
                                        </div>
                                    </div>
                                )
                                : null

                            }

                        </div>
                    }
                    {this.state.activeItem == "Crypto I Own" &&
                        <div>
                            <h4>Crypto I Own</h4>
                            {this.state.ownObj.length > 0
                                ? this.state.ownObj.map((crypto, i) =>
                                    <div key={"ownObj " + i}>
                                        <div className="mx-1 my-2 cryptos">
                                            <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                            <br></br>
                                            <img className="cryptoSmall" data-name={crypto.crypto_metadata_name} data-address={crypto.crypto_address} data-id={crypto.id} src={crypto.crypto_logo}></img>
                                        </div>
                                    </div>
                                )
                                : <h5>Add an address Below</h5>

                            }

                        </div>
                    }
                    {this.state.activeItem == "Update Crypto Portfolio" &&
                    <div>
                        <h4>Update Crypto Portfolio</h4>

                    </div>
                }

                </div>
            </div>

        );
    }
}


export default CryptocurrencySettings;