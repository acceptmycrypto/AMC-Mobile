import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "../Notification";
import { _loadPhoto } from "../../../services/NavbarService";


class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      photo: ""
    }

  }

  logOut = () =>{
 
    localStorage.removeItem('token');
    this.props.history.push('/');
  }


  componentDidMount() {

    return _loadPhoto (localStorage.getItem('token')).then(photo => {
      this.setState({
        photo
      })

    });
  }


  render() {
    console.log(this.state);
    return (
      <header className="Toolbar">
        <div className="nav-left">
          <Link to="/feed/deals" className="Logo">
            AcceptMyCrypto
        </Link>
          <div className="Search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="Feed">
            <li>
              <Link to="/feed/deals">
                <i className="fas fa-dollar-sign" /> Matched Deals
            </Link>
            </li>
            <li>
              <Link to="/feed/friends">
                <i className="fas fa-user-friends" /> Matched Friends
            </Link>
            </li>
            <li>
              <Link to="/feed/transactions">
                <i className="fas fa-history" /> Transactions
            </Link>
            </li>
          </div>
        </div>
      <div className="Nav">
        <li>
          <Notification />
        </li>
        <li>
          <Link to="/community">
            <i className="fas fa-users" /> Community
          </Link>
        </li>
        <li>
        <div className="dropdown show m-0 p-0">
            <div className="dropdown-toggle picture-toggle m-0 p-0"  id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className={'fas mt-1 pt-1 px-2 user-icon-navbar ' + this.state.photo.photo}></i>

            </div>

            <div className="dropdown-menu m-0" aria-labelledby="dropdownMenuLink">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <Link className="dropdown-item" to="/settings">Settings</Link>
              <Link className="dropdown-item" to="/" onClick={this.logOut} >Logout</Link>
            </div>
          </div>

        </li>
      </div>
    </header>
  );
};
}

export default Navbar;


