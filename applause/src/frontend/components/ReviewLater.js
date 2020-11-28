import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/ReviewLater.css';
import axios from 'axios'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from '@material-ui/core';


class ReviewLater extends Component{
  constructor(props){
      super(props);
      this.state = {
        reviewLater:[],
        reviewLaterText: "Remove from review later.",
        isHovered:[],
        isYourProfile:true
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

    if(currHandle != sessionStorage.getItem('currentUser')){
        this.setState({isYourProfile:false})
    }

    axios.get('http://localhost:5000/reviewlater', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        this.setState({reviewLater: response.data})
        var hoverArray = []
        for(let i = 0;i<(response.data).length; i++){
            hoverArray.push(false);
        }
        this.setState({isHovered:hoverArray})
        console.log(this.state.reviewLater) 
      })
      .catch((err) => {
        console.log('error getting info');
      })
  }

  changeReviewLater = (i) => {
      console.log("clicked")
    var user = sessionStorage.getItem('currentUser');
    axios.get('http://localhost:5000/removereviewlater', {
        params: {
            handle: user,
            albumName: this.state.reviewLater[i][0],
            artistName: this.state.reviewLater[i][1],
            albumArt: this.state.reviewLater[i][2],
            albumId: this.state.reviewLater[i][3]
        }
    })
    .then((response) => {
        console.log("Successfully removed from review later")
        var newRemoveLater = (this.state.reviewLater).splice(i,1);
        console.log(newRemoveLater)
        this.setState({reviewLater:newRemoveLater})
        window.location.reload();
    }).catch(() => {
        alert("Error removing from review later");
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
    const isProfile = this.state.isYourProfile;
    let removeButton;
    let reviewLaterList = [];
    let albumHolder = this.state.reviewLater;
    let albumHolderLength = albumHolder.length;
    if (albumHolderLength === 0) {
        reviewLaterList.push (
            <h2>You don't have any albums in your review later list.</h2>
        )
    }else{
        for (let i = 0; i < albumHolder.length; i++) {
            console.log(albumHolder[i][0]);
            reviewLaterList.push(
                <div className="grid-item">
                    <img className="resize" src={albumHolder[i][2]} alt="Avatar" onClick={this.toAlbum(albumHolder[i][0] + "/" + albumHolder[i][1] + "/" + albumHolder[i][3])}/>
                    <h1 className="reviewAlbumName">{albumHolder[i][0]}</h1>
                    <h2 className="reviewArtistName">{albumHolder[i][1]}</h2>
                    <div className="removeBtn">
                            <input type="submit" value={this.state.reviewLaterText} onClick={ () => this.changeReviewLater(i)}/>
                    </div>  
                </div>
            )
        }
    }

    return (
        <div>
            <h1 className="pageTitle">@{this.props.location.state.handle}'s Review Later Albums!</h1> 
            <div className="grid-container">
                {reviewLaterList}
            </div>
        </div>
    );
  }
}

export default ReviewLater;