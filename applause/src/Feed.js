import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import './App.css';

class Feed extends Component {
    //constructor(props) {
    //     super(props);
    //     this.state = {
    //         searchTerm:''
    //     }
    // }

    // handleSearch = (ev) => {
    //     this.setState({searchTerm: ev.target.value});
    // };

    // handleClick(event){ 
    //     event.preventDefault();
    //     console.log("This is the state:" + this.state.navigate);
    //     axios.post('http://localhost:5000/searchserver', {searchTerm : this.state.searchTerm}).then(response=>{
    //         console.log('Search is complete')

    //         // fetch for response here
    //         console.log(response.data.results);
    //         this.setState({data: this.state.data.concat([response.data.results])})

    //         this.setState({navigate: true});
    //     }).catch((err)=>{
    //         console.log("Search function failed");
    //         this.setState({navigate: false});
    //     })
    // };

    render () {
        return (

            <div className="Feed">
                <h1>hi</h1>
            </div>

        );
    }
}

export default Feed;