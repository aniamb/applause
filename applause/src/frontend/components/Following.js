import React, {Component} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../css/Login.css';
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
        userNames: []
      }
  }

  linkToProfile = (username) => {
    // console.log("THIS IS: " + username);
    this.setState({navigate : true});
    this.setState({username: username});
  };

  componentDidMount() {
    var currHandle = localStorage.getItem('currentUser');
    axios.get('http://localhost:5000/following', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        this.setState({followingData: response.data.results})
        this.setState({followingRedirect: true});

      })
      .catch((err) => {
       console.log('error getting info');
       this.setState({followingRedirect: false});
      })
}

unfollow = (username) => {
  var currHandle = localStorage.getItem('currentUser');
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

    })
    .catch((err) => {
     console.log('error getting info');
     this.setState({followingRedirect: false});
    })
}



  render() {
    let userNames = [];

    console.log(this.state.followingData);
    console.log(this.state.followingData.length);

    for(let i = 0; i< this.state.followingData.length; i++){
      if (i === 0) {
        console.log("Here")
      }
      userNames.push(
          <div key={this.state.followingData[i]} className="searchResults">
              <h3>
                  <button onClick={() => this.linkToProfile(this.state.followingData[i])} >@{this.state.followingData[i]}</button>
                  <button onClick={() => this.unfollow(this.state.followingData[i])}>Unfollow!</button>
              </h3>
          </div>
      )
  }

    return (

      <div className="Following">
        <h1> Following!</h1>
          <div className="row">
            <div className="userOrder">
                {userNames}
            </div>
          {this.state.navigate && <Redirect to={{
              pathname: '/profile',
              state: {"username": this.state.username}
          }}/>}
          {/* <button onClick={}>Unfollow!</button> */}
          </div>
      </div>

    );
  }
}

export default Following;