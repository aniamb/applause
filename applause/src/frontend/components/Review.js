import React from 'react';

import axios from 'axios'



class Review extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        album: '',
        artist: '',
        rating: '',
        content: '',
        username: '',
        errorMessage: '',
    }
}
componentDidMount(){
  localStorage.clear();
}

handleAlbumChange(event) {
  this.setState({album: event.target.value})
}
handleArtistChange(event) {
  this.setState({lastname: event.target.value})
}
handleRatingChange(event) {
  this.setState({rating: event.target.value})
}
handleContentChange(event) {
  this.setState({content: event.target.value})
}

handleSubmit(event){
  event.preventDefault();
  event.target.reset();
  const reviewInfo = {album: this.state.album, artist: this.state.artist, rating: this.state.rating, content: this.state.content, username: this.state.username}
  axios.post('http://localhost:5000/createreview', reviewInfo).then(response=> {
    console.log(this.state.username);
    localStorage.setItem("currentUser", response.data);
    console.log('create review success');
  })
  .catch((err)=> {
    console.log('create review fail');
    console.log(err.response.data.message)
    this.setState({errorMessage: err.response.data.message});
  })
}
render() {
  const styles = {
    scoreWord: {
      fontSize: 15,
      color: "rgb(82,82,82)",
    }
  };
  return (
    <div className="Review">
            <div className="inputBox">
                <p> write a review </p>
                <form onSubmit={this.handleSubmit.bind(this)}>
                        <input className="inputCreate" type="text" name="album" placeholder="enter album name..." value={this.state.album}
                            onChange={this.handleAlbumChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="text" name="artist" placeholder="enter artist name..." value={this.state.artist}
                            onChange={this.handleArtistChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="text" name="rating" placeholder ="enter rating..." value={this.state.rating}
                            onChange={this.handleRatingChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="text" name="content" placeholder="write your review" value={this.state.content}
                            onChange={this.handleContentChange.bind(this)} required/><br></br>
                    
                        {this.state.errorMessage && <h5 className="error" style={{marginTop: "8px", marginBottom: "1px", color: "red"}}> { this.state.errorMessage } </h5>}
                    <input className="submitButton" type="submit" value="submit review"/><br></br>
                </form>
            </div>
        </div>

  );
}

}
export default Review