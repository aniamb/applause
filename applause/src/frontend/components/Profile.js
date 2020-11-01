import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import { faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';
import { lookup } from 'dns';

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
        "bio": "Lover of Pop, Harry Styles, and Country Music"
    }

class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false,
        isFollow: "Follow",
        userHandle: null,
        reviews: [],
        followerRedirect: false,
        followingRedirect: false,
    }
}

componentDidMount(){
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
        localStorage.setItem("currentUser", this.state.user.handle);
    })
    .catch((err) => {
        console.log('error getting info');
    });
    this.getReviews();
}


editProfile = () => {
    this.setState({edit:true});
}

followerRedirectFunc = () => {
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

changeFollow = () => {
    if (this.state.isFollow == "Follow")
        this.setState({isFollow:"Unfollow"});
    else this.setState({isFollow:"Follow"});
}

getReviews = () => {
    var lookupUser = sessionStorage.getItem("currentUser");
    console.log("lookup user is" + lookupUser)
    axios.get('http://localhost:5000/reviews', {
        params: {
            userHandle:lookupUser
        }
    })
    .then((response) => {
        const data = response.data;
        this.setState({ reviews: data });
        console.log('Retrieved reviews!');
        console.log(data); // reviews are in console
    })
    .catch(() => {
        alert("Error retrieving reviews");
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
        this.getReviews();
    })
    .catch(() => {
        alert("Error deleting reviews");
    });
}

render() {
  let reviewList = [];
  let reviewsHolder = this.state.reviews;
  for (let i = 0; i < reviewsHolder.length; i++) {
      let date = new Date(reviewsHolder[i].time);
 
        date.setHours(date.getHours()+2);
        var isPM = date.getHours() >= 12;
        var isMidday = date.getHours() == 12;
        var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
            date.getMinutes()].join(':') + (isPM ? 'pm' : 'am');
        let time_format = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + time;

      reviewList.push(
                    <div className="albumCard">
                        <figure className="albumReview">
                            <img class="resize" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
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
                            <p className="reviewAlbum"><b>{reviewsHolder[i].album}, {reviewsHolder[i].artists}</b></p>
                            <p className="reviewHandle">@{reviewsHolder[i].username} {time_format} <button onClick={() => this.deleteReview(reviewsHolder[i]._id)}><FontAwesomeIcon className="trash" icon={faTrash} size="sm"/></button></p> 
                            <p className="reviewInfo">{reviewsHolder[i].content}</p>
                            
                        </div>    
                    </div>
      )
  }
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <FontAwesomeIcon className="prof" icon={faUserCircle} size="sm"/>
                <p>@{this.state.user.handle}</p>
                <button className="followBtn" onClick={this.changeFollow}>{this.state.isFollow}</button>
                <h1>{this.state.user.firstname} {this.state.user.lastname}</h1>
                <div className="follow">
                    <div className="followers" onClick={this.followerRedirectFunc}>{this.state.user.followers.length} followers</div>
                      {this.state.followerRedirect ? <Redirect to='/followers'/> : null}
                    <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                    {this.state.followingRedirect ? <Redirect to='/following'/> : null}
                </div>
                <h2>{this.state.user.bio}</h2>
                <button className = "edit" onClick={this.editProfile}>Edit Profile</button>
                {/* {this.state.edit ? <Redirect to='/editprofile'/> : null} */}
                {this.state.edit ? <Redirect to={{
                    pathname: '/editprofile',
                    state: {email: this.state.user.email}
                }}/>: null}


            </div>
            
        </div>
        <div className="right">
                {/* This is where the user's own reviews would be! */}
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