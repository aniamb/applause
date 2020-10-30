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
    this.props.history.push('/review/'+ this.state.albumName +'/'+ this.state.artistName);
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
    var ratingWO = 0;
    
    albumArt = sessionStorage.getItem(albumId);
    console.log(albumArt);
   
 
 
    for (let i = 0; i < reviewHolder.length; i++) {

        ratingWO += reviewHolder[i].rating;
        console.log(ratingWO);
         allReviews.push (
         <div>
             <h2>Username: {reviewHolder[i].username}</h2>
             <h2>Album: {reviewHolder[i].album}</h2>
             <h2>Artist: {reviewHolder[i].artists}</h2>
             <h2>Rating: {reviewHolder[i].rating}</h2>
             <br></br>
         </div>
         )
    };
   ratingWO = ratingWO/(reviewHolder.length);


   this.rating = ratingWO.toFixed(2);

    
    //aggregateScore = rating;
    console.log(albumArt);
    return (
    //   <div className="CreateAccount">
    //       <div className="container">
    //           <div className="left">

    //               <img src={albumArt}/>
    //               <h1>{this.state.albumName}</h1>
    //               <h2>{this.state.artistName}</h2>
    //               <h3> Average Score:</h3>
    //                 <h3>{this.rating}</h3>
    //               <input type="submit" value="Listen to Later" />
    //               <br></br>
    //               <input type="submit" value="Review Later" />
    //               <br></br>
    //               <input type="submit" value="Review this Album" />
    //               <br></br>
    //               <a href={link} target="_blank">Learn more on Genius</a>

                 

                 

    //           </div>
    //           <div className="right">Album-related reviews here
    //           {allReviews}
    //           </div>
    //     </div>
    //     </div>

        // hello
      <div className="AlbumPage">
        <div className = "albumHolder">
            <div className="albumInfo">
                <div className="albumInfoTemp">
                    <br></br>
                    <br></br>
                    <br></br>
                    <img className ="albumPic" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <h1 className="albumSectionTitle">{this.state.albumName}</h1> 
                    <h2 className="albumArtistSectionTitle">{this.state.artistName}</h2>
                        <StarRatings
                                className="starRating"
                                rating= {4.3}
                                starRatedColor="rgb(243,227, 0)"
                                starHoverColor="rgb(243,227, 0)"
                                isSelectble = "true"
                                numberOfStars={5}
                                starDimension = "50px"
                                starSpacing = "1px"
                                name='rating'
                            />
                            <p className="totalRatings">(10)</p>
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
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                            <figcaption>
                                <StarRatings
                            className="starRating"
                            rating= {4}
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
                            <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                            <p className="reviewInfo">this album was so dope yall</p>
                        </div>    
                    </div>
               
               
                </div> 
            </div>
        </div>
      </div>

    );

}

}

export default AlbumPage;
