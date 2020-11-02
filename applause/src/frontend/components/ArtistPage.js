import React from 'react';
import '../styles/ArtistPage.css'
import StarRatings from 'react-star-ratings';
import axios from 'axios';


class ArtistPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        albumName:'',
        artistName:'',
        albumArt:'',
        artistPic:'',
        albumId:'',
        reviews:[]
    }
  
}

 componentDidMount () {
  this.setState({artistName: this.props.match.params.artistName});
  
    axios.get('http://localhost:5000/getartistreviews', {
        params: {
            artistName: this.props.match.params.artistName
        }
    })
    .then(res => {

        console.log(res.data.results);
        this.setState({reviews: res.data.results});
        //this.setState({navigate: true});
    })
    .catch(error => {
        console.error(error);
        //this.setState({navigate: false});
    })

  
}

toAlbum (text) {
  return event => {
    event.preventDefault()
    this.props.history.push('/albumpage/'+ text);
    console.log(text)
  }
}

render() {
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   var artistPic = sessionStorage.getItem(this.state.artistName);
   let allAlbums = [];
   let albumCheck = new Array(3);
  
   

   if (reviewHolder.length === 0) {
            allReviews.push (
            <h2>This artist currently has no reviews.</h2>
        )
   } else {

   for (let i = 0; i < reviewHolder.length; i++) {
    var albumArt = sessionStorage.getItem(this.state.albumId);


        allReviews.push (
        <div className="card">
        <figure className="albumReview">
          <img src={sessionStorage.getItem(reviewHolder[i].albumId)} alt="Avatar"/>
          <figcaption>
            <StarRatings
                className="starRating"
                rating= {reviewHolder[i].rating}
                starRatedColor="yellow"
                starHoverColor="yellow"
                isSelectble = "true"
                numberOfStars={5}
                starDimension = "29px"
                starSpacing = "0px"
                name='rating'
            />
          </figcaption>
        </figure>
        <div className="reviewContent">
          <p className="reviewAlbum"><b>{reviewHolder[i].album}, {reviewHolder[i].artist}</b></p>
          <p className="reviewHandle">@{reviewHolder[i].username} </p> 
          <br></br>
          <p className="reviewHandle">Posted: {reviewHolder[i].time}</p> 
          <p className="reviewInfo">{reviewHolder[i].content}</p>
        </div>    
    </div>
        
        )

        
        for (let j = 0; j < reviewHolder.length; j++) {

          
         if (albumCheck.includes(reviewHolder[i].album)) {

          }else {
            console.log(albumCheck.includes(reviewHolder[i].album));
            allAlbums.push (
              <div className="album">
              <img className="albumgrid" src={sessionStorage.getItem(reviewHolder[i].albumId)} alt="" onClick={this.toAlbum(reviewHolder[i].album + "/" + reviewHolder[i].artist + "/" + reviewHolder[i].albumId )}></img>
              <p>{reviewHolder[i].album}</p>
            </div>
            )

            albumCheck.push(reviewHolder[i].album);
          }

        }

   }

  
  }
    return (

      <div className="ArtistPage">
        <div className="artistHeader">
          <img className="artistPic" src={artistPic} alt=""></img>
          <div className="artistDiv"><h1 className="artistName2">{this.state.artistName}</h1></div>
        </div>
        <br></br>
        <br></br>
        <div className = "holder">
          <div className="allAlbums">
            <h2 className="sectionTitle">Reviewed Albums</h2> 
            <div className="grid">
              {allAlbums}
              </div>
          </div>
          <div className="artistReviews">
            <div className="artistReviewScroll">
              <h2 className="sectionTitle">Reviews of music by {this.state.artistName}</h2> 
              {allReviews}
          </div> 
        </div>
        </div>
      </div>

    );

}

}

export default ArtistPage;
