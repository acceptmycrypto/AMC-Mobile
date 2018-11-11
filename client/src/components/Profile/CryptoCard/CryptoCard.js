import React from "react";
import "./CryptoCard.css";

const CryptoCard = props => {

    return (
        <div id="cryptoPortfolio" className="p-1 m-3 text-center w-100 white-bg">
            <h5 id="cryptoHeader" className="blueText header font-15">CRYPTO PORTFOLIO</h5>

            <label className="switch"><input type="checkbox" id="togBtn" onChange={props.handleToggleChange} /><div className="slider round"><span className="own">OWNED</span><span className="interest">INTERESTED</span></div></label>
            <div className="cryptoWallet">
                {(props.user_crypto.length > 0)

                    ?(props.crypto_view === "interested")
                        ? props.user_crypto.map((crypto, i) =>
                            <div key={"interested " + i}>
                                {
                                    (crypto.crypto_address === null)
                                        ? <div className="mx-1 my-2 cryptos">
                                            {/* <p>{crypto.crypto_symbol}</p> */}
                                            <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                            <br></br>
                                            <img className="cryptoImage" data-name={crypto.crypto_metadata_name} src={crypto.crypto_logo} data-id={crypto.id} onClick={props.handleAddressFormChange}></img>
                                            <br></br>
                                        </div>
                                        : null
                                }

                            </div>

                        )
                        : props.user_crypto.map((crypto, i) =>
                            <div key={"owned " + i}>
                                {
                                    (crypto.crypto_address !== null)
                                        ? <div className="mx-1 my-2 cryptos">
                                            <a className="blueText cryptoText link" href={crypto.crypto_link} target="_blank">{crypto.crypto_metadata_name}</a>
                                            <br></br>
                                            <img className="cryptoImage" data-name={crypto.crypto_metadata_name} data-address={crypto.crypto_address} data-id={crypto.id} src={crypto.crypto_logo} onClick={props.handleQRChange}></img>
                                            <br></br>
                                        </div>
                                        : null
                                }
                            </div>
                        )
                    : <div>Add Some Cryptos</div>
                }
                {props.children}
            </div>


        </div>
    );
}


export default CryptoCard;