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
        reviews:[]
    }

  
}

 componentDidMount () {
  this.setState({artistName: this.props.match.params.artistName});
  console.log(this.props.match.params.artistName)
  
  
    axios.get('http://localhost:5000/getartistreviews', {
        params: {
            artistName: this.props.match.params.artistName
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
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   

   for (let i = 0; i < reviewHolder.length; i++) {
        allReviews.push (
        <div>
            <h2>Album: {reviewHolder[i].album}</h2>
            <h2>Artist: {reviewHolder[i].artists}</h2>
            <h2>Rating: {reviewHolder[i].rating}</h2>
            <br></br>
        </div>
        
        )
   }
    return (
      <div className="CreateAccount">
          <div className="container">
              <div className="left">

                  <h2>{this.state.artistName}</h2>
                  {/* <img src={this.state.image}></img> */}

                  <h3> Average Score: </h3>


                 

              </div>
              <div className="right">
              {allReviews}
                  
            </div>
              
          </div>
      </div>

    );

}

}

export default ArtistPage;
