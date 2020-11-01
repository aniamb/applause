import React from 'react';
import { NavLink, Redirect} from 'react-router-dom';
import '../styles/Profile.css';
import axios from 'axios';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user =
    {
        "firstname":"",
        "lastname":"",
        "handle": "",
        "email":"",
        "password":"",
        "reviews": {},
        "followers":{},
        "following":{},
        "favorites":{},
        "groups":{},
        "bio": ""
    }

class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        isFollow: "Follow",
        userHandle: null,
        followerRedirect: false,
        followingRedirect: false,
    }
}

componentDidMount(){
    console.log("component mounted");
    //need to change this to use local storage
    var lookupUser = sessionStorage.getItem("currentUser");
    console.log(lookupUser);
    axios.get('http://localhost:5000/profile', {
        params: {
            userHandle:lookupUser
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

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

changeFollow = () => {
    if (this.state.isFollow == "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}

render() {
  return (
    <div className="Profile">
        <div className="container2">
            <div className="left">
                <FontAwesomeIcon className="prof" icon={faUserCircle} size="sm"/>
                <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>
                <p>@{this.state.user.handle}</p>
                <button className="followBtn" onClick={this.changeFollow}>{this.state.isFollow}</button>
                <div className="follow">
                    <div className="followers" onClick={this.followerRedirectFunc}>{this.state.user.followers.length} followers</div>
                      {this.state.followerRedirect ? <Redirect to='/followers'/> : null}
                    <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                    {this.state.followingRedirect ? <Redirect to='/following'/> : null}
                </div>
                <h2>{this.state.user.bio}</h2>
                <button className = "edit" onClick={this.editProfile}>Edit Profile</button>
                {/* {this.state.edit ? <Redirect to='/editprofile'/> : null} */}
                {this.state.edit ? <Redirect to={{
                    pathname: '/editprofile',
                    state: {email: this.state.user.email}
                }}/>: null}
            </div>
            <div className="right">This is where the user's own reviews would be!</div>
        </div>
    </div>

  );
}

}
export default Profile