import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import '../../App.css';
import '../styles/Search.css';
import { Avatar } from '@material-ui/core';




class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            albumName:'',
            name:'',
            navigate: false, // only navigates to /search again
            username: ""
        }

    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    whichUser = (username) => {
        if (username === sessionStorage.getItem('currentUser')) {
          return "/profile";
        } else {
          return '/viewprofile';
        }
    };

    linkToProfile = (username) => {
        this.setState({navigate : true});
        this.setState({username: username});
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
      importAll(r) {
        console.log(r)
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }

      removeAlbumDups(array){
        let temp = array.filter( (ele, ind) => ind === array.findIndex( elem => elem.title === ele.title))
        return temp
      }
    render() {
        let images = this.importAll(require.context('../../public/', false));
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
               let path = ""
               console.log("Meta data:\t" + this.props.location.state.albums[i].meta_data);
               if (this.props.location.state.albums[i].meta_data !== "" && this.props.location.state.albums[i].meta_data !== undefined) {
                    path = this.props.location.state.albums[i].meta_data.split("/")[3];
               } 
                noDups.push(
                    <div className="search-grid-item search-card" onClick={() => this.linkToProfile(this.props.location.state.albums[i].handle)}>
                        <div className="searchProfilePic">
                            <Avatar
                                style={{
                                    margin: "0 auto",                    
                                    width: "100px",
                                    height: "100px",
                                }} 
                                variant="circle"
                                src={images[path]}
                                alt={this.props.location.state.albums[i].firstname + " " + this.props.location.state.albums[i].lastname}
                            />
                        </div>
                        <div className="headerName search-title">
                            <div className="search-name">
                            <h2>
                                {this.props.location.state.albums[i].firstname}
                            <br/>
                                {this.props.location.state.albums[i].lastname}
                            </h2>
                            </div>
                            <h3>
                            @{this.props.location.state.albums[i].handle}
                            </h3>
                        </div>
                </div>

                )
            }
        } else {
            let albumsToFilter = this.props.location.state.albums
            let temp = this.removeAlbumDups(albumsToFilter)
            length = temp.length
            for(let i = 0; i< length; i++){
                //albums
                title = temp[i].title;
                //console.log(title);
                artist = temp[i].artist;
                image = temp[i].art;
                artistImage = temp[i].artistImage;
                albumId = temp[i].id;

             
               
                noDups.push(
                    <div key={temp[i]} className="search-grid-item search-card">
                        
                        <h3>
                            <i>{temp[i].title}</i>
                             <br/>
                             {temp[i].artist}
                            <br></br>
                            <img alt="" src={temp[i].art}></img>
                            <br></br>
                           
                            <div>
                                <form onSubmit={this.sendName(title + "/" + artist + "/" + albumId )}>
                                 {/* + "/" + "\"" + image + "\"" */}
                                    <input className="learn" type="submit" value="Learn about Album" />
                                </form>
                            </div>

                            <div>
                                <form onSubmit={this.sendArtist(artist)}>
                                    <input className="learn" type="submit" value="Learn about Artist" />
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
              <h1> {length} Search Results </h1>
                <div>
                   <div className="search-grid-container">
                       {noDups}
                   </div>
                {this.state.navigate && <Redirect to={{
                    pathname: this.whichUser(this.state.username),
                    state: {"username": this.state.username}
                }}/>}
                </div>
                <div>

            </div>

            </div>

            

        );
    }
}
export default Search;