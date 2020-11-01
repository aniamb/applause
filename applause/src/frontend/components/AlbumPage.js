import React from 'react';
import '../styles/AlbumPage.css';
import StarRatings from 'react-star-ratings';
import Genius from '../styles/genius.png'
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
        isListenToLater: 'Listen to Later'
    }
}
 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  //this.setState({albumArt: this.props.match.params.albumArt}); 
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
        //this.setState({navigate: true});
    })
    .catch(error => {
        console.error(error);
        //this.setState({navigate: false});
    })  

}
handleReviewSubmit(event){
    event.preventDefault();
    console.log(this.state.albumId);
    this.props.history.push('/review/'+ this.state.albumName +'/'+ this.state.artistName + '/' + this.state.albumId);
}

changeReviewLater = () => {
    if (this.state.isReviewLater === "Review Later")
        this.setState({isReviewLater:"Added to Review Later!"});
    else this.setState({isReviewLater:"Review Later"});
}

changeListenLater = () => {
    if (this.state.isListenToLater === "Listen to Later")
        this.setState({isListenToLater:"Added to Listen to Later!"});
    else this.setState({isListenToLater:"Listen to Later"});
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
    let reviewHolder = this.state.reviews;
    var reviewHolderLength = reviewHolder.length;
    var ratingWO = 0;
    
    albumArt = sessionStorage.getItem(albumId);
    console.log(albumArt);

   
    if (reviewHolderLength === 0) {
        allReviews.push (
            <h2>This album current has no reviews.</h2>
        )
    } else {


        for (let i = 0; i < reviewHolder.length; i++) {

            ratingWO += reviewHolder[i].rating;




                allReviews.push (

                <div className="albumCard">
                        <figure className="albumReview">
                            <img src={albumArt} alt="Avatar"/>
                                <figcaption>
                                    <StarRatings
                                className="starRating"
                                rating= {reviewHolder[i].rating}
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
                        <div className="reviewContent">
                            <p className="reviewAlbum"><b>{this.state.albumName}, {this.state.artistName}</b></p>
                            <p className="reviewHandle">@{reviewHolder[i].username} </p> 
                            <br></br>
                           <p className="reviewHandle">Posted: {reviewHolder[i].time}</p> 
                            <p className="reviewInfo">{reviewHolder[i].content}</p>
                        </div>    
                    </div>
                )
            
        }
    }
   ratingWO = ratingWO/(reviewHolder.length);




   this.rating = ratingWO;
   console.log(this.rating);

    
    //aggregateScore = rating;
    console.log(albumArt);
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
                                rating= {0}
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
