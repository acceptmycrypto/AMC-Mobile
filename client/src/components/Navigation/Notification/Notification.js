import React from "react";
import "./Notification.css";

class Notification extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="dropdown_notif">
        <i className="fas fa-bell button" onClick={this.showDropdownMenu} />
        <span className="num_notif">4</span>

        {this.state.displayMenu ? (
          <ul className="ul_notif">
            <li className="li_notif">
              <a className="active_notif" href="/">
                Notification Placeholder
              </a>
            </li>
            <li className="li_notif">
              <a className="all_notif" href="/notifications">
                All Notifications
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Notification;
