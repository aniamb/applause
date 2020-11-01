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
        console.log("Status is: " + res.status);
        console.log(res.data.results);
        this.setState({reviews: res.data.results});
        //this.setState({navigate: true});
    })
    .catch(error => {
        console.error(error);
        //this.setState({navigate: false});
    })

  
}

render() {
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   var artistPic = sessionStorage.getItem(this.state.artistName);
   var albumArt = sessionStorage.getItem(this.state.albumId);
   console.log(sessionStorage.getItem(this.state.albumId));

   if (reviewHolder.length === 0) {
            allReviews.push (
            <h2>This artist currently has no reviews.</h2>
        )
   } else {

   for (let i = 0; i < reviewHolder.length; i++) {
    var albumArt = sessionStorage.getItem(this.state.albumId);
    //var albumIden = {reviewHolder[i].albumId };

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
                starDimension = "30px"
                starSpacing = "1px"
                name='rating'
            />
          </figcaption>
        </figure>
        <div className="reviewContent">
          <p className="reviewAlbum"><b>{reviewHolder[i].album}, {reviewHolder[i].artist}</b></p>
          <p className="reviewHandle">@{reviewHolder[i].username} {reviewHolder[i].time}</p> 
          <p className="reviewInfo">{reviewHolder[i].content}</p>
        </div>    
    </div>
        
        )
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
            <h2 className="sectionTitle">albums</h2> 
            <div className="grid">
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              </div>
            </div>
          <div className="artistReviews">
            <div className="artistReviewScroll">
              <h2 className="sectionTitle">top reviews</h2> 
              {allReviews}
          </div> 
        </div>
        </div>
      </div>

    );

}

}

export default ArtistPage;
