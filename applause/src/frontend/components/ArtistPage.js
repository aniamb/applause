import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import exampleImg from './gkmc.jpg';




class ArtistPage extends React.Component{
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
  this.setState({artistName: this.props.match.params.artistName});
  

  
}

render() {
   
    return (
      <div className="CreateAccount">
          <div className="container">
              <div className="left">

                  <h2>{this.state.artistName}</h2>
                  {/* <img src={this.state.image}></img> */}

                  <h3> Average Score: </h3>


                 

              </div>
              <div className="right">Album-related reviews here</div>
          </div>
      </div>

    );

}

}

export default ArtistPage;