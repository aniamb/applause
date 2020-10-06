import React, {Component} from 'react';
import './App.css';
import './Search.css'
import { NavLink, Redirect} from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigate: false, // only navigates to /search again
            username: ""
        }
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    // linkToProfile = (username) => {
    //     // console.log("THIS IS: " + username);
    //     this.setState({navigate : true});
    //     this.setState({username: username});
    // };

    render() {
        let noDups = [];
        console.log(this.props.location.state.albums[0].title);
        var length = (this.props.location.state.albums.length);
        for(let i = 0; i< length; i++){
            //var image = "\"" + {this.props.location.state.albums[i].art} + "\";
            noDups.push(
                <div key={this.props.location.state.albums[i]} className="searchResults">
                    <h3>
                        Album: {this.props.location.state.albums[i].title}
                        <br></br>
                        Artist: {this.props.location.state.albums[i].artist}
                        <br></br>
                        <img src={this.props.location.state.albums[i].art}></img>

                    </h3>
                </div>
            )
        }
        return (

            <div className="Search">
              <h1> Search Results: </h1>
                <div className="row-timeline">
                  <div className="sidebar" >

                  </div>
                   <div className="userOrder">
                       {noDups}
                   </div>
                {/* {this.state.navigate && <Redirect to={{
                    pathname: '/genericprofile',
                    state: {"username": this.state.username}
                }}/>} */}
                </div>
            </div>

        );
    }
}
export default Search;