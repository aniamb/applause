import React from 'react';
import { Redirect} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import '../styles/Profile.css';
import axios from 'axios'

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
        "bio": "Lover of Pop, Harry Styles, and Country Music",
        "meta_data": "avatar.png"
    }

class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        logout:false,
        isFollow: "Follow",
        userHandle: null,
        followerRedirect: false,
        followingRedirect: false,
        hand: "",
        path:""
    }
}

async componentDidMount(){
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
        if (response.data.meta_data !== "") {
          this.setState({path: response.data.meta_data.split("/")[3]});
        }
        localStorage.setItem("currentUser", this.state.user.handle);
    })
    .catch((err) => {
        console.log('error getting info');
        console.log(err);
    });
}

editProfile = () => {
    this.setState({edit:true});
}

logout = () => {
    this.setState({logout:true});
    localStorage.clear();
    sessionStorage.clear();
}

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

changeFollow = () => {
    if (this.state.isFollow === "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}


importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

render() {

  let images = this.importAll(require.context('../../public/', false));

  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
               <Avatar 
                    style={{
                        marginLeft: "25px",
                        marginTop: "55px",
                        display: 'flex',
                        verticalAlign:"middle",
                        marginBottom: "-115px",
                        width: "100px",
                        height: "100px",
                    }} 
                    variant="circle"
                    src={images[this.state.path]}
                    alt={this.state.user.firstname + " " + this.state.user.lastname}
                />
                <p>@{this.state.user.handle}</p>
                <button className="followBtn" onClick={this.changeFollow}>{this.state.isFollow}</button>
                <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>
                <div className="follow">
                    <div className="followers" onClick={this.followerRedirectFunc}>{this.state.user.followers.length} followers</div>
                    {this.state.followerRedirect && <Redirect to={{
                            pathname: '/followers',
                            state: {"hand": localStorage.getItem('currentUser')}
                    }}/>}
                    <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                    {this.state.followingRedirect && <Redirect to={{
                            pathname: '/following',
                            state: {"hand": localStorage.getItem('currentUser')}
                    }}/>}
                </div>
                <h2>{this.state.user.bio}</h2>
                <button className = "edit" onClick={this.editProfile}>Edit Profile</button>
                {this.state.edit ? <Redirect to={{
                    pathname: '/editprofile',
                    state: {email: this.state.user.email}
                }}/>: null}
                <button className = "logout" onClick={this.logout}>Logout</button>
                {this.state.logout ? <Redirect to={{
                    pathname: '/login'
                }}/>: null}


            </div>
            <div className="right">This is where the user's own reviews would be!</div>
        </div>
    </div>

  );
}

}
export default Profile