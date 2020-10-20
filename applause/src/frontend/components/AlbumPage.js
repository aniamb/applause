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

            </div>
            <div className="right">This is where the user's own reviews would be!</div>
        </div>
    </div>

  );
}

}
export default AlbumPage