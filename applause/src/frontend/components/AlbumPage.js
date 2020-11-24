import React from 'react';
import '../styles/AlbumPage.css';
import StarRatings from 'react-star-ratings';
import Genius from '../styles/genius.png'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'

class AlbumPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        albumName:'',
        artistName:'',
        albumId:'',
        albumArt:'',
        reviews:[],
        rating:'',
        isReviewLater: 'Review Later',
        isListenToLater: 'Listen to Later',
        filter: "1"
    }
}
 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  this.setState({albumId: this.props.match.params.albumId});
  
    
  axios.get('http://localhost:5000/getalbumreviews', {
        params: {
            albumName: this.props.match.params.albumName
        }
    })
    .then(res => {
        console.log("Status is: " + res.status);
        console.log(res.data.results);
        this.setState({reviews: res.data.results});
    })
    .catch(error => {
        console.error(error);
    })  

}
handleReviewSubmit(event){
    event.preventDefault();
    console.log(this.state.albumId);
    this.props.history.push('/review/'+ this.state.albumName +'/'+ this.state.artistName + '/' + this.state.albumId);
}

changeReviewLater = () => {
    // console.log(sessionStorage.getItem('currentUser'));
    var user = sessionStorage.getItem('currentUser');
    var albumArtwork = sessionStorage.getItem(this.state.albumId);
    console.log(user)
    if (this.state.isReviewLater === "Review Later"){
        console.log(user)
        axios.post('http://localhost:5000/addreviewlater', {
            params: {
                handle: user,
                albumName: this.state.albumName,
                artistName: this.state.artistName,
                albumArt: albumArtwork
            }
        })
        .then((response) => {
            const data = response.data;
            console.log('Successfully added to review later');
            this.setState({isReviewLater:"Added to Review Later!"});
        })
        .catch(() => {
            alert("Error deleting reviews");
        });
    } else this.setState({isReviewLater:"Review Later"});
}

changeListenLater = () => {
    if (this.state.isListenToLater === "Listen to Later")
        this.setState({isListenToLater:"Added to Listen to Later!"});
    else this.setState({isListenToLater:"Listen to Later"});
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

    var albumArt;
    var artName;
    var albName;
    var albumId = this.state.albumId;
   
    artName = this.state.artistName;
    artName = artName.replaceAll(" ", "-");
    
    albName = this.state.albumName;
    albName = albName.replaceAll(" ", "-");
    var link = "https://genius.com/albums/" + artName + "/" + albName;
    
    
    let allReviews = [];
    let aggRating = [];
    let reviewHolder = this.state.reviews;
    this.sortData(reviewHolder)
    var reviewHolderLength = reviewHolder.length;
    var ratingWO = 0;
    
   if (reviewHolderLength === 0) {
    albumArt = sessionStorage.getItem(albumId);
   }else {
       albumArt = reviewHolder[0].image;
   }
    
   

    if (reviewHolderLength === 0) {
        allReviews.push (
            <h2>This album currently has no reviews.</h2>
        )
    } else {
        for (let i = 0; i < reviewHolder.length; i++) {

            ratingWO += reviewHolder[i].rating;
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

                <div className="albumCard">
                        <figure className="albumReview">
                            <img src={reviewHolder[i].image} alt="Avatar"/>
                                <figcaption>
                                    <StarRatings
                                className="starRating"
                                rating= {reviewHolder[i].rating}
                                starRatedColor="rgb(243,227, 0)"
                                starHoverColor="rgb(243,227, 0)"
                                isSelectble = "true"
                                numberOfStars={5}
                                starDimension = "30px"
                                starSpacing = "0px"
                                name='rating'
                            />
                                </figcaption>
                        </figure>
                        <div className="reviewContent">
                            <p className="reviewAlbum"><b>{this.state.albumName}, {this.state.artistName}</b></p>
                            <p className="reviewHandle">@{reviewHolder[i].username} </p>
                            <FontAwesomeIcon className="trash" icon={faHeart} size="sm"/> {reviewHolder[i].users_liked.length} 
                            <br></br>
                           <p className="reviewHandle">Posted: {date_format} {time_format}</p> 
                            <p className="reviewInfo">{reviewHolder[i].content}</p>
                        </div>    
                    </div>
                )
            
        }

        ratingWO = ratingWO/(reviewHolder.length);
        //console.log(ratingWO);
        ratingWO = parseInt(ratingWO);
        aggRating.push(ratingWO);
        console.log(aggRating);
    }
   
   

    return (

      <div className="AlbumPage">
        <div className = "albumHolder">
            <div className="albumInfo">
                <div className="albumInfoTemp">
                    <br></br>
                    <br></br>
                    <br></br>
                    <img className ="albumPic" src={albumArt} alt="Avatar"/>
                    <h1 className="albumSectionTitle">{this.state.albumName}</h1> 
                    <h2 className="albumArtistSectionTitle">{this.state.artistName}</h2>

                        {/* overall album rating */}
                        <StarRatings
                                className="starRating"
                                rating= {aggRating[0]}
                                starRatedColor="rgb(243,227, 0)"
                                starHoverColor="rgb(243,227, 0)"
                                isSelectble = "true"
                                numberOfStars={5}
                                starDimension = "50px"
                                starSpacing = "1px"
                                name='rating'
                            />
                            {/* add total rating */}
                            <p className="totalRatings">({reviewHolder.length})</p>
                        <br></br>
                        <br></br>
                        <input type="submit" className="reviewButton" value="Review this Album" onClick={this.handleReviewSubmit.bind(this)} />
                        <br></br>
                        <br></br>
                        <a href={link} target="_blank" rel="noopener noreferrer"><img title = "Learn More on Genius" style={{'height':'70px'}} src={Genius} alt="Genius"></img></a>
                        <div className="forLater">
                            <input type="submit" value={this.state.isReviewLater} onClick={this.changeReviewLater}/>
                            <input type="submit" value={this.state.isListenToLater} onClick={this.changeListenLater}/>
                        </div>                        
                </div>
            </div>
            <div className="albumReviews">
                <select className="dropdown-album" onChange={this.handleDropdownChange.bind(this)}>
                  <option value="1">Top Liked</option>
                  <option value="2">Most Recent</option>
                </select> 
                <br></br>
                <div className="albumReviewScroll">
                    {/* review cards */}
                    {allReviews}
                </div> 
            </div>
        </div>
      </div>

    );

}

}

export default AlbumPage;
