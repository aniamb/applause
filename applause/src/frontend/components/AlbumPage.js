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
    }

  
}

 componentDidMount () {
  console.log(this.props.match.params.albumName);
  this.setState({albumName: this.props.match.params.albumName});
  this.setState({artistName: this.props.match.params.artistName});
  this.setState({albumArt: this.props.match.params.albumArt});
  
}

render() {
    var albumArt;
    albumArt = this.state.albumName;
    console.log(albumArt);
    return (
      <div className="CreateAccount">
          <div className="container">
              <div className="left">
                  <h1>{this.state.albumName}</h1>
                  <h2>{this.state.artistName}</h2>
                  {/* <img src={this.state.image}></img> */}
                  <br></br>
                  <input type="submit" value="Review this Album" />
                  <h4> Learn more on Genius</h4>

              </div>
              <div className="right">Album-related reviews here</div>
          </div>
      </div>

    );

}

}

export default AlbumPage;
