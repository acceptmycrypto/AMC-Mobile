import React from "react";
import "./ProfileFeed.css";
import FeedCard from "../../Feed/FeedCard"
const ProfileFeed = props => {
    return (
        <FeedCard transactions={props.transactions} />
    );
}


export default ProfileFeed;