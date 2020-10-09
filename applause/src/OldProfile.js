import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editRedirect: false,
            userDisplayName: null,
            userHandle: null,
            followerData: [],
            followingData: [],
            followerRedirect: false,
            followingRedirect: false,
            bio: ""
        }
    }

    componentDidMount(){
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/profile', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            var first = response.data.firstname;
            var last = response.data.lastname;
            var displayName = first.charAt(0).toUpperCase() + first.substring(1) + " " + last.charAt(0).toUpperCase() + last.substring(1);
            console.log(displayName);
            this.setState({userDisplayName: displayName});
            this.setState({userHandle: '@'+currHandle});
            this.setState({bio: response.data.bio});


            })
          .catch((err) => {
           console.log('error getting info');
          })
    }

    editProfileRedirect = () => {
      this.setState({editRedirect: true});
    };

    printFollowers = (ev)  => {
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/followers', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            this.setState({followerData: this.state.followerData.concat([response.data.results])})
            this.setState({followerRedirect: true});
            console.log(this.state.followerData);
          })
          .catch((err) => {
           console.log('error getting info');
           this.setState({followerRedirect: false});

          })
    }

    printFollowing = (ev)  => {
        // console.log("got into function")
        var currHandle = localStorage.getItem('currentUser');
        axios.get('http://localhost:5000/following', {
            params: {
              userHandle: currHandle
            }
          }).then((response) => {
            // console.log('yeet' + response.data.results);
            this.setState({followingData: this.state.followingData.concat([response.data.results])})
            // console.log(this.state.followingData);
            this.setState({followingRedirect: true});

          })
          .catch((err) => {
           console.log('error getting info');
           this.setState({followingRedirect: false});
          })
    }
 render(){

    let currHandle = localStorage.getItem('currentUser');

    return (
        <div className="UserProfile">
        <br/>
            <div className="row">
                {/* User Profile */}
                <div className="column">
                    {/* <button className = "redirect"><img id="settings" onClick = {this.editProfileRedirect}/></button> */}
                    <button className = "redirect" id="settings" onClick = {this.editProfileRedirect}>Edit Profile</button>
                    {this.state.editRedirect ? <Redirect to='/editprofile'/> : null}
                        <div className="circle"/>
                        <br/>
                        <h3>{this.state.userDisplayName}</h3>
                        <h6>{this.state.userHandle}</h6>
                        <p>{this.state.bio}</p>
                        <hr/>
                        <button onClick = {this.printFollowers}>Followers</button>
                        {this.state.followerRedirect && <Redirect to={{
                                    pathname: '/followers',
                                    state: {"list": this.state.followerData}
                                }}/>}
                        <button onClick = {this.printFollowing}>Following</button>
                        {this.state.followingRedirect && <Redirect to={{
                                    pathname: '/following',
                                    state: {"list": this.state.followingData}
                                }}/>}
                </div>
            </div>

    </div>
    )
    }
}

export default Profile