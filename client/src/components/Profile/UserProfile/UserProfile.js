import React, { Component } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import coinAddressValidator from "coin-address-validator";
import ProfileCard from "../ProfileCard";
import CryptoCard from "../CryptoCard";
import CryptoAddress from "../CryptoAddress";
import FriendCard from "../FriendCard";
import ProfileFeed from "../ProfileFeed";
import Layout from "../../Layout"
import { _updateCryptoTable, _loadProfile, _verifyUser } from "../../../services/UserProfileService";


class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      crypto_view: "owned",
      user_info: [],
      user_crypto: [],
      add_address: false,
      qr: false,
      users_cryptos_id: null,
      current_crypto_name: null,
      friends_array: [],
      transactions: []
    }

  }

  // updates state
  setCurrentState = (crypto_view, qr, add_address, users_cryptos_id, current_crypto_name) => {
    this.setState({ crypto_view, qr, add_address, users_cryptos_id, current_crypto_name });
  }


  // if status is show, all coins in wallet will be shown but if status is hide, all coins but the one clicked on will be hidden
  hideOrShowCoin = (status, parentDiv) => {
    // status can be either "show" or "hide"
    let surroundingDiv = document.querySelector(".cryptoWallet");
    let allChildren = surroundingDiv.children;

    if (status === "show") {
      // displays all the user's coins
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        element.style.display = "flex";
      }

      if (this.state.qr) { //if the QR is shown on the page
        this.hideOrShowAddress("hide"); // will hide the QR code and Wallet address when all the coins are shown
      }

    } else {
      // status is hide, all coins other than what user clicked on will be hidden
      for (let i = 0; i < allChildren.length; i++) {
        let element = allChildren[i]
        if (element != parentDiv) {
          element.style.display = "none";
        }
      }
    }
  }

  // if status is show, the QR code and Wallet Address will be shown, if status is hide, the QR code and Wallet Address will be removed from DOM
  hideOrShowAddress = (status, parentDiv, address) => {
    if (status === "show") {
      // the wallet address, QR code and delete button will be created and shown
      let surroundingDiv = document.querySelector(".cryptoWallet");

      let qr = document.createElement("img");
      qr.classList.add("qr");
      qr.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}`;

      let displayAddress = document.createElement("p");
      displayAddress.classList.add("address");
      displayAddress.innerHTML = address;
      surroundingDiv.append(qr, displayAddress);

      // let icon = document.createElement("i");
      // icon.classList.add("fas", "fa-times", "deleteIcon");
      // icon.addEventListener("click", this.hideQR);
      // icon.classList.add("deleteQR");
      // surroundingDiv.insertBefore(icon, parentDiv);

    } else {
      // status = "hide"

      console.log('hidden');
      let address = document.querySelector(".address");
      let qr = document.querySelector(".qr");
      // let deleteIcon = document.querySelector(".deleteIcon");

      // remove wallet address, QR code, and delete icon from DOM
      address.remove();
      qr.remove();
      // deleteIcon.remove();
    }
  }


  handleToggleChange = (event) => {
    let target = event.target.checked; // checkbox has property checked = true or checked = false;

    if (target) { // if checkbox is checked show interested coins
      this.setCurrentState("interested", false, false, null, null); // crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      this.hideOrShowCoin("show");

    } else { // if checkbox is not checked show owned coins
      this.setCurrentState("owned", false, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      this.hideOrShowCoin("show");
    }
  }

  handleQRChange = (event) => {
    if (this.state.qr) {
      // after click of coin, if in state qr = true then show all coins and set state
      this.hideOrShowCoin("show");

      this.setCurrentState(this.state.crypto_view, false, this.state.add_address, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

    } else {
      // after click of coin, if in state qr = false then change qr = true in state and hide all other coins and show the QR and wallet address of the coin that was clicked on
      let target = event.target; // coin that was clicked on
      let parentDiv = target.parentElement.parentElement;
      let address = target.getAttribute("data-address");

      console.log(parentDiv);

      this.hideOrShowCoin("hide", parentDiv);

      this.hideOrShowAddress("show", parentDiv, address);

      this.setCurrentState(this.state.crypto_view, true, this.state.add_address, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name
    }
  }

  handleAddressFormChange = (event) => {

    let target = event.target;
    let parentDiv = target.parentElement.parentElement;

    let users_cryptos_id = target.getAttribute("data-id");
    let current_crypto_name = target.getAttribute("data-name");


    if (this.state.add_address) {
      // when add wallet form is hidden then show all coins

      this.hideOrShowCoin("show");

      this.setCurrentState(this.state.crypto_view, this.state.qr, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

    } else {
      // when add wallet address form is shown then hide other coins

      this.hideOrShowCoin("hide", parentDiv);

      this.setCurrentState(this.state.crypto_view, this.state.qr, true, users_cryptos_id, current_crypto_name); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name
    }
  }

  updateCryptos = (event) => {
    event.preventDefault();

    let id = this.state.users_cryptos_id;
    let current_crypto_name = this.state.current_crypto_name.trim();
    let crypto_address = event.target.children[0].value;
    let validAddress = true;

    // TO DO: FIX LITECOIN VALIATION ISSUE

    // commented out for now because is not working
    
    // coin-address-validator does not list Verge as a supported currency type to validate by currency name so will validate manually
    // if (current_crypto_name === "Verge" && crypto_address.indexOf(" ") === -1 && crypto_address[0] === "D" && crypto_address.length === 34) {
    //   validAddress = true;

    // } else if (crypto_address > 20 && coinAddressValidator.validate(crypto_address, current_crypto_name)) {
    //   // use coin-address-validator to validate the crypto address for the specific crypto selected
    //   validAddress = coinAddressValidator.validate(crypto_address, current_crypto_name)
 
  
    // } else {
    //   validAddress = false;
      
    // }

    if (validAddress) {

      this.updateCryptoTable(crypto_address, id).then(res => {
        // update users crypto wallet address in database
      
        //update state
        let { user_info, user_crypto, crypto_view, add_address } = res;
        this.setState({ user_info, user_crypto, crypto_view, add_address });
      
        //set toggle button checked = false
        document.querySelector("#togBtn").checked = false;

        // show all coins
        this.hideOrShowCoin("show");
      })

    } else {
      event.target.children[0].value = "Invalid Address";
    }

  }

  // update database with users new added wallet address
  updateCryptoTable = (crypto_address, id) => {
    return _updateCryptoTable(crypto_address, id, localStorage.getItem('token'));
  }


  componentDidMount() {
  
    return _loadProfile(localStorage.getItem('token')).then(res => {
      // console.log(res);

      let { user_info, user_crypto, friends_array, transactions } = res;
      // console.log(user_info, user_crypto, friends_array, transactions);
     
      this.setState({ user_info, user_crypto, friends_array, transactions });
      
    });



  }


  render() {
    console.log(this.state);
    // console.log(this.props.location.pathname);
    // console.log(this.props.match.params);

    return (
      <div>
        <Layout/>
        <div className="userProfile d-flex flex-row justify-content-between">
          <div className="d-flex flex-column width-20">

            <ProfileCard user_info={this.state.user_info} />

            <CryptoCard handleToggleChange={this.handleToggleChange} handleAddressFormChange={this.handleAddressFormChange} handleQRChange={this.handleQRChange} crypto_view={this.state.crypto_view} user_crypto={this.state.user_crypto}>

              {this.state.add_address &&
                <CryptoAddress updateCryptos={this.updateCryptos} updateCryptoTable={this.updateCryptoTable} />
              }

            </CryptoCard>


          </div>

          <div className="width-60 mx-5">
            <ProfileFeed transactions={this.state.transactions} />
          </div>

          <div className="width-20 mr-3">       
            <FriendCard friends_array={this.state.friends_array} />
          </div>

        </div>
      </div>
    );
  }
}

export default UserProfile;
