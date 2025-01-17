import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Profile.css';
import { Redirect} from 'react-router-dom'
import axios from 'axios'
import { faTrash, faEdit, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';
import Spotify from '../styles/spotify.png'
import { TwitterShareButton, TwitterIcon } from "react-share";

const user =
    {
        "firstname":"Jane",
        "lastname":"Doe",
        "handle": "janedoe",
        "email":"1234@mail.net",
        "password":"1234",
        "reviews": {},
        "followers":{"1":"hi"},
        "following":{},
        "favorites":{},
        "groups":{},
        "bio": "Lover of Pop, Harry Styles, and Country Music",
        "meta_data": "avatar.png"
    }

class ProfileGoogle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        logout:false,
        isFollow: "Follow",
        userHandle: null,
        reviews: [],
        followerRedirect: false,
        followingRedirect: false,
        hand: "",
        path:"",
        visibility: "",
        recAlbumsRedirect: false,
        recArtistsRedirect: false,
        reviewLater:false,
        listenLater:false,
        feedReviewsLiked:[],
        numLikes: []
    }
}

async componentDidMount(){
    console.log("component mounted");
    sessionStorage.setItem("loggedIn", true);
    var lookupUser = this.props.match.params.handle;
    console.log(lookupUser); 
    axios.get('http://localhost:5000/profile', {
        params: {
            userHandle:lookupUser
        }
    })
    .then((response) => {   
        console.log("response received.");
        this.setState({user: response.data, visibility: response.data.visibility});
        console.log(response.data)
        if (response.data.meta_data !== "") {
          this.setState({path: response.data.meta_data.split("/")[3]});
        }
        sessionStorage.setItem("currentUser", this.state.user.handle);
        sessionStorage.setItem("profileImagePath", this.state.path);
    })
    .catch((err) => {
        console.log('error getting info');
        console.log(err);
    });
    this.getReviews();
}

reviewLater = () => {
    this.setState({reviewLater:true})
}

listenLater = () => {
    this.setState({listenLater:true})
}

editProfile = () => {
    this.setState({edit:true});
}

logout = () => {
    this.setState({logout:true});
    sessionStorage.clear();
}

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

recAlbumsRedirectFunc = () => {
    this.setState({recAlbumsRedirect: true});
}

recArtistsRedirectFunc = () => {
    this.setState({recArtistsRedirect: true});
}

changeFollow = () => {
    if (this.state.isFollow === "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}

toAlbum (text) {
    return event => {
      event.preventDefault()
      this.props.history.push('/albumpage/'+ text);
      console.log(text)
    }
  }


importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

getSpotify = () => {
    console.log("cliick works");
    
    axios.get('http://localhost:5000/spotifyauth', {
        //headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then((response) => {
        console.log("hi");
        console.log(response);
    })
    .catch(() => {
        alert("Error retrieving reviews");
    });
}

getReviews = () => {
    var lookupUser = this.props.match.params.handle;
    console.log("lookup user is: " + lookupUser)
    axios.get('http://localhost:5000/reviews', {
        params: {
            userHandle: lookupUser
        }
    })
    .then((response) => {
        const data = response.data;
        this.setState({ reviews: data });
        var liked = this.state.feedReviewsLiked
        var numLiked = this.state.numLikes
        var currUser = sessionStorage.getItem("currentUser")
        for(var i = 0; i<this.state.reviews.length; i++){
            if((this.state.reviews[i].users_liked).includes(currUser)){
                liked.push(true)
            }else{
                liked.push(false)
            }
        }
        for(var j = 0; j<this.state.reviews.length; j++){
            numLiked[j] = this.state.reviews[j].users_liked.length
        }
        this.setState({numLikes:numLiked})
        this.setState({feedReviewsLiked: liked})
        console.log('Retrieved reviews!');
        console.log(data); // reviews are in console
    })
    .catch(() => {
        //alert("Error retrieving reviews");
    });
}

deleteReview(reviewId) {
    console.log("DELETING REVIEW")
    console.log(reviewId)
    axios.post('http://localhost:5000/deletereview', {
        params: {
            id: reviewId
        }
    })
    .then((response) => {
        console.log('Successfully deleted review');
        window.location.reload();
        this.getReviews();
    })
    .catch(() => {
        alert("Error deleting reviews");
    });
}

editReview(reviewAlbum, reviewArtist, reviewId) {
    this.props.history.push('/editreview/'+ reviewAlbum + '/' + reviewArtist+ '/' + reviewId);
}
redirectComment(id) {
    this.props.history.push('/comments/' + id);
}
isLiked(i, id){
    var usersLiked = this.state.feedReviewsLiked
    if(usersLiked[i]){
        return (
            <FontAwesomeIcon className="trash" icon={faHeart} onClick={() => this.changeLike(false, i, id)} size="sm" color="red"/>
        )
    } else {
        return (
            <FontAwesomeIcon className="trash" icon={faHeart} onClick={() => this.changeLike(true, i, id)} size="sm"/>
        )
    }
}

changeLike(changeLikeTo, i, id){
    var usersLiked = this.state.feedReviewsLiked
    if(!changeLikeTo){
        usersLiked[i] = false
        this.unlike(id, i)
    } else {
        usersLiked[i] = true
        this.like(id, i)
    }
    this.setState({feedReviewsLiked: usersLiked})
}

unlike = (id, i) => {
    var userHandle = sessionStorage.getItem("currentUser");
    console.log("unliking review")
    axios.get('http://localhost:5000/unlike', {
        params: {
          reviewId: id,
          handle: userHandle
        }
      }).then((response) => {
        console.log("successfully unliked review")
        var numLiked = this.state.numLikes
        numLiked[i]--
        this.setState({numLikes:numLiked})
        // window.location.reload();
      })
      .catch((err) => {
       console.log('error getting info');
      })
}

like = (id, i) => {
    var userHandle = sessionStorage.getItem("currentUser");
    console.log("liking review")
    axios.get('http://localhost:5000/like', {
        params: {
          reviewId: id,
          handle: userHandle
        }
      }).then((response) => {
        console.log("successfully liked review")
        var numLiked = this.state.numLikes
        numLiked[i]++
        this.setState({numLikes:numLiked})
        // window.location.reload();
      })
      .catch((err) => {
       console.log('error getting info');
      })
}

sortData (reviewsHolder) {
    reviewsHolder.sort(
        function(a, b) {  
          let dateA =  new Date(a.time).getTime();
          let dateB =  new Date(b.time).getTime()      
           if (dateA  === dateB) {
              return b.users_liked.length - a.users_liked.length;
           }
           return dateA - dateB
        });
}
render() {

    let reviewList = [];
    let reviewsHolder = this.state.reviews;
    this.sortData(reviewsHolder);
    let reviewHolderLength = reviewsHolder.length;
    if (reviewHolderLength === 0) {
        reviewList.push (
            <h2 key={0}>You haven't written any reviews.</h2>
        )
    }else{
        for (let i = reviewsHolder.length-1; i >= 0; i--) {
            let date = new Date(reviewsHolder[i].time);
    
            date.setHours(date.getHours()+2);
            var isPM = date.getHours() >= 12;
            var isMidday = date.getHours() === 12;
            var minutes = date.getMinutes();
            if(date.getMinutes() < 10){
                minutes = "0" + date.getMinutes();
            }
            var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
                minutes].join(':') + (isPM ? 'pm' : 'am');
            let time_format = time + ' ' + (date.getMonth()+1) + '-' + date.getDate()+ '-' + date.getFullYear() ;
            var isPrivate = "public"
            if(reviewsHolder[i].private === true){
                isPrivate = "private"
            }
            reviewList.push(
                        <div className="albumCardProfile" key={i}>
                            <figure className="albumReview" onClick={this.toAlbum(reviewsHolder[i].album + "/" + reviewsHolder[i].artist + "/" + reviewsHolder[i].albumId)}>
                                <img class="resize" src={reviewsHolder[i].image} style= {{width:"12vw", height:"12vw"}} alt="Avatar"/>
                                <figcaption>
                                    <StarRatings
                                className="starRating"
                                rating= {reviewsHolder[i].rating}
                                starRatedColor="rgb(243,227, 0)"
                                starHoverColor="rgb(243,227, 0)"
                                isSelectble = "true"
                                numberOfStars={5}
                                starDimension = "30px"
                                starSpacing = "1px"
                                name='rating'
                            />
                                </figcaption>
                            </figure>
                            <div className="reviewContentProfile">
                                <p className="reviewAlbumProfile"><b>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</b>
                                    <TwitterShareButton
                                        url=" "
                                        title={'Check out my review for ' + reviewsHolder[i].album + ' by ' + reviewsHolder[i].artist + ' on Applause: "' + reviewsHolder[i].content + '"'}
                                    >
                                    <TwitterIcon size={25} round />
                                    </TwitterShareButton>
                                </p>
                                <p className="reviewHandleProfile">@{reviewsHolder[i].username}, {time_format}, {isPrivate}<button className="editBtn" onClick={() => this.editReview(reviewsHolder[i].album, reviewsHolder[i].artist, reviewsHolder[i]._id, )}><FontAwesomeIcon className="editReview" icon={faEdit} size="sm"/></button><button className="trashBtn" onClick={() => this.deleteReview(reviewsHolder[i]._id)}><FontAwesomeIcon className="trash" icon={faTrash} size="sm"/></button></p> 
                                <br/>
                                {this.isLiked(i, reviewsHolder[i]._id)}{this.state.numLikes[i]}
                                <FontAwesomeIcon className="comment" icon={faComment} size="sm" style={{marginLeft: "15px"}} onClick={() => this.redirectComment(reviewsHolder[i]._id)}/> {reviewsHolder[i].comments.length}
                                <p className="reviewInfoProfile">{reviewsHolder[i].content}</p>
                            </div>    
                        </div>
            )
        }
    }
  let images = this.importAll(require.context('../../public/', false));
  
  return (
    <div className="profilePage">
        <div className = "pageHolder">
            <div className="leftSide">
                <div className="profileInfo">
                    {/* <div className="albumInfoTemp"> */}
                        {/* <div className="left"> */}
                            <Avatar 
                                style={{
                                    marginTop: "20px",
                                    display: 'inline-block',
                                    verticalAlign:"middle",
                                    width: "17vw",
                                    height:"17vw"
                                }} 
                                className = "profPic"
                                variant="circle"
                                src={images[this.state.path]}
                                alt={this.state.user.firstname + " " + this.state.user.lastname}
                            />
                            <h1 className="fullName">{this.state.user.firstname} {this.state.user.lastname}</h1>
                            <p className="profileHandle">@{this.state.user.handle}</p>
                            <div className="follow">
                                <div className="followers" onClick={this.followerRedirectFunc}>{this.state.user.followers.length} followers  </div>
                                {this.state.followerRedirect && <Redirect to={{
                                    pathname: '/followers',
                                    state: {"hand": sessionStorage.getItem('currentUser')}
                                }}/>}
                                <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                                {this.state.followingRedirect && <Redirect to={{
                                    pathname: '/following',
                                    state: {"hand": sessionStorage.getItem('currentUser')}
                                }}/>}
                            </div>
                            <h2 className="bio">{this.state.user.bio}</h2>
                            <div className="navBtn">
                                <div className = "edit navBtn" onClick={this.editProfile}>Edit Profile</div>
                                {this.state.edit ? <Redirect to={{
                                    pathname: '/editprofile',
                                    state: {email: this.state.user.email}
                                }}/>: null}
                                <div className = "logout navBtn" onClick={this.logout}>Logout</div>
                                {this.state.logout ? <Redirect to={{
                                    pathname: '/login'
                                }}/>: null}
                            </div>
                            <a href="http://localhost:5000/spotifyauth" rel="noopener noreferrer"><img title = "Create Playlist" style={{'height':'30px'}} src={Spotify} alt="Spotify"></img></a>
                            {/* <p style={{fontSize: "12px"}}>this is a {this.state.visibility} profile</p> */}
                        {/* </div>                      */}
                    {/* </div> */}
                </div>
                <div className="musicGroups">
                <button className="group" onClick={this.reviewLater}>
                            Review Later
                            {this.state.reviewLater && <Redirect to={{
                                    pathname: '/reviewlater',
                                    state: {handle: sessionStorage.getItem('currentUser')}
                                }}/>}
                    </button>
                    <button className="group" onClick={this.listenLater}>
                            Listen Later
                            {this.state.listenLater && <Redirect to={{
                                    pathname: '/listenlater',
                                    state: {handle: sessionStorage.getItem('currentUser')}
                                }}/>}
                    </button>
                    <button className="group" onClick={this.recAlbumsRedirectFunc}>Recommended Albums </button>
                    {this.state.recAlbumsRedirect ? <Redirect to={{
                      pathname: '/recalbums'
                    }}/>: null}
                    <button className="group" onClick={this.recArtistsRedirectFunc}>Recommended Artists </button>
                    {this.state.recArtistsRedirect ? <Redirect to={{
                      pathname: '/recartists'
                    }}/>: null}
                </div>
            </div>
            <div className="albumReviews">
                <div className="albumReviewScroll">
                    {reviewList}
                </div>
            </div>
        </div>
    </div>


  );
}

}
export default ProfileGoogle