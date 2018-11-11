import React, {Component} from "react";
import "./ProfileSettings.css";
import { Menu } from 'semantic-ui-react';

class ProfileSettings extends Component {
    constructor() {
        super();

        this.state = {
            activeItem: 'Edit Your Location'

        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    componentDidMount() {
    }

    render() {

        const { activeItem } = this.state

        return (
            <div className="d-flex flex-direction-row">
                <Menu pointing secondary vertical>
                    <Menu.Item
                        name='Edit Your Location'
                        active={activeItem === 'Edit Your Location'}
                        onClick={this.handleItemClick}
                    />
                     <Menu.Item
                            name='Edit Your Birthday'
                            active={activeItem === 'Edit Your Birthday'}
                            onClick={this.handleItemClick} 
                    />
    
                   <Menu.Item
                            name="Edit Your Email"
                            active={activeItem === "Edit Your Email"}
                            onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Edit Your Password'
                        active={activeItem === 'Edit Your Password'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                <div className="w-75 mx-0 text-center">

                    <h1 className="text-center lightBlueText">Profile Settings</h1>
                    {this.state.activeItem == "Edit Your Location" &&
                        <div>
                            <h4>Edit Your Location</h4>

                        </div>
                    }
                    {this.state.activeItem == "Edit Your Birthday" &&
                        <div>
                            <h4>Edit Your Birthday</h4>
                        
                        </div>
                    }
                    {this.state.activeItem == "Edit Your Email" &&
                        <div>
                            <h4>Edit Your Email</h4>
                            
                        </div>
                    }
                    {this.state.activeItem == "Edit Your Password" &&
                        <div>
                            <h4>Edit Your Password</h4>
                            
                        </div>
                    }


                </div>
            </div>

        );
    }
}


export default ProfileSettings;