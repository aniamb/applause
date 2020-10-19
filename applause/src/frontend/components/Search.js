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

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };

    handleSubmit(event) {
        //#alert('Search Value was: ' + this.state.value);
    
            const { search } = this.state; 
            event.preventDefault()
            this.props.history.push('/albumpage');
            console.log("hi");
        }


    render() {
        let noDups = [];

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
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <input type="submit" value="Review this Album" />
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
                  <div className="sidebar" >

                  </div>
                   <div className="userOrder">
                       {noDups}
                   </div>
                {/* {this.state.navigate && <Redirect to={{
                    pathname: '/albumpage',
                    state: {"username": this.state.username}
                }}/>} */}
                </div>
            </div>

        );
    }
}
export default Search;