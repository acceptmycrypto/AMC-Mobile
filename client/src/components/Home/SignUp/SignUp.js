import "./SignUp.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { _signUp, _loadCryptocurrencies } from "../../../services/AuthService";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      cryptoOptions: [],
      cryptoProfile: [],
      hasAgreed: false,
      redirect: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return _loadCryptocurrencies().then(cryptos => {

      let cryptoOptions = [];

      cryptos.map(crypto => {

        let optionObj = {};
        optionObj.value = crypto.crypto_metadata_name;
        optionObj.label = crypto.crypto_metadata_name + " " + "(" + crypto.crypto_symbol + ")";

        cryptoOptions.push(optionObj);
      })

      this.setState({cryptoOptions});
    });
  }



  //this function handles the change of crypto option user selects everytime
  //selectedOptions is an array of object
  //we need to map through the array and get the value of each object
  handleDropdownChange = selectedOptions => {
    let SelectedCryptos = [];
    selectedOptions.map(crypto => {
      SelectedCryptos.push(crypto.value);
    })
    console.log(SelectedCryptos);

    this.setState({
      cryptoProfile: SelectedCryptos //this is what we get [Bitcoin, Litecoin, ...] as user select the option
    });

  };

  //function to handle when user clicks submit button to register
  handleSubmit(e) {
    e.preventDefault();

    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.state.cryptoProfile;

    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (!username || !email || !password) {
      alert("Please enter in the required field!");
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log("message sent from server if success: ", res);
        //TODO
        //prompt users to check their email
      });
    }
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name);
  }

  state = {
    selectedOptions: null
  };

  render() {
    const { selectedOptions } = this.state;
    if(localStorage.getItem('token')){
      this.props.history.push('/feed/deals');
    }
    return (
      <div className="App">
        <div className="App__Aside">
            <img className="crypto-img img-fluid mb-5 d-block mx-auto" src="../../../assets/images/logo.png" alt=""></img>
            <h1 className="text-uppercase mb-0">Accept My Crypto</h1>
            <hr className="star-light"></hr>
            <h2 className="font-weight-light mb-0">
            <ul>
              <br></br>
              <li><i class="homepage-icons fas fa-dollar-sign"></i>
                  Grab Deals for Purchase with Cryptocurrency
                </li>
              <br></br>

              <li><i class="homepage-icons fa fa-user" aria-hidden="true"></i>
               Find Friends with Matching Currencies
              </li>
              <br></br>
              <li><i class="homepage-icons fa fa-users" aria-hidden="true"></i>
                Engage with Your Crypto Community
              </li>
            </ul>
            </h2>
          </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink
              exact
              to="/"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/SignUp"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign Up
            </NavLink>
          </div>
          <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">
                  User Name
                </label>
                <input
                  type="username"
                  id="username"
                  className="FormField__Input"
                  placeholder="Enter your desired User Name"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="FormField__Input"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="cryptoProfile">
                  Your Cryptocurrency Portfolio
                </label>

                {/* <input type="text" id="cryptoProfile" className="FormField__Input" placeholder="Your Crypto Profile" name="email" value={this.state.cryptoProfile} onChange={this.handleChange} /> */}
                <Select

                  required
                  value={selectedOptions}
                  onChange={this.handleDropdownChange}
                  options={this.state.cryptoOptions}
                  isMulti={true}
                  autoBlur={false}

                />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox"
                    type="checkbox"
                    name="hasAgreed"
                    value={this.state.hasAgreed}
                    onChange={this.handleChange}
                  />
                  I agree all statements in
                  <a href="#" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="FormField">
                <button className="FormField__Button mr-10">
                  Sign Up
                </button>
                <Link to="/" className="FormField__Link">
                  I'm already member
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
