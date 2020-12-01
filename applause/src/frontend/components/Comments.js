import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Feed.css';
import '../styles/Comments.css';
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faTrash } from "@fortawesome/free-solid-svg-icons";


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
          commentUsername: "",
          username: "",
          currLiked: false

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
            reviewTime: response.data[0].time
        });
        var currUser = sessionStorage.getItem("currentUser");
        if((response.data[0].users_liked.includes(currUser))){
            this.setState({currLiked: true})
        }else{
            this.setState({currLiked: false})
        }
        console.log(this.state.reviewComments)
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
    const commentInfo = {commenter: sessionStorage.getItem("currentUser"), comment: this.state.commentContent, date: Date.now(), profilePic: sessionStorage.getItem("profileImagePath")}
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

navigate = (username) => {
    this.setState({navigate: true}); 
    this.setState({username: username});
}

displayTrashIcon(user, index, id){
    if(sessionStorage.getItem("currentUser") === user){
        return <FontAwesomeIcon className="trash" icon={faTrash} size="sm" style={{float: "right"}} onClick={() => this.deleteComment(index, id)}/>;
    }
}

deleteComment(indexToDelete, commentId){
    this.setState({reviewComments: this.state.reviewComments.filter((comments, commentIndex) => commentIndex !== indexToDelete)})
    const params = {
        reviewId: this.props.match.params.reviewId,
        commentId: commentId,
    }
    axios.post('http://localhost:5000/deletecomment', params).then(response=> {
        console.log('comment delete success');
    }).catch((err)=> {
        console.log('comment delete fail');
  })
}

isLiked(id){
    if(this.state.currLiked){
        return (
            <FontAwesomeIcon className="trash" icon={faHeart} onClick={() => this.changeLike(false, id)} size="sm" color="red"/>
        )
    } else {
        return (
            <FontAwesomeIcon className="trash" icon={faHeart} onClick={() => this.changeLike(true, id)} size="sm"/>
        )
    }
}

changeLike(changeLikeTo, id){
    // var usersLiked = this.state.feedReviewsLiked
    if(!changeLikeTo){
        this.setState({currLiked: false})
        this.unlike(id)
    } else {
        this.setState({currLiked: true})
        this.like(id)
    }
   // this.setState({feedReviewsLiked: usersLiked})
}

unlike = (id) => {
    var userHandle = sessionStorage.getItem("currentUser");
    console.log("unliking review")
    axios.get('http://localhost:5000/unlike', {
        params: {
          reviewId: id,
          handle: userHandle
        }
      }).then((response) => {
        console.log("successfully unliked review")
        var numLiked = this.state.reviewLikes
        numLiked--
        this.setState({reviewLikes:numLiked})
        // window.location.reload();
      })
      .catch((err) => {
       console.log('error getting info');
      })
}

like = (id) => {
    var userHandle = sessionStorage.getItem("currentUser");
    console.log("liking review")
    axios.get('http://localhost:5000/like', {
        params: {
          reviewId: id,
          handle: userHandle
        }
      }).then((response) => {
        console.log("successfully liked review")
        var numLiked = this.state.reviewLikes
        numLiked++
        this.setState({reviewLikes:numLiked})
        // window.location.reload();
      })
      .catch((err) => {
       console.log('error getting info');
      })
}

importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

  render() {
    var finalDate = this.getDate(this.state.reviewTime).date
    var finalTime = this.getDate(this.state.reviewTime).time
    let commentList = []
    if(this.state.reviewComments.length === 0){
        commentList.push(<h2>This review has no comments.</h2>)
    }
    let images = this.importAll(require.context('../../public/', false));
    return (
      <div className="Comments">
        <h1> view comments</h1>
        <div className="albumCard">
            <div className = "artFeed>">
            <figure className="albumReviewFeed" onClick={this.toAlbum(this.state.reviewAlbum + "/" + this.state.reviewArtist + "/" + this.state.reviewAlbumId)}>
                <img className="resize" src={this.state.reviewImage} alt="Avatar" style={{"width": "194px", "height":"194px"}}/>
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
                {/* <FontAwesomeIcon className="trash" icon={faHeart} size="sm"/>{this.state.reviewLikes} */}
                {this.isLiked(this.props.match.params.reviewId)}{this.state.reviewLikes}
                <FontAwesomeIcon className="comment" icon={faComment} size="sm" style={{marginLeft: "15px"}}/> {this.state.reviewComments.length}
            </div>    
        </div>
        {commentList}
        <div className="commentsList">
            {this.state.reviewComments.map((commentValue, index) =>
                <div className="user-comment-card2" key = {index}>
                    <img className="user-avatar" src={images[commentValue.profilePic]} alt=""></img>
                    <div className="user-info user-comment-card">
                    {this.displayTrashIcon(commentValue.commenter, index, commentValue._id)}

                    <div className="timeInfo">
                        <button className="profileRedirect" onClick={() => this.navigate(commentValue.commenter)}><h4 className="user_name">@{commentValue.commenter}</h4></button>
                            {this.state.navigate && <Redirect to={{
                                pathname: this.whichUser(this.state.username),
                                state: {"username": this.state.username}
                            }}/>}
                        <div className="timePosted">
                            <h4>{this.getDate(commentValue.date).date} {this.getDate(commentValue.date).time}</h4>
                        </div>
                    </div>
                        <br></br>
                        <br></br>

                    <div class="user__comment"><h3>{commentValue.comment}</h3></div>
                    
                </div>
            </div>
            )}
        </div>
        <div className="formDiv">
            <form className = "commentForm" id="commentForm" onSubmit={this.handleCommentSubmit.bind(this)}>
            <img className="comment-avatar" src={images[sessionStorage.getItem("profileImagePath")]} alt=""></img>
                <textarea className = "commentInput" form="commentForm "type="text" name="content" value={this.state.commentContent} placeholder="write a comment..."
                    onChange={this.handleContentChange.bind(this)} required/><br></br>
             <input className="submitComment" type="submit" value="post comment"/>

            </form>
        </div>



         




      </div>

    );
  }
}

export default Comments;



