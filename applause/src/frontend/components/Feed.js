import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios';
import '../../App.css';
import '../styles/Feed.css';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            navigate: false,
            albums: [],
            feedReviews:[],
            feedReviewsLiked:[],
            numLikes: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        var lookupUser = sessionStorage.getItem("currentUser");
        let followingList = []
        axios.get('http://localhost:5000/following', {
            params: {
              userHandle: lookupUser
            }
        }).then((response) => {
            followingList = response.data.results
            console.log(followingList)
            return axios.get('http://localhost:5000/getfeedreviews', {
                params: {
                    followingList: followingList
                }
            })
        }).then((response) => {
            this.setState({feedReviews: response.data.results})
            var liked = this.state.feedReviewsLiked
            var numLiked = this.state.numLikes
            var currUser = sessionStorage.getItem("currentUser")
            for(var i = 0; i<this.state.feedReviews.length; i++){
                if((this.state.feedReviews[i].users_liked).includes(currUser)){
                    liked.push(true)
                }else{
                    liked.push(false)
                }
            }
            for(var i = 0; i<this.state.feedReviews.length; i++){
                numLiked[i] = this.state.feedReviews[i].users_liked.length
            }
            this.setState({numLikes:numLiked})
            this.setState({feedReviewsLiked: liked})
        }).catch((err) => {
            console.log(err);
            console.log('error getting info');
      }) 
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
    //#alert('Search Value was: ' + this.state.value);

        const { search } = this.state; 
        event.preventDefault();
  

        axios.post('http://localhost:5000/searchserver', {
            value: this.state.value
        })
        .then(res => {
            this.state.albums = res.data.result;
            this.setState({navigate: true});
        })
        .catch(error => {
            console.error(error);
            this.setState({navigate: false});
        })
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

    render () {
        let reviewList = [];
        let reviewsHolder = this.state.feedReviews;
        for (let i = 0; i < reviewsHolder.length; i++) {
            let date = new Date(reviewsHolder[i].time);
       
              date.setHours(date.getHours()+2);
              var isPM = date.getHours() >= 12;
              var isMidday = date.getHours() == 12;
              var time = [date.getHours() - (isPM && !isMidday ? 12 : 0), 
                  date.getMinutes()].join(':') + (isPM ? 'pm' : 'am');
            //   let time_format = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + time;
            let date_format = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
            let time_format = time
            var usersLiked = reviewsHolder[i].users_liked
            reviewList.push(
                          <div className="albumCard">
                              <div className = "art>">
                              <figure className="albumReview">
                                  <img className="resize" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                                  {/* <figcaption> */}
                                  <div className="stars">
                                      <StarRatings
                                  className="starRating"
                                  rating= {reviewsHolder[i].rating}
                                  starRatedColor="rgb(0,0, 0)"
                                  starHoverColor="rgb(243,227, 0)"
                                  isSelectble = "true"
                                  numberOfStars={5}
                                  starDimension = "30px"
                                  starSpacing = "1px"
                                  name='rating'
                              />
                              </div>
                                  {/* </figcaption> */}
                              </figure>
                              </div>
                              <div className="reviewContent">
                                  <h1>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</h1>
                                  <h2 className="dateInfo">reviewed by @{reviewsHolder[i].username}  {date_format} <span className="time">{time_format}</span></h2>
                                  <p className="reviewInfo">{reviewsHolder[i].content}</p>
                                  {this.isLiked(i, reviewsHolder[i]._id)}{this.state.numLikes[i]}
                              </div>    
                          </div>
            )
        }
        return (
            <div className="Feed">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Search: 
                        <input className = "searchBox" type="text" name="name" value={this.state.value} onChange={this.handleChange.bind(this)} required/>
                    </label>
                    <input type="submit" value="Search" />
                </form>
                {this.state.navigate && <Redirect to={{
                    pathname: '/search',
                    state: {"albums": this.state.albums}
                }}/>}
                <div className="albumReviews">
                    <div className="albumReviewScroll">
                        {reviewList}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;