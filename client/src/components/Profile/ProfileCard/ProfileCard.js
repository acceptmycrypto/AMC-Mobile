import React from "react";
import "./ProfileCard.css";

const ProfileCard = props => {
    return (
        <div className="text-center">
            {props.user_info.map((userData, i) =>
                <div id="profile" data-id={userData.id} className="p-3 pb-0 ml-3 d-flex flex-column w-100 white-bg" key={"user" + i}>
                    {(userData.photo.indexOf("fa-user") !== -1)
                        ? <i className={'fas my-2 py-4 px-1 user-icon-shaded ' + userData.photo}></i>
                        : <img src={userData.photo}></img>
                    }

                    {/* <img id="responsive" data-id={userData.id} clasName="my-2 justify-content-center" src={this.state.src} alt="" /> */}
                    <h5 className="my-2 blueText font-15">{userData.username}</h5>
                    {(userData.first_name !== null &&  userData.last_name !== null)
                        ? <h5 className="my-2 capitalize blueText font-15">{userData.first_name}  {userData.last_name}</h5>
                        : null
                    }
                    {(userData.user_location !== null)
                        ? <h5 className="my-2 blueText font-15"> <i className="fas fa-map-marker-alt mr-1"></i>  {userData.user_location}</h5>
                        : null
                    }

                    <h5 className="my-2 blueText font-15"> <i className="fas fa-envelope mr-1"></i> <a className="blueText link" href={`mailto:${userData.email}`}>{userData.email}</a></h5>
                    {(userData.bio !== null)
                        ? <h5 className="my-2 font-italic blueText font-15">{userData.bio}</h5>
                        : null
                    }
                    
                </div>
            )}
        </div>
    );
}


export default ProfileCard;