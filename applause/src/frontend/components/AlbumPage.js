import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import exampleImg from './gkmc.jpg';




class AlbumPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        value:'',
        navigate: false,
        albums: []

    }

  
}




render() {
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <h1>Album Name</h1>
                <h2>Artist Name</h2>
                <img src={exampleImg}></img>
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
export default AlbumPage