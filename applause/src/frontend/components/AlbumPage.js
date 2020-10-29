import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import exampleImg from './gkmc.jpg';




class AlbumPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        albumName:'',
        artistName:'',
        albumArt:'',
        reviews:[],
        rating:''
    }

  
}

 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  this.setState({albumArt: this.props.match.params.albumArt});
  
    
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



render() {
    var albumArt;
    albumArt = this.state.image;
    var artName;
    artName = this.state.artistName;
    artName = artName.replaceAll(" ", "-");
    var albName;
    albName = this.state.albumName;
    albName = albName.replaceAll(" ", "-");
    var link = "https://genius.com/albums/" + artName + "/" + albName;
    
    let allReviews = [];
    let reviewHolder = this.state.reviews;
    let aggregateScore;
    var ratingWO = 0;
    
 
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
   console.log(ratingWO.toFixed(2));

   this.rating = ratingWO.toFixed(2);
   console.log(this.rating);
    
    //aggregateScore = rating;

    return (
      <div className="CreateAccount">
          <div className="container">
              <div className="left">
                  <h1>{this.state.albumName}</h1>
                  <h2>{this.state.artistName}</h2>
                  {/* <img src={this.state.image}></img> */}

                  <h3> Average Score:</h3>
                    <h3>{this.rating}</h3>
                  <input type="submit" value="Listen to Later" />
                  <br></br>
                  <input type="submit" value="Review Later" />
                  <br></br>
                  <input type="submit" value="Review this Album" />
                  <br></br>
                  <a href={link} target="_blank">Learn more on Genius</a>

                 

                 

              </div>
              <div className="right">Album-related reviews here
              {allReviews}
              </div>
          </div>
      </div>

    );

}

}

export default AlbumPage;
