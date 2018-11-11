import React, { Component } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { Menu } from "semantic-ui-react"
import ProfileSettings from "../ProfileSettings";
import PrivacySettings from "../PrivacySettings";
import FriendsSettings from "../FriendsSettings";
import CryptocurrencySettings from "../CryptocurrencySettings";
import TransactionsSettings from "../TransactionsSettings";


class Settings extends Component {

    constructor() {
        super();

        this.state = {
            activeItem: "Profile Settings",
            color: "teal"
        };
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }
    


    render() {
        const { color } = this.state
        const { activeItem } = this.state

        return (


            <div>
                <Layout />
                <div className="mr-4 ml-4">
                    <Menu color={color} inverted widths={5}>
                        <Menu.Item name="Profile Settings" active={activeItem === "Profile Settings"} onClick={this.handleItemClick} />
                        <Menu.Item
                            name="Privacy Settings"
                            active={activeItem === "Privacy Settings"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name="Matched Friends"
                            active={activeItem === "Matched Friends"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name="Cryptocurrency"
                            active={activeItem === "Cryptocurrency"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name="Transactions"
                            active={activeItem === "Transactions"}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <div>
                        { this.state.activeItem == "Profile Settings" && <ProfileSettings/>}
                        { this.state.activeItem == "Privacy Settings" && <PrivacySettings/>}
                        { this.state.activeItem == "Cryptocurrency" && <CryptocurrencySettings/>}
                        { this.state.activeItem == "Matched Friends" && <FriendsSettings/>}
                        { this.state.activeItem == "Transactions" && <TransactionsSettings/>}


                    </div>
                </div>

            </div>

        );
    }
}

export default Settings;
