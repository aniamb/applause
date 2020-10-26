import React, {Component} from 'react';
import '../../App.css';
import '../styles/Search.css';
import { NavLink, Redirect} from 'react-router-dom'
import AlbumPage from './AlbumPage.js';



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

        //no results
        if (length === 0){
            noDups.push(<h3>No results.</h3>)
        } else if (!this.props.location.state.albums[0].title) {
            //users
            for(let i = 0; i < length; i++){
               
                noDups.push(
                    <div key={this.props.location.state.albums[i]} className="searchResults">
                        <h3>
                            <button>@{this.props.location.state.albums[i]}</button>
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
                //console.log(name);
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
                                <form onSubmit={this.sendName(title + "/" + artist )}>
                                 {/* + "/" + "\"" + image + "\"" */}
                                    <input type="submit" value="Learn about Album" />
                                </form>
                            </div>

                            <div>
                                <form onSubmit={this.sendName(artist)}>
                                 
                                    <input type="submit" value="Learn about Artist" />
                                </form>
                            </div>

                        </h3>
                    </div>
                )
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