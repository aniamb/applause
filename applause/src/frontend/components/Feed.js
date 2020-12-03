 import React, {Component} from 'react';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import '../../App.css';
import '../styles/Feed.css';
import { faHeart, faComment, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';
import { TwitterShareButton, TwitterIcon } from "react-share";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
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
            for(var j = 0; j<this.state.feedReviews.length; j++){
                numLiked[j] = this.state.feedReviews[j].users_liked.length
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

        event.preventDefault();
  

        axios.post('http://localhost:5000/searchserver', {
            value: this.state.value
        })
        .then(res => {
            this.setState({albums: res.data.result});
            console.log(res.data.result);
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
    toAlbum (text) {
        return event => {
          event.preventDefault()
          this.props.history.push('/albumpage/'+ text);
          console.log(text)
        }
      }
    
    redirectComment(id) {
        this.props.history.push('/comments/' + id);
    }

    render () {
        let reviewList = [];
        let reviewsHolder = this.state.feedReviews;
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
            //   let time_format = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + time;
            let date_format = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
            let time_format = time
            reviewList.push(
                          <div className="albumCard" key={i}>
                              <div className = "artFeed>">
                              <figure className="albumReviewFeed" onClick={this.toAlbum(reviewsHolder[i].album + "/" + reviewsHolder[i].artist + "/" + reviewsHolder[i].albumId)}>
                                  <img className="resize" src={reviewsHolder[i].image} alt="Avatar" style={{"width": "194px", "height":"194px"}}/>
                                  {/* <figcaption> */}
                                  <div className="starsFeed">
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
                                  <h1>{reviewsHolder[i].album}, {reviewsHolder[i].artist}
                                  <TwitterShareButton
                                    url=" "
                                    title={'Check out ' + reviewsHolder[i].username + "'s" + ' review for ' + reviewsHolder[i].album + ' by ' + reviewsHolder[i].artist + ' on Applause: "' + reviewsHolder[i].content + '"'}
                                    >
                                    <TwitterIcon size={25} round />
                                    </TwitterShareButton></h1>
                                  <h2 className="dateInfo">reviewed by @{reviewsHolder[i].username}  {date_format} <span className="time">{time_format}</span></h2>
                                  <p className="reviewInfo">{reviewsHolder[i].content}</p>
                                  {this.isLiked(i, reviewsHolder[i]._id)}{this.state.numLikes[i]}
                                  <FontAwesomeIcon className="comment" icon={faComment} size="sm" style={{marginLeft: "15px"}} onClick={() => this.redirectComment(reviewsHolder[i]._id)}/> {reviewsHolder[i].comments.length}

                                  {/* <p className="reviewAlbum"><b>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</b></p>
                                  <p className="reviewHandle">@{reviewsHolder[i].username} {time_format}</p> 
                                  <p className="reviewInfo">{reviewsHolder[i].content}</p> */}
                              </div>    
                          </div>
            )
        }
        return (
            <div className="Feed">
                <form onSubmit={this.handleSubmit.bind(this)} style={{'marginBottom': "10px"}}>
                <label>
                        <FontAwesomeIcon className="search" icon={faSearch} size="lg" style={{'marginLeft': "15px", 'marginRight': "5px" }} />

                        <input className = "searchBox" type="text" name="name" value={this.state.value} placeholder = "search" onChange={this.handleChange.bind(this)} required/>
                </label>
                    <input className = "searchSubmitButton" type="submit" value="Search" />
                </form>
                {this.state.navigate && <Redirect to={{
                    pathname: '/search',
                    state: {"albums": this.state.albums}
                }}/>}
                <div className="albumReviewsFeed">
                    <div className="albumReviewScrollFeed">
                        {reviewList}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;