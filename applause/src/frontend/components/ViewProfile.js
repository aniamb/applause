import React from 'react';
import { Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from '@material-ui/core';
import StarRatings from 'react-star-ratings';


const user =
    {
        "firstname":"Jane",
        "lastname":"Doe",
        "handle": "janedoe",
        "email":"1234@mail.net",
        "password":"1234",
        "followers":{"1":"hi"},
        "following":{},
        "favorites":{},
        "groups":{},
        "bio": "Lover of Pop, Harry Styles, and Country Music",
        "meta_data":"avatar.png"
    }

class ViewProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        username:'',
        reviews: [],
        edit:false,
        isFollow: "",
        userHandle: null,
        followerRedirect: false,
        followingRedirect: false,
        hand: "",
        path:"",
        visibility: ""
    }
}

async componentDidMount(){
    console.log("component mounted at view profile");
    if(this.props.location.state === undefined){
        this.props.history.push('/profile');
    } else {
        axios.get('http://localhost:5000/viewprofile', {
            params: {
                userHandle: this.props.location.state.username,
                currentUser: sessionStorage.getItem("currentUser")
            }
        })
        .then((response) => {   
            console.log(response.data)
            this.setState({user: response.data.user, reviews: response.data.reviews, isFollow: response.data.isFollowing, visibility: response.data.user.visibility});
            if (response.data.user.meta_data !== "") {
                this.setState({path: response.data.user.meta_data.split("/")[3]});
            }
        // sessionStorage.setItem("currentUser", this.state.user.handle);
        })
        .catch((err) => {
            console.log(err)
            console.log('error getting info');
        });
    }
}

followerRedirectFunc = () => {
    console.log(this.state.user.handle);
  this.setState({followerRedirect:true});
}

followingRedirectFunc = () => {
  this.setState({followingRedirect:true});
}

changeFollow = () => {
    if (this.state.isFollow === "Follow"){
        this.setState({isFollow:"Unfollow"});       
         this.follow()
    } else {
        this.setState({isFollow:"Follow"});
        this.unfollow()
    }
}

follow = () => {
    console.log("FOLLOWING USER")
    axios.get('http://localhost:5000/follow', {
        params: {
          userHandle: sessionStorage.getItem("currentUser"),
          followUsername: this.props.location.state.username
        }
      }).then((response) => {
        console.log("successfully followed user")
        window.location.reload();
  
      })
      .catch((err) => {
       console.log('error getting info');
      })
}

unfollow = () => {
    console.log("UNFOLLOWING USER")
    axios.get('http://localhost:5000/unfollow', {
        params: {
          userHandle: sessionStorage.getItem("currentUser"),
          unfollowUsername: this.props.location.state.username
        }
      }).then((response) => {
        console.log("successfully unfollowed user")
        window.location.reload();
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

  toAlbum (text) {
    return event => {
      event.preventDefault()
      this.props.history.push('/albumpage/'+ text);
      console.log(text)
    }
  }

render() {
    let reviewList = [];
    let reviewsHolder = this.state.reviews;
    let reviewHolderLength = reviewsHolder.length;
    if (reviewHolderLength === 0) {
        reviewList.push (
            <h2>This user hasn't written any reviews.</h2>
        )
    }else{
        for (let i = 0; i < reviewsHolder.length; i++) {
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
                        <div className="albumCard">
                            <figure className="albumReview" onClick={this.toAlbum(reviewsHolder[i].album + "/" + reviewsHolder[i].artist + "/" + reviewsHolder[i].albumId)}>
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
                                <p className="reviewHandle">@{reviewsHolder[i].username} {time_format} {isPrivate}</p>
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
                            <div className="followers" onClick={this.followerRedirectFunc}> {this.state.user.followers.length} followers</div>
                                {this.state.followerRedirect && <Redirect to={{
                                  pathname: '/followers',
                                  state: {"hand": this.state.user.handle}
                             }}/>}
                        
                            <div className="following" onClick={this.followingRedirectFunc}>{this.state.user.following.length} following</div>
                                {this.state.followingRedirect && <Redirect to={{
                                    pathname: '/following',
                                    state: {"hand": this.state.user.handle}
                            }}/>}
                        </div>
                        <h2 className="bio">{this.state.user.bio}</h2>
                        <p style={{fontSize: "12px"}}>this is a {this.state.visibility} profile</p>
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
export default ViewProfile