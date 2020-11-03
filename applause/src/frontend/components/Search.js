import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import '../../App.css';
import '../styles/Search.css';



class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            albumName:'',
            name:'',
            navigate: false, // only navigates to /search again

        }

    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    whichUser = (username) => {
        if (username == localStorage.getItem('currentUser')) {
          return "/profile";
        } else {
          return '/viewprofile';
        }
    };

    linkToProfile = () => {
        this.setState({navigate : true});
    };

    sendName (text) {
        return event => {
          event.preventDefault()
          this.props.history.push('/albumpage/'+ text);
          console.log(text)
        }
      }

      sendArtist (text) {
        return event => {
          event.preventDefault()
          this.props.history.push('/artistpage/'+ text);
          console.log(text)
        }
      }

    render() {

        let noDups = [];
        var title;
        var artist;
        var image;
        var length = (this.props.location.state.albums.length);
        var artistImage;
        var albumId;
        
        //no results
        if (length === 0){
            noDups.push(<h3>No results.</h3>)
        } else if (!this.props.location.state.albums[0].title) {
            //users
            for(let i = 0; i < length; i++){
               console.log("Username: " + this.props.location.state.albums[i]);
                noDups.push(
                    <div key={this.props.location.state.albums[i]} className="searchResults">
                        <h3>
                            {/* albums[i] stores users and album names  */}
                            <button onClick={() => this.linkToProfile()}>@{this.props.location.state.albums[i]}</button>
                            {this.state.navigate && <Redirect to={{
                                pathname: this.whichUser(this.props.location.state.albums[i]),
                                state: {"username": this.props.location.state.albums[i]}
                            }}/>}
                        </h3>
                    </div>
                )
            }
        } else {
            for(let i = 0; i< length; i++){
                //albums
                title = this.props.location.state.albums[i].title;
                //console.log(title);
                artist = this.props.location.state.albums[i].artist;
                image = this.props.location.state.albums[i].art;
                artistImage = this.props.location.state.albums[i].artistImage;
                albumId = this.props.location.state.albums[i].id;
                console.log(albumId);

             
               
                noDups.push(
                    <div key={this.props.location.state.albums[i]} className="searchResults">
                        
                        <h3>
                      
                            <i>{this.props.location.state.albums[i].title}</i>
                                , {this.props.location.state.albums[i].artist}
                            <br></br>
                            <br></br>
                            <img src={this.props.location.state.albums[i].art}></img>
                            <br></br>
                           
                            <div>
                                <form onSubmit={this.sendName(title + "/" + artist + "/" + albumId )}>
                                 {/* + "/" + "\"" + image + "\"" */}
                                    <input type="submit" value="Learn about Album" />

                                </form>
                            </div>

                            <div>
                                <form onSubmit={this.sendArtist(artist)}>
                                 
                                    <input type="submit" value="Learn about Artist" />
                                </form>
                            </div>

                        </h3>
                    </div>
                )

                sessionStorage.setItem(albumId, image);
                sessionStorage.setItem(artist, artistImage);
            }
     
        }


        return (

            <div className="Search">
              <h1> Search Results: </h1>
                <div className="row-timeline">
                   <div className="userOrder">
                       {noDups}
                   </div>
                {/* {this.state.navigate && <Redirect to={{
                    pathname: '/albumpage',
                    state: {"username": this.state.username}
                }}/>} */}
                </div>
                <div>

            </div>

            </div>

            

        );
    }
}
export default Search;