import React from 'react';
import '../styles/ArtistPage.css'
import StarRatings from 'react-star-ratings';
import axios from 'axios';


class ArtistPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        albumName:'',
        artistName:'',
        albumArt:'',
        artistPic:'',
        reviews:[]
    }

  
}

 componentDidMount () {
  this.setState({artistName: this.props.match.params.artistName});
  console.log(this.props.match.params.artistName)
  
  
    axios.get('http://localhost:5000/getartistreviews', {
        params: {
            artistName: this.props.match.params.artistName
        }
    })
    .then(res => {
        console.log("Status is: " + res.status);
        console.log(res.data.results);
        this.setState({reviews: res.data.results});
        //this.setState({navigate: true});
    })
    .catch(error => {
        console.error(error);
        //this.setState({navigate: false});
    })

  
}

render() {
   let allReviews = [];
   let reviewHolder = this.state.reviews;
   var artistPic = sessionStorage.getItem(this.state.artistName);


   for (let i = 0; i < reviewHolder.length; i++) {
        allReviews.push (
        <div>
            <h2>Username: {reviewHolder[i].username}</h2>
            <h2>Album: {reviewHolder[i].album}</h2>
            <h2>Artist: {reviewHolder[i].artists}</h2>
            <h2>Rating: {reviewHolder[i].rating}</h2>
            <br></br>
        </div>
        
        )
   }
    return (
      // <div className="CreateAccount">
      //     <div className="container">
      //         <div className="left">
      //            <img src={artistPic}/>
      //             <h2>{this.state.artistName}</h2>
      //             {/* <img src={this.state.image}></img> */}
      //         </div>
      //         <div className="right">
      //         {allReviews}
                  
      //       </div>
              
      //     </div>
      <div className="ArtistPage">
        <div className="artistHeader">
          <img className="artistPic" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
          <div className="artistDiv"><h1 className="artistName2">{this.state.artistName}</h1></div>
        </div>
        <br></br>
        <br></br>
        <div className = "holder">
          <div className="allAlbums">
            <h2 className="sectionTitle">albums</h2> 
            <div className="grid">
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              <div className="album">
                <img className="albumgrid" src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt=""></img>
                <p>kid krow</p>
              </div>
              </div>
            </div>
          <div className="artistReviews">
            <div className="artistReviewScroll">
              <h2 className="sectionTitle">top reviews</h2> 
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
              <div className="card">
                  <figure className="albumReview">
                    <img src="https://e-cdns-images.dzcdn.net/images/cover/0a5209aec8e37012eb07eb6ef01fa7e6/250x250-000000-80-0-0.jpg" alt="Avatar"/>
                    <figcaption>
                      <StarRatings
                          className="starRating"
                          rating= {4}
                          starRatedColor="yellow"
                          starHoverColor="yellow"
                          isSelectble = "true"
                          numberOfStars={5}
                          starDimension = "30px"
                          starSpacing = "1px"
                          name='rating'
                      />
                    </figcaption>
                  </figure>
                  <div className="reviewContent">
                    <p className="reviewAlbum"><b>Kid Krow, Conan Gray</b></p>
                    <p className="reviewHandle">@janedoe 6:00pm 01/01/2020</p> 
                    <p className="reviewInfo">this album was so dope yall</p>
                  </div>    
              </div>
          </div> 
        </div>
        </div>
      </div>

    );

}

}

export default ArtistPage;
