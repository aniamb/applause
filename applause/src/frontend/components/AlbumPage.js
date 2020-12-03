import React from 'react';
import '../styles/AlbumPage.css';
import StarRatings from 'react-star-ratings';
import Genius from '../styles/genius.png'
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
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
        tracks:[],
        rating:'',
        reviewLater: 'Review Later',
        listenLater: 'Listen to Later',
        filter: "1"
    }
}
 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  this.setState({albumId: this.props.match.params.albumId});


  axios.get('http://localhost:5000/getalbumtracks', {
        params: {
            albumId: this.props.match.params.albumId
        }
    })
    .then(res => {
        console.log("Status is: " + res.status);
        console.log(res.data);
        this.setState({tracks: res.data.results});
        console.log(this.state.tracks);
    })
    .catch(error => {
        console.error(error);
    })  
    
    
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
    this.isReviewLater();
    this.isListenLater();
}

isListenLater = () => {
    var listenLaterList = [];
    var currHandle = sessionStorage.getItem('currentUser');

    axios.get('http://localhost:5000/listenlater', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        listenLaterList = response.data
        console.log(listenLaterList) 
        for(let i = 0; i<listenLaterList.length; i++){
            if(listenLaterList[i][3] === this.state.albumId){
                this.setState({listenLater:"Remove from listen to later."})
            }
        }
      })
      .catch((err) => {
        console.log('error getting info');
      })
}

isReviewLater = () => {
    var reviewLaterList = [];
    var currHandle = sessionStorage.getItem('currentUser');

    axios.get('http://localhost:5000/reviewlater', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        reviewLaterList = response.data
        console.log(reviewLaterList) 
        for(let i = 0; i<reviewLaterList.length; i++){
            if(reviewLaterList[i][3] === this.state.albumId){
                this.setState({reviewLater:"Remove from review later."})
            }
        }
      })
      .catch((err) => {
        console.log('error getting info');
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
    if (this.state.reviewLater === "Review Later"){
        console.log(user)
        axios.post('http://localhost:5000/addreviewlater', {
            params: {
                handle: user,
                albumName: this.state.albumName,
                artistName: this.state.artistName,
                albumArt: albumArtwork,
                albumId: this.state.albumId
            }
        })
        .then((response) => {
            const data = response.data;
            console.log('Successfully added to review later');
            this.setState({reviewLater:"Remove from review later."});
        })
        .catch(() => {
            alert("Error adding to review later");
        });
    } else {
        axios.get('http://localhost:5000/removereviewlater', {
            params: {
                handle: user,
                albumName: this.state.albumName,
                artistName: this.state.artistName,
                albumArt: albumArtwork,
                albumId: this.state.albumId
            }
        })
        .then((response) => {
            console.log("Successfully removed from review later")
            this.setState({reviewLater:"Review Later"});
        }).catch(() => {
            alert("Error removing from review later");
        })
    }
}

changeListenLater = () => {
    var user = sessionStorage.getItem('currentUser');
    var albumArtwork = sessionStorage.getItem(this.state.albumId);
    if (this.state.listenLater === "Listen to Later"){
        console.log(user)
        axios.post('http://localhost:5000/addlistenlater', {
            params: {
                handle: user,
                albumName: this.state.albumName,
                artistName: this.state.artistName,
                albumArt: albumArtwork,
                albumId: this.state.albumId
            }
        })
        .then((response) => {
            const data = response.data;
            console.log('Successfully added to listen to later');
            this.setState({listenLater:"Remove from listen to later."});
        })
        .catch(() => {
            alert("Error adding to listen to later");
        });
    } else {
        axios.get('http://localhost:5000/removelistenlater', {
            params: {
                handle: user,
                albumName: this.state.albumName,
                artistName: this.state.artistName,
                albumArt: albumArtwork,
                albumId: this.state.albumId
            }
        })
        .then((response) => {
            console.log("Successfully removed from listen to later")
            this.setState({listenLater:"Listen to Later"});
        }).catch(() => {
            alert("Error removing from listen to later");
        })
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

redirectComment(id) {
    this.props.history.push('/comments/' + id);
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
    let trackList= [];
    let reviewHolder = this.state.reviews;
    this.sortData(reviewHolder)
    var reviewHolderLength = reviewHolder.length;
    var ratingWO = 0;
    
   if (reviewHolderLength === 0) {
    albumArt = sessionStorage.getItem(albumId);
   }else {
       albumArt = reviewHolder[0].image;
   }
    
    // trackList.push(<p className="trackText">Tracklist:</p> )
   for (let j = 0; j < this.state.tracks.length; j++) {
       trackList.push(
        // <p className="trackText">  {this.state.tracks[j]} </p> 
            <tr>
                <td>{this.state.tracks[j]}</td>
            </tr>
       )
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

                <div className="albumCardAlbum">
                        <figure className="albumReviewAlbum">
                            {/* <img src={reviewHolder[i].image} alt="Avatar"/> */}
                            <img class="resize" src={reviewHolder[i].image} style= {{width:"12vw", height:"12vw"}} alt="Avatar"/>
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
                            <h1>{reviewHolder[i].album}, {reviewHolder[i].artist}</h1>
                            <h2 className="dateInfo">reviewed by @{reviewHolder[i].username}  {date_format} <span className="time">{time_format}</span></h2>
                            <p className="reviewInfo">{reviewHolder[i].content}</p>
                            <FontAwesomeIcon className="trash" icon={faHeart} size="sm"/> {reviewHolder[i].users_liked.length}
                            <br></br>
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

      <div className="albumPage">
        <div className = "pageHolderAlbum">
            <div className="leftSideAlbum">
                <div className="albumInfo">
                    {/* <br></br>
                    <br></br>
                    <br></br>
                    <div class="tooltip">
                        <img className ="albumPic" src={albumArt} alt="Avatar"/>
                        <span class="tooltiptext">{trackList}</span>
                    </div> */}
                   <img className = "albumPic" src={albumArt} alt="albumPicAvatar"></img>
                    <h1 className="albumSectionTitle">{this.state.albumName}</h1> 
                    <h2 className="albumArtistSectionTitle"><span className="by">by</span> {this.state.artistName}</h2>

                    {/* overall album rating */}
                    <div className="ratingsAlbum">
                        <StarRatings
                                className="starRating"
                                rating= {aggRating[0]}
                                starRatedColor="rgb(243,227, 0)"
                                starHoverColor="rgb(243,227, 0)"
                                isSelectble = "true"
                                numberOfStars={5}
                                starDimension = "3vw"
                                starSpacing = "1px"
                                name='rating'
                            />
                            {/* add total rating */}
                            <p className="totalRatings">{reviewHolder.length} review</p>
                        </div>
                        <br></br>
                        <input type="submit" className="reviewButton" value="Review this Album" onClick={this.handleReviewSubmit.bind(this)} />

                        {/* <p className="trackText">Hover album art to view tracklist</p> */}
                        <a href={link}><button className="geniusBtn">Genius album <img className="geniusPic" title = "Learn More on Genius" src={Genius} alt="Genius"></img></button></a>

                        {/* <a href={link} target="_blank" rel="noopener noreferrer"><img title = "Learn More on Genius" style={{'height':'70px'}} src={Genius} alt="Genius"></img></a> */}
                        <div className="forLaterAlbum">
                            <input type="submit" value={this.state.reviewLater} onClick={this.changeReviewLater}/>
                            <input type="submit" value={this.state.listenLater} onClick={this.changeListenLater}/>
                        </div>                        
                </div>
                <div className="trackListAlbum">
                    <h1 className="trackListTitle">Track List</h1>
                    <table>
                        {trackList}
                    </table>
                </div>
            </div>

            <div className="albumReviews">
                <select className="dropdown-album" onChange={this.handleDropdownChange.bind(this)}>
                  <option value="1">Top Liked</option>
                  <option value="2">Most Recent</option>
                </select> 
                <div className="albumReviewScroll">
                    {allReviews}
                </div> 
            </div>
        </div>
      </div>

    );

}

}

export default AlbumPage;
