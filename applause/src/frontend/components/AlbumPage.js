import React from 'react';
import '../styles/Profile.css';

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

handleReviewSubmit(event){
    event.preventDefault();
    this.props.history.push('/review/'+ this.state.albumName +'/'+ this.state.artistName);
}

render() {
    var albumArt;
    albumArt = this.state.image;
    console.log(albumArt);
    var artName;
    artName = this.state.artistName;
    artName = artName.replaceAll(" ", "-");
    console.log("Name: " + artName);
    var albName;
    albName = this.state.albumName;
    albName = albName.replaceAll(" ", "-");
    console.log(albName);
    var link = "https://genius.com/albums/" + artName + "/" + albName;
    return (
      <div className="CreateAccount">
          <div className="container">
              <div className="left">
                  <h1>{this.state.albumName}</h1>
                  <h2>{this.state.artistName}</h2>
                  {/* <img src={this.state.image}></img> */}

                  <h3> Average Score:</h3>

                  <input type="submit" value="Listen to Later" />
                  <br></br>
                  <input type="submit" value="Review Later"/>
                  <br></br>
                  <input type="submit" value="Review this Album" onClick={this.handleReviewSubmit.bind(this)} />
                  <br></br>
                  <a href={link} >Learn more on Genius</a>
                 

              </div>
              <div className="right">Album-related reviews here</div>
          </div>
      </div>

    );

}

}

export default AlbumPage;
