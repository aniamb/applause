import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import { Avatar } from '@material-ui/core';
import StarRatings from 'react-star-ratings';

class RecArtists extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      reviewArray: [],
      artistArray: [],
      currUser: ""
    }
  }


componentDidMount() {

  // Finds the local user
  var lookupUser = sessionStorage.getItem("currentUser");
  this.setState({currUser: lookupUser});


  axios.get('http://localhost:5000/findartists', {
    params: {
      userHandle:lookupUser
    }
  }).then((r) => {
    
    // Grabs the array of reviews
    console.log(r.data)
    this.setState({artistArray: r.data});

  }).catch((err) => {
    console.log(err);
  });
}

toAlbum (text) {
  return event => {
    event.preventDefault()
    this.props.history.push('/albumpage/'+ text);
    console.log(text)
  }
}

toArtist (text) {
  return event => {
    event.preventDefault()
    this.props.history.push('/artistpage/'+ text);
    console.log(text)
  }
}

render() {


  

  var tempArtistArray = this.state.artistArray;
  var artists = []

  for (let i = 0; i < tempArtistArray.length; i++) {
    var oneReview = tempArtistArray[i];
    
    artists.push(
      <div className="grid-item" onClick={this.toArtist(oneReview.artist)}>
        <figure className="albumReview" >
          <img class="resize" src={oneReview.image} style= {{width:"7.5vw", height:"7.5vw", marginLeft:"50%"}} alt="Avatar"/>
        </figure>
        <div className="reviewContentProfile" style= {{textAlign: "center"}}>
          <h2 className="reviewArtistName">{oneReview.artist}</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="pageTitle">@{this.state.currUser}'s Recommended Artists!</h1> 
      <div className="grid-container">
        {artists}
      </div>
    </div>    
  );
}}

export default RecArtists;