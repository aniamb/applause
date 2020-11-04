import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from '@material-ui/core';

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
        "meta_data":"avatar.png"
    }

class ViewProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        isFollow: "Follow",
        userHandle: null,
        followerRedirect: false,
        followingRedirect: false,
        hand: "",
        path:""
    }
}

componentDidMount(){
    console.log("component mounted at view profile");
    //need to change this to use local storage
    // console.log(lookupUser);
    axios.get('http://localhost:5000/viewprofile', {
        params: {
            userHandle: this.props.location.state.username
        }
    })
    .then((response) => {

        this.setState({user: response.data});

        if (response.data.meta_data !== "") {
            this.setState({path: response.data.meta_data.split("/")[3]});
        }

        axios.get('http://localhost:5000/isFollow', {
            params: {
                userHandle: response.data.handle,
                currentHandle: sessionStorage.getItem("currentUser")
            }
        })
        .then((r) => {
            if (r.data)
                this.setState({isFollow:"Unfollow"});
            else
                this.setState({isFollow:"Follow"});

        })
        .catch((er) => {
            console.log(er);
        });

    })
    .catch((err) => {
        console.log('error getting info');
    });
}

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

folButton = (username) => {
  if (this.state.isFollow == "Unfollow")
    this.changeFollow(username)
}

changeFollow = (username) => {
  console.log(this.state.isFollow)
  console.log(username)

  // if (this.state.isFollow === "Unfollow") {
  //   axios.get('http://localhost:5000/unfollow', {

  //     params: {
  //       userHandle: sessionStorage.getItem("currentUser"),
  //       unfollowUsername: username
  //     }

  //   }).then((response) => {
      
  //     console.log(response)
    //   this.setState({isFollow:"Follow"});

    // }) .catch((err) => {
  //     console.log('error getting info');
  //   })
  // }
  // } else {
  //   axios.get('http://localhost:5000/followuser', {

  //     params: {
  //       userHandle: sessionStorage.getItem("currentUser"),
  //       followUsername: username
  //     }

  //   }).then((response) => {
      
  //     console.log(response)
  //     this.setState({isFollow:"Unfollow"})

  //   }) .catch((err) => {
  //     console.log('error getting info');
  //   })
  // }
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
                <button className="followBtn" onClick={this.folButton(this.state.user.handle)}>{this.state.isFollow}</button>
                {/* {this.changeFollow(this.state.user.handle)} */}
                <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>

                <div className="follow">

                    <div className="followers" onClick={this.followerRedirectFunc}> {this.state.user.followers.length} followers</div>
                        {this.state.followerRedirect && <Redirect to={{
                            pathname: '/followers',
                            state: {"hand": this.state.user.handle}
                        }}/>}

                    <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                        {this.state.followingRedirect && <Redirect to={{
                                pathname: '/following',
                                state: {"hand": this.state.user.handle}
                        }}/>}
                </div>
                <h2>{this.state.user.bio}</h2>

            </div>
            <div className="right">This is where the user's own reviews would be!</div>
        </div>
    </div>

  );
}

}
export default ViewProfile