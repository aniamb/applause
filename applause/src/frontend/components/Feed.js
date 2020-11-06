 import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios';
import '../../App.css';
import '../styles/Feed.css';
import { faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from 'react-star-ratings';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            navigate: false,
            albums: [],
            feedReviews:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
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
        })
          .catch((err) => {
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
            console.log(res.data.result);
            this.setState({navigate: true});
        })
        .catch(error => {
            console.error(error);
            this.setState({navigate: false});
        })
    }

    toAlbum (text) {
        return event => {
          event.preventDefault()
          this.props.history.push('/albumpage/'+ text);
          console.log(text)
        }
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
            reviewList.push(
                          <div className="albumCard">
                              <div className = "artFeed>">
                              <figure className="albumReviewFeed" onClick={this.toAlbum(reviewsHolder[i].album + "/" + reviewsHolder[i].artist + "/" + reviewsHolder[i].albumId)}>
                                  <img className="resize" src={reviewsHolder[i].image} alt="Avatar"/>
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
                                  <h1>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</h1>
                                  <h2 className="dateInfo">reviewed by @{reviewsHolder[i].username}  {date_format} <span className="time">{time_format}</span></h2>
                                  <p className="reviewInfoFeed">{reviewsHolder[i].content}</p>
                                  {/* <p className="reviewAlbum"><b>{reviewsHolder[i].album}, {reviewsHolder[i].artist}</b></p>
                                  <p className="reviewHandle">@{reviewsHolder[i].username} {time_format}</p> 
                                  <p className="reviewInfo">{reviewsHolder[i].content}</p> */}
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