import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Profile.css';
import { Redirect} from 'react-router-dom'
import axios from 'axios'
import { faTrash, faUserCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';

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

class Profile extends React.Component{
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
        path:""
    }
}

async componentDidMount(){
    console.log("component mounted");
    //need to change this to use local storage
    var lookupUser = sessionStorage.getItem("currentUser");
    console.log(lookupUser); 
    axios.get('http://localhost:5000/profile', {
        params: {
            userHandle:lookupUser
        }
    })
    .then((response) => {   
        console.log("response received.");
        this.setState({user: response.data});
        if (response.data.meta_data !== "") {
          this.setState({path: response.data.meta_data.split("/")[3]});
        }
        localStorage.setItem("currentUser", this.state.user.handle);
    })
    .catch((err) => {
        console.log('error getting info');
        console.log(err);
    });
    this.getReviews();
}


editProfile = () => {
    this.setState({edit:true});
}

logout = () => {
    this.setState({logout:true});
    localStorage.clear();
    sessionStorage.clear();
}

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

changeFollow = () => {
    if (this.state.isFollow === "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}


importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


getReviews = () => {
    var lookupUser = sessionStorage.getItem("currentUser");
    console.log("lookup user is: " + lookupUser)
    axios.get('http://localhost:5000/reviews', {
        params: {
            userHandle: lookupUser
        }
    })
    .then((response) => {
        const data = response.data;
        this.setState({ reviews: data });
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
        const data = response.data;
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

render() {


    let reviewList = [];
    let reviewsHolder = this.state.reviews;
    let reviewHolderLength = reviewsHolder.length;
    if (reviewHolderLength === 0) {
        reviewList.push (
            <h2>You haven't written any reviews.</h2>
        )
    }else{
        for (let i = 0; i < reviewsHolder.length; i++) {
            let date = new Date(reviewsHolder[i].time);
    
            date.setHours(date.getHours()+2);
            var isPM = date.getHours() >= 12;
            var isMidday = date.getHours() == 12;
            var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
                date.getMinutes()].join(':') + (isPM ? 'pm' : 'am');
            let time_format = time + ' ' + (date.getMonth()+1) + '-' + date.getDate()+ '-' + date.getFullYear() ;
    
            reviewList.push(
                        <div className="albumCard">
                            <figure className="albumReview">
                                <img class="resize" src={reviewsHolder[i].image} alt="Avatar"/>
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
                            <div className="reviewContent">
                                <p className="reviewAlbum"><b>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</b></p>
                                <p className="reviewHandle">@{reviewsHolder[i].username} {time_format} <button onClick={() => this.editReview(reviewsHolder[i].album, reviewsHolder[i].artist, reviewsHolder[i]._id, )}><FontAwesomeIcon className="edit" icon={faEdit} size="sm"/></button><button onClick={() => this.deleteReview(reviewsHolder[i]._id)}><FontAwesomeIcon className="trash" icon={faTrash} size="sm"/></button></p> 
                                <p className="reviewInfo">{reviewsHolder[i].content}</p>
                                
                            </div>    
                        </div>
            )
        }
    }
  let images = this.importAll(require.context('../../public/', false));
  
  return (
    <div className="AlbumPage">
        <div className = "albumHolder">
            <div className="albumInfo">
                <div className="albumInfoTemp">
                    <div className="left">
                        <Avatar 
                            style={{
                                marginTop: "20px",
                                display: 'inline-block',
                                verticalAlign:"middle",
                                width: "200px",
                                height: "200px",
                            }} 
                            variant="circle"
                            src={images[this.state.path]}
                            alt={this.state.user.firstname + " " + this.state.user.lastname}
                        />
                        <h1 className="userName">{this.state.user.firstname} {this.state.user.lastname}</h1>
                        <p className="profileHandle">@{this.state.user.handle}</p>
                        <button className="followBtn" onClick={this.changeFollow}>{this.state.isFollow}</button>
                        <div className="follow">
                            <div className="followers" onClick={this.followerRedirectFunc}>{this.state.user.followers.length} followers  </div>
                            {this.state.followerRedirect && <Redirect to={{
                                pathname: '/followers',
                                state: {"hand": localStorage.getItem('currentUser')}
                            }}/>}
                            <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                            {this.state.followingRedirect && <Redirect to={{
                                pathname: '/following',
                                state: {"hand": localStorage.getItem('currentUser')}
                            }}/>}
                        </div>
                        <h2 className="bio">{this.state.user.bio}</h2>
                        <button className = "edit followBtn2" onClick={this.editProfile}>Edit Profile</button>
                        {this.state.edit ? <Redirect to={{
                            pathname: '/editprofile',
                            state: {email: this.state.user.email}
                        }}/>: null}
                        <button className = "logout followBtn2" onClick={this.logout}>Logout</button>
                        {this.state.logout ? <Redirect to={{
                            pathname: '/login'
                        }}/>: null}
                    </div>                     
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
export default Profile