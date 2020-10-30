import React from 'react';
import '../styles/AlbumPage.css';
import StarRatings from 'react-star-ratings';
import Genius from '../styles/genius.png'

class AlbumPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        albumName:'',
        artistName:'',
        albumArt:'',
    }
}
 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  this.setState({albumArt: this.props.match.params.albumArt});
  
}
handleReviewSubmit(event){
    event.preventDefault();
    this.props.history.push('/review/'+ this.state.albumName +'/'+ this.state.artistName);
}
render() {
    var albumArt;
    albumArt = this.state.image;
    console.log(albumArt);
    var artName;
    artName = this.state.artistName;
    artName = artName.replaceAll(" ", "-");
    console.log("Name: " + artName);
    var albName;
    albName = this.state.albumName;
    albName = albName.replaceAll(" ", "-");
    console.log(albName);
    var link = "https://genius.com/albums/" + artName + "/" + albName;
    return (
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
                            <input type="submit" value="Review Later"/>
                            <input type="submit" value="Listen to Later" />
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
