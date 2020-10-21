import React, {Component} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Login.css';
import axios from 'axios'


class Followers extends Component{
  constructor(props){
      super(props);
      this.state = {
          username: "",
          currHandle: null,
          followerData: [],
          followerRedirect: false,
          navigate: false,
          userNames: [],
          hand: ""
      }
  }

  linkToProfile = (username) => {
      this.setState({navigate : true});
      this.setState({username: username});
  };  

  componentDidMount() {
    var currHandle = null;
    
    if (this.props.location.state.hand == "") {
      currHandle = localStorage.getItem('currentUser');
    } else {
      currHandle = this.props.location.state.hand;
    }
    axios.get('http://localhost:5000/followers', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        this.setState({followerData: response.data.results})
        this.setState({followerRedirect: true});
        
      })
      .catch((err) => {
        console.log('error getting info');
        this.setState({followerRedirect: false});

      })

  }

  render() {

    let userNames = [];


    console.log(this.state.followerData);
    console.log(this.state.followerData.length);
    
    for(let i = 0; i< this.state.followerData.length; i++){
        userNames.push(
            <div key={this.state.followerData[i]} className="searchResults">
                <h3>
                    <button onClick={() => this.linkToProfile(this.state.followerData[i])} >@{this.state.followerData[i]}</button>
                </h3>
            </div>
        )
    }

    return (
      
      <div className="Followers">
        
        <h1> Followers!</h1>
          <div className="row">
            <div className="userOrder">
                {userNames}
            </div>
          {this.state.navigate && <Redirect to={{
              pathname: '/viewprofile',
              state: {"username": this.state.username}
          }}/>}
          </div>
      </div>

    );
  }
}

export default Followers;