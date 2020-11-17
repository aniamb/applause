import React from 'react';
import axios from 'axios';
import '../styles/Review.css';
import StarRatings from 'react-star-ratings';

class Review extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        album: '',
        artist: '',
        albumId: '',
        rating: 0,
        content: '',
        username: '',
        errorMessage: '',
        visibility: 'public'
    }
    this.changeRating= this.changeRating.bind(this)
}
componentDidMount(){
  this.setState({username: sessionStorage.getItem("currentUser"),
                album: this.props.match.params.album,
                artist: this.props.match.params.artist,
                albumId: this.props.match.params.albumId
  });
}
handleAlbumChange(event) {
  this.setState({album: event.target.value})
}
handleArtistChange(event) {
  this.setState({artist: event.target.value})
}
changeRating( newRating, name ) {
  this.setState({rating: newRating });
}
handleContentChange(event) {
  this.setState({content: event.target.value})
}
handleOptionChange(event) {
  this.setState({visibility: event.target.value});
  console.log(this.state.visibility);
}

handleSubmit(event){
  event.preventDefault();
  event.target.reset();
  let privateBoolean = false;
  if(this.state.visibility === "public"){
    privateBoolean = false;
  } else {
    privateBoolean = true;
  }
  const currentDate = Date.now();
 // const dateObj = new Date(currentDate);
  
  const reviewInfo = {album: this.state.album, artist: this.state.artist, rating: this.state.rating, username: this.state.username, content: this.state.content, private: privateBoolean, time: currentDate, albumId: this.state.albumId, image: sessionStorage.getItem(this.state.albumId)}
  axios.post('http://localhost:5000/createreview', reviewInfo).then(response=> {
    console.log(response.data);
    console.log('create review success');
    //this.props.history.push('/albumpage/'+ this.state.album + '/' + this.state.artist);
    this.props.history.goBack();
  })
  .catch((err)=> {
    console.log('create review fail');
  })
}
render() {

  var albumId = this.state.albumId;
  var albumArt;
  albumArt = sessionStorage.getItem(albumId);
    console.log(albumArt);

  return (
    <div className="Review">
      <div className="reviewTitle">
        <p className="pReview"> write a review </p>
      </div>
            <div className="inputBoxReview">
                <form className = "reviewForm" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="column">
                  <img className="albumArt" src={albumArt} alt=""></img>
                        <h1 className="albumName">{this.state.album}</h1>
                        <h3 className="artistName">{this.state.artist}</h3>
                        <StarRatings
                        rating={this.state.rating}
                        starRatedColor="yellow"
                        starHoverColor="yellow"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        />
                        <br></br>
                  </div>
                  <div className="double-column">
                        <textarea className="actualReview inputCreateReview" type="text" name="content" placeholder="write your review" value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} required/><br></br>
                        <div className="bottomRow">
                        <input className="submitButtonReview" type="submit" value="post review"/>
                          <div className="options">
                            <input type="radio" id="public" name="visibility" value="public" checked={this.state.visibility === 'public'} onChange = {this.handleOptionChange.bind(this)}/>
                              <label for="public">public</label>
                            <input type="radio" id="private" name="visibility" value="private" checked={this.state.visibility === 'private'} onChange = {this.handleOptionChange.bind(this)}/>
                              <label for="private">private</label>
                          </div>  
                        </div>
                  </div> 
                </form>
            </div>
        </div>

  );
}

}
export default Review