import React from 'react';
import '../styles/Profile.css';
import axios from 'axios'
import StarRatings from 'react-star-ratings';

class RecAlbums extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      reviewArray: [],
      currUser: ""
    }
  }


componentDidMount() {

  // Finds the local user
  var lookupUser = sessionStorage.getItem("currentUser");
  this.setState({currUser: lookupUser});
  console.log(lookupUser)

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
      <div className="grid-item" onClick={this.toAlbum(oneReview.album + "/" + oneReview.artist + "/" + oneReview.albumId)}>
        <figure className="albumReview" style= {{width:"100%"}}>
          <img class="resize" src={oneReview.image} style= {{width:"7.5vw", height:"7.5vw", margin:"0 auto"}} alt="Avatar"/>
          <figcaption style= {{width:"100%", margin: "0 auto"}}>
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
        <div className="reviewContentProfile" style= {{textAlign: "center"}}>
          <h1 className="listenAlbumName">{oneReview.album}</h1>
          <h2 className="reviewArtistName">{oneReview.artist}</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="pageTitle">@{this.state.currUser}'s Recommended Albums!</h1> 
      <div className="grid-container">
        {albums}
      </div>
    </div>    
  );
}}

export default RecAlbums;