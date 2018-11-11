import React, { Component } from "react";
import "./FriendsSettings.css";
import { _loadMatchedFriends, _makeFriends} from "../../../services/SettingsService";


class FriendsSettings extends Component {

    constructor() {
        super();

        this.state = {
            matched_friends: []
        }

    }

    handleClick = (event) =>{
        event.preventDefault();
        let matched_friend_id = event.target.getAttribute('data-id');
        
        let index = event.target.getAttribute('data-index');
        _makeFriends(localStorage.getItem('token'), matched_friend_id).then(res => {
            
            let tempArray = [];
            for(let j in this.state.matched_friends){
                if(this.state.matched_friends[j].id != matched_friend_id ){
                    tempArray.push(this.state.matched_friends[j])
                }
            }
            
            this.setState({
                matched_friends: tempArray
            });

        });
    }



    componentDidMount() {
        return _loadMatchedFriends(localStorage.getItem('token')).then(res => {
            

            this.setState({
                matched_friends: res.matched_friends
            });

        });
    }

    render() {


        return (
            <div className="w-100 mx-0 text-center">

                <h1 className="text-center lightBlueText"> Matched Friends </h1>

                {(this.state.matched_friends.length > 0)
                    ? this.state.matched_friends.map((friend, i) =>
                        <div className="mx-1 my-2 d-flex flex-column m-3 mb-5" key={friend + i} >
                            {(friend.photo.indexOf("fa-user") !== -1)
                                ? <i className={'fas my-2 p-2 user-icon-shaded w-25 margin-auto ' + friend.photo}></i>
                                : <img src={friend.photo}></img>
                            }
                            <p>{friend.username}</p>
                            <button className="btn btn-primary btn-sm my-2 w-25 margin-auto" data-id={friend.id} data-index={i} onClick={this.handleClick}>Add Friend</button>
                        </div>

                    )
                    : null
                }
            </div>
        );
    }
}


export default FriendsSettings;