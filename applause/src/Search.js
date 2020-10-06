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
        for(let i = 0; i< this.props.location.state.albums[0].length; i++){
            noDups.push(
                <div key={this.props.location.state.albums[0][i]} className="searchResults">
                    <h3>
                        {this.props.location.state.albums[0][i]}
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