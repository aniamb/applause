import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import { Avatar } from '@material-ui/core';
import StarRatings from 'react-star-ratings';

class RecAlbums extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      reviewArray: [],
    }
  }


componentDidMount() {

  // Finds the local user
  var lookupUser = sessionStorage.getItem("currentUser");

  axios.get('http://localhost:5000/findalbums', {
    params: {
      userHandle:lookupUser
    }
  }).then((r) => {
    
    // Grabs the array of reviews
    console.log(r.data)
    this.setState({reviewArray: r.data});

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

render() {


  var tempReviewArray = this.state.reviewArray;
  var albums = []

  for (let i = 0; i < tempReviewArray.length; i++) {
    var oneReview = tempReviewArray[i];
    
    albums.push(
      <div className="albumCardProfile" onClick={this.toAlbum(oneReview.album + "/" + oneReview.artist + "/" + oneReview.albumId)}>
        <figure className="albumReview" >
          <img class="resize" src={oneReview.image} style= {{width:"12vw", height:"12vw"}} alt="Avatar"/>
          <figcaption>
            <StarRatings
              className="starRating"
              rating= {oneReview.rating}
              starRatedColor="rgb(243,227, 0)"
              starHoverColor="rgb(243,227, 0)"
              isSelectble = "true"
              numberOfStars={5}
              starDimension = "30px"
              starSpacing = "1px"
              name='rating'
            />
          </figcaption>
        </figure>
        <div className="reviewContentProfile">
          <p className="reviewAlbumProfile">
            <b>{oneReview.album} by {oneReview.artist}</b>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="Followers">
      <h1> Recommended Albums!</h1>
      <div className="AlbumPage">
        <div className = "albumHolder">
          <div className="albumInfo">
            <div className="albumInfoTemp">
              {albums}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}}

export default RecAlbums;