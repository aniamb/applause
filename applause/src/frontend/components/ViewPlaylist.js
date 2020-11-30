import React from 'react';
import axios from 'axios';
import '../styles/Review.css';
import StarRatings from 'react-star-ratings';
import SpotifyPlayer from 'react-spotify-player';
var idk = [];

class ViewPlaylist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        playlisturi: '',
        artist: '',
        rating: 0,
        content: '',
        username: '',
        image:'',
        errorMessage: '',
        visibility: 'public'
    }
    
}


componentDidMount(){


  axios.get('http://localhost:5000/getplaylisturi', {

    })
    .then((response) => {
        // this.setState({rating: response.data[0].rating,
        //         content: response.data[0].content,
        //         image: response.data[0].image
        // });
        // if(response.data[0].private === false){
        //     this.setState({visibility: 'public'}); 
        // }else{
        //     this.setState({visibility: 'private'}); 
        // }
        console.log("hi")
        console.log(response.data);
        idk.push(response.data);
        console.log(idk);
        this.setState({
            artist: response.data
        })
        //console.log(this.state.visibility)
    }).catch(() => {
        alert("Error getting review");
    });


}

render() {
    console.log("in render");
    console.log(idk);
    const size = {
        width: '50%',
        height: 300,
      };
      const view = 'list'; // or 'coverart'
      const theme = 'black'; // or 'white'
    const uri = String(idk[0]);
    console.log(this.state.artist);
  return (
        <div>
          <h1>Open Spotify to find your new playlist!</h1>
          <br></br>
        <div>
        <SpotifyPlayer
            uri={this.state.artist}
            size={size}
            view={view}
            theme={theme}
        />
        </div>
        </div>
  );
}

}
export default ViewPlaylist