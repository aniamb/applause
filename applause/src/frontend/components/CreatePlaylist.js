import React from 'react';
import axios from 'axios';
import '../styles/Review.css';
import SpotifyPlayer from 'react-spotify-player';
var idk = [];

class CreatePlaylist extends React.Component{
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

    setTimeout(() => {
        this.props.history.push('/viewplaylist');
    }, 2000);

}

render() {

  return (

        <h1>creating playlist...</h1>
  );
}

}
export default CreatePlaylist