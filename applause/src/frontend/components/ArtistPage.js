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

render() {
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   var artistPic = sessionStorage.getItem(this.state.artistName);
   let allAlbums = [];
  
   

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

        // var flag = 0
        // for (let j = 0; j < reviewHolder.length; j++) {
        //   if (reviewHolder[i].album === reviewHolder[j].album) {
        //     console.log(reviewHolder[i].album);
        //     console.log(reviewHolder[j].album);
        //     flag = 1;
        //     console.log(flag);
        //   }
        // }
        // console.log(flag);

        // if (flag === 1) {
          allAlbums.push (
            <div className="album">
            <img className="albumgrid" src={sessionStorage.getItem(reviewHolder[i].albumId)} alt=""></img>
            <p>{reviewHolder[i].album}</p>
          </div>
          )
        // }

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
              {allAlbums}
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
