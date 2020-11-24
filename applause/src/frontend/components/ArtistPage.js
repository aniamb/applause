import React from 'react';
import '../styles/ArtistPage.css'
import StarRatings from 'react-star-ratings';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        reviews:[],
        filter: "1"
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

handleDropdownChange(event) {
  event.preventDefault();
  this.setState({filter: event.target.value});
}

sortData(reviewHolder){
  if(this.state.filter === "1"){
    //top liked
    reviewHolder.sort(
      function(a, b) {          
         if (a.users_liked.length === b.users_liked.length) {
            return new Date(b.time).getTime() - new Date(a.time).getTime()
         }
         return b.users_liked.length - a.users_liked.length
      });
  }else{
    //most recent
    reviewHolder.sort(
      function(a, b) {  
        let dateA =  new Date(a.time).getTime();
        let dateB =  new Date(b.time).getTime()      
         if (dateA  === dateB) {
            return b.users_liked.length - a.users_liked.length;
         }
         return dateB - dateA
      });
  }
}

render() {
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   this.sortData(reviewHolder)
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
    let date = new Date(reviewHolder[i].time);
       
    date.setHours(date.getHours()+2);
    var isPM = date.getHours() >= 12;
    var isMidday = date.getHours() === 12;
    var minutes = date.getMinutes();
    if(date.getMinutes() < 10){
      minutes = "0" + date.getMinutes();
    }
    var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
        minutes].join(':') + (isPM ? 'pm' : 'am');
  //   let time_format = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + time;
    let date_format = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    let time_format = time

        allReviews.push (
        <div className="card">
        <figure className="albumReview">
          <img src={reviewHolder[i].image} alt="Avatar"/>
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
          <FontAwesomeIcon className="trash" icon={faHeart} size="sm"/> {reviewHolder[i].users_liked.length}
          <br></br>
          <p className="reviewHandle">Posted: {date_format} {time_format}</p> 
          <p className="reviewInfo">{reviewHolder[i].content}</p>
        </div>    
    </div>
        
        )

        

        
        for (let j = 0; j < reviewHolder.length; j++) {

          
         if (albumCheck.includes(reviewHolder[i].album)) {

          }else {
            console.log(albumCheck.includes(reviewHolder[i].album));
            console.log(reviewHolder[i].image);
            console.log(reviewHolder[i]);
            allAlbums.push (
              <div className="album" onClick={this.toAlbum(reviewHolder[i].album + "/" + reviewHolder[i].artist + "/" + reviewHolder[i].albumId )}>
              <img className="albumgrid" src={reviewHolder[i].image} alt="" ></img>
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
              <div className="reviewSectionTitle">
                <h2 id = "reviewSectionHeader" className="sectionTitle">Reviews of music by {this.state.artistName}</h2>
                <select className="dropdown" onChange={this.handleDropdownChange.bind(this)}>
                  <option value="1">Top Liked</option>
                  <option value="2">Most Recent</option>
                </select> 
              </div>
              {allReviews}
          </div> 
        </div>
        </div>
      </div>

    );

}

}

export default ArtistPage;
