import React, {Component} from 'react';
import '../../App.css';
import '../styles/Search.css'
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

    render() {
        let noDups = [];

        var length = (this.props.location.state.albums.length);

        if (length === 0){
            noDups.push(<h3>No results.</h3>)
        } else if (!this.props.location.state.albums[0].title) {
            for(let i = 0; i < length; i++){
               
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
                //var image = "\"" + {this.props.location.state.albums[i].art} + "\";
                noDups.push(
                    <div key={this.props.location.state.albums[i]} className="searchResults">
                        <h3>
                            <i>{this.props.location.state.albums[i].title}</i>
                                , {this.props.location.state.albums[i].artist}
                            <br></br>
                            <br></br>
                            <img src={this.props.location.state.albums[i].art}></img>
                            <br></br>
                            <button>Review this Album</button>

                        </h3>
                    </div>
                )
            }
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