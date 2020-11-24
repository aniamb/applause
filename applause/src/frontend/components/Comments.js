import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Feed.css';
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";


class Comments extends Component{
  constructor(props){
      super(props);
      this.state = {
          reviewAlbum: "",
          reviewArtist: "",
          reviewAlbumId: "",
          reviewImage:  "",
          reviewRating: -1,
          reviewUsername: "",
          reviewContent: "",
          reviewLikes: "",
          reviewComments: [],
          reviewTime: "",
          navigate: false,
          commentContent: "",

      }
    }
componentDidMount () {
    console.log(this.props.match.params.reviewId)
    this.setState({reviewId: this.props.match.params.reviewId}); 
    axios.get('http://localhost:5000/editreview', {
        params: {
            id: this.props.match.params.reviewId
        }
    })
    .then((response) => {
        this.setState({reviewAlbum: response.data[0].album,
            reviewArtist: response.data[0].artist,
            reviewAlbumId: response.data[0].albumId,
            reviewImage: response.data[0].image,
            reviewRating: response.data[0].rating,
            reviewUsername: response.data[0].username,
            reviewContent: response.data[0].content,
            reviewLikes: response.data[0].users_liked.length,
            reviewComments: response.data[0].comments,
            reviewTime: response.data[0].time,
        });
    }).catch(() => {
        alert("Error getting review");
    });
}

toAlbum (text) {
    return event => {
      event.preventDefault()
      this.props.history.push('/albumpage/'+ text);
      console.log(text)
    }
  }

handleContentChange(event) {
    this.setState({commentContent: event.target.value})
}

handleCommentSubmit(event){
    event.preventDefault()
    const commentInfo = {commenter: sessionStorage.getItem("currentUser"), comment: this.state.commentContent, date: Date.now()}
    this.setState({reviewComments: [...this.state.reviewComments, commentInfo]})
    const params = {
        id: this.props.match.params.reviewId,
        commentInfo: commentInfo,
    }
    axios.post('http://localhost:5000/postcomment', params).then(response=> {
        console.log(response.data);
        console.log('comment success');
        this.setState({commentContent: ""})
  }).catch((err)=> {
    console.log('comment fail');
  })
}

getDate(dateParam){
    let date = new Date(dateParam);
       
    date.setHours(date.getHours()+2);
    var isPM = date.getHours() >= 12;
    var isMidday = date.getHours() === 12;
    var minutes = date.getMinutes();
    if(date.getMinutes() < 10){
        minutes = "0" + date.getMinutes();
    }
    var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
        minutes].join(':') + (isPM ? 'pm' : 'am');
    //   let time_format = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + time;
    let date_format = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    let time_format = time

    var dateFinal = {
        date: date_format,
        time: time_format
    }

    return dateFinal
}

whichUser = (username) => {
    if (username === sessionStorage.getItem('currentUser')) {
        console.log("profile")
        return '/profile'
    } else {
        console.log("here")
        return '/viewprofile'
    }
};

navigate(){
    this.setState({navigate: true}); 
}

  render() {
    var finalDate = this.getDate(this.state.reviewTime).date
    var finalTime = this.getDate(this.state.reviewTime).time
    let commentList = []
    if(this.state.reviewComments.length === 0){
        commentList.push(<h2>This review has no comments.</h2>)
    }
    return (
      <div className="Comments">
        <h1> view comments</h1>
        <div className="albumCard">
            <div className = "artFeed>">
            <figure className="albumReviewFeed" onClick={this.toAlbum(this.state.reviewAlbum + "/" + this.state.reviewArtist + "/" + this.state.reviewAlbumId)}>
                <img className="resize" src={this.state.reviewImage} alt="Avatar"/>
                <div className="starsFeed">
                    <StarRatings
                className="starRating"
                rating= {this.state.reviewRating}
                starRatedColor="rgb(0,0, 0)"
                starHoverColor="rgb(243,227, 0)"
                isSelectble = "true"
                numberOfStars={5}
                starDimension = "30px"
                starSpacing = "1px"
                name='rating'
            />
                </div>
            </figure>
            </div>
            <div className="reviewContent">
                <h1>{this.state.reviewAlbum}, {this.state.reviewArtist}</h1>
                <h2 className="dateInfo">reviewed by @{this.state.reviewUsername}  {finalDate} <span className="time">{finalTime}</span></h2>
                <p className="reviewInfo">{this.state.reviewContent}</p>
                <FontAwesomeIcon className="trash" icon={faHeart} size="sm"/>{this.state.reviewLikes}
                <FontAwesomeIcon className="comment" icon={faComment} size="sm" style={{marginLeft: "15px"}}/> {this.state.reviewComments.length}
            </div>    
        </div>
        {commentList}
        {this.state.reviewComments.map((commentValue, index) =>
            <div key = {index}>
                <button onClick={() => this.navigate()}><h1>{commentValue.commenter}:</h1></button>
                    {this.state.navigate && <Redirect to={{
                        pathname: this.whichUser(commentValue.commenter),
                        state: {"username": commentValue.commenter}
                    }}/>}
                <h3>{commentValue.comment} </h3>
                <h4>posted: {this.getDate(commentValue.date).date} {this.getDate(commentValue.date).time}</h4>
            </div>
        )}
        <form className = "commentForm" id="commentForm" onSubmit={this.handleCommentSubmit.bind(this)}>
             <textarea form="commentForm "type="text" name="content" value={this.state.commentContent} placeholder="write a comment"
                onChange={this.handleContentChange.bind(this)} required/><br></br>
            <input className="submitButton" type="submit" value="post comment"/>
         </form>
      </div>

    );
  }
}

export default Comments;



