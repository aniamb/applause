import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Login.css';
import { Avatar } from '@material-ui/core';
import '../styles/Follow.css';
import axios from 'axios'


class Following extends Component{
  constructor(props){
      super(props);
      this.state = {
        username: "",
        currHandle: "",
        followingData: [],
        followingRedirect: false,
        navigate: false,
        userNames: [],
        hand: "",
        users: []
      }
  }

  linkToProfile = (username) => {
    // console.log("THIS IS: " + username);
    this.setState({navigate : true});
    this.setState({username: username});
  };

  componentDidMount() {
    // var currHandle = sessionStorage.getItem('currentUser');
    var currHandle = null;

    if (this.props.location.state.hand === "") {
      currHandle = sessionStorage.getItem('currentUser');
    } else {
      currHandle = this.props.location.state.hand;
    }

    console.log(currHandle);
    axios.get('http://localhost:5000/following', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        console.log(response)
        this.setState({followingData: response.data.results})
        this.setState({followingRedirect: true});

        var temp_users = [];
        
        console.log(this.state.followingData)

        for (let index = 0; index < this.state.followingData.length; index++) {

            console.log("Iterating with \t" + this.state.followingData[index]);

            axios.get('http://localhost:5000/profile', {
              params: {
                  userHandle: this.state.followingData[index]
              }
            })
            .then((r) => {   
              console.log("Got User");
              // this.setState({user: response.data});
              console.log(r);

              var temp = [];
              temp.push(r.data);
              
              var joined = this.state.users.concat(temp)
              this.setState({users: joined});

            })
            .catch((err) => {
                console.log('error getting info');
                console.log(err);
            });
        }

      })
      .catch((err) => {
       console.log('error getting info');
       this.setState({followingRedirect: false});
      })
}

unfollow = (username) => {
  var currHandle = null;

  if (this.props.location.state.hand === "") {
    currHandle = sessionStorage.getItem('currentUser');
  } else {
    currHandle = this.props.location.state.hand;
  }
  
  axios.get('http://localhost:5000/unfollow', {
      params: {
        userHandle: currHandle,
        unfollowUsername: username
      }
    }).then((response) => {
      console.log(response)
      this.setState({followingData: response.data})
      console.log(this.state.followingData)
      this.setState({followingRedirect: true});
      window.location.reload()
    })
    .catch((err) => {
     console.log('error getting info');
     this.setState({followingRedirect: false});
    })


}

whichUser = (username) => {
  if (username === sessionStorage.getItem('currentUser')) {
    return "/profile";
  } else {
    return '/viewprofile';
  }
};

importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

render() {

    let userNames = [];
    let images = this.importAll(require.context('../../public/', false));

    console.log(this.state.users);
    console.log(this.state.users.length);

    for(let i = 0; i< this.state.users.length; i++){
      if (i === 0) {
        console.log("Here")
      }

      let path = ""
      console.log(this.state.users[i]);

      if (this.state.users[i].meta_data !== "" && this.state.users[i].meta_data !== undefined) {
        path = this.state.users[i].meta_data.split("/")[3];
      }

      userNames.push(
          <div className="follow" onClick={() => this.linkToProfile(this.state.followingData[i])} >
            <div className="followProfPic">
              <Avatar 
                style={{
                  margin: "auto",
                  // marginLeft: "20%",
                  // marginTop: "5%",
                  float: "left",
                  width: "100px",
                  height: "100px",
                }} 
                variant="circle"
                src={images[path]}
                alt={this.state.users[i].firstname + " " + this.state.users[i].lastname}
              />
            </div>
            <div className="headerName">
              
              <h2>
                {this.state.users[i].firstname} {this.state.users[i].lastname}
              </h2>

              <h3>
                @{this.state.followingData[i]}
              </h3>
                {/* <button onClick={() => this.unfollow(this.state.followingData[i])}>Unfollow!</button> */}
            </div>
            </div>
      )
  }
  
  userNames.sort();

  return (

      <div className="header">

        <h1> Following!</h1>
          <div className="row">
            <div className="userOrder">
                {userNames}
            </div>
          {this.state.navigate && <Redirect to={{
              pathname: this.whichUser(this.state.username),
              state: {"username": this.state.username}
          }}/>}
          </div>
      </div>

    );
  }
}

export default Following;