import React, {Component} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../css/Login.css';
import axios from 'axios'


class Followers extends Component{
  constructor(props){
      super(props);
      this.state = {
          username: "",
          currHandle: "",
          followerData: []
      }
  }

  linkToProfile = (username) => {
    // console.log("THIS IS: " + username);
    this.setState({navigate : true});
    this.setState({username: username});
};  

  render() {
    let userNames = [];

    for(let i = 0; i< this.props.location.state.list[0].length; i++){
        userNames.push(
            <div key={this.props.location.state.list[0][i]} className="searchResults">
                <h3>
                    <button onClick={() => this.linkToProfile(this.props.location.state.list[0][i])} >@{this.props.location.state.list[0][i]}</button>
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
              pathname: '/profile',
              state: {"username": this.state.username}
          }}/>}
          </div>
      </div>

    );
  }
}

export default Followers;