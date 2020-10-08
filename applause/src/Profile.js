import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import './Profile.css';
import axios from 'axios'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user =
    {
        "firstname":"Jane",
        "lastname":"Doe",
        "handle": "janedoe",
        "email":"1234@mail.net",
        "password":"1234",
        "reviews": {},
        "followers":{"1":"hi"},
        "following":{},
        "favorites":{},
        "groups":{},
        "bio": "Lover of Pop, Harry Styles, and Country Music"
    }

class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        isFollow: "Follow"
    }
}

componentDidMount(){
    console.log("component mounted");
    //need to change this to use local storage
    var lookupUser = sessionStorage.getItem("currentUser");
    console.log(lookupUser);
    axios.get('http://localhost:5000/profile', {
        params: {
            handle:lookupUser
        }
    })
    .then((response) => {   
        console.log("response received.");
        this.setState({user: response.data});
        localStorage.setItem("currentUser", this.state.user.handle);
    })
    .catch((err) => {
        console.log('error getting info');
    });
}

editProfile = () => {
    this.setState({edit:true});
}

changeFollow = () => {
    if (this.state.isFollow == "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}

render() {
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <FontAwesomeIcon className="prof" icon={faUserCircle} size="sm"/>
                <p>@{this.state.user.handle}</p>
                <button className="followBtn" onClick={this.changeFollow}>{this.state.isFollow}</button>
                <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>
                <div className="follow">
                    <div className="followers">{this.state.user.followers.length} followers</div>
                    <div className="following">{this.state.user.following.length} following</div>
                </div>
                <h2>{this.state.user.bio}</h2>
                <button className = "edit" onClick={this.editProfile}>Edit Profile</button>
                {this.state.edit ? <Redirect to='/editprofile'/> : null}

            </div>
            <div className="right">This is where the user's own reviews would be!</div>
        </div>
    </div>

  );
}

}
export default Profile