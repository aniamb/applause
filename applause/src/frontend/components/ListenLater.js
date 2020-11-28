import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/ListenLater.css';
import axios from 'axios'
import { Divider } from '@material-ui/core';


class ListenLater extends Component{
  constructor(props){
      super(props);
      this.state = {
        listenLater:[],
        listenLaterText: "Remove from listen to later.",
      }
  }

  componentDidMount() {
    var currHandle = null;

    if (this.props.location.state.handle === "") {
      currHandle = sessionStorage.getItem('currentUser');
      console.log(currHandle);
    } else {
      currHandle = this.props.location.state.handle;
      console.log(currHandle);
    }

    axios.get('http://localhost:5000/listenlater', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        this.setState({listenLater: response.data})
        console.log(this.state.listenLater) 
      })
      .catch((err) => {
        console.log('error getting info');
      })
  }

  changeListenLater = (i) => {
      console.log("clicked")
    var user = sessionStorage.getItem('currentUser');
    axios.get('http://localhost:5000/removelistenlater', {
        params: {
            handle: user,
            albumName: this.state.listenLater[i][0],
            artistName: this.state.listenLater[i][1],
            albumArt: this.state.listenLater[i][2],
            albumId: this.state.listenLater[i][3]
        }
    })
    .then((response) => {
        console.log("Successfully removed from listen to later")
        var newListenLater = (this.state.listenLater).splice(i,1);
        console.log(newListenLater)
        this.setState({listenLater:newListenLater})
        window.location.reload();
    }).catch(() => {
        alert("Error removing from listen to later");
    })
}

toAlbum (text) {
    return event => {
      event.preventDefault()
      this.props.history.push('/albumpage/'+ text);
      console.log(text)
    }
  }

  render() {
    //   console.log("rendering")
    let listenLaterList = [];
    let albumHolder = this.state.listenLater;
    let albumHolderLength = albumHolder.length;
    if (albumHolderLength === 0) {
        listenLaterList.push (
            <h2>You don't have any albums in your listen to later list.</h2>
        )
    }else{
        for (let i = 0; i < albumHolder.length; i++) {
            console.log(albumHolder[i][0]);
            listenLaterList.push(
                <div className="grid-item">
                    <img class="resize" src={albumHolder[i][2]} style= {{width:"12vw", height:"12vw", paddingTop:"15px"}} alt="Avatar" onClick={this.toAlbum(albumHolder[i][0] + "/" + albumHolder[i][1] + "/" + albumHolder[i][3])}/>
                    <h1 className="listenAlbumName">{albumHolder[i][0]}</h1>
                    <h2 className="reviewArtistName">{albumHolder[i][1]}</h2>
                    <div className="removeBtn">
                            <input type="submit" value={this.state.listenLaterText} onClick={ () => this.changeListenLater(i)}/>
                    </div>  
                </div>
            )
        }
    }

    return (
        <div>
            <h1 className="pageTitle">Listen to Later Albums!</h1> 
            <div className="grid-container">
                {listenLaterList}
            </div>
        </div>
    );
  }
}

export default ListenLater;