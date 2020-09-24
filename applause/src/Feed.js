import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import './App.css';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        //alert('Search Value was: ' + this.state.value);
        event.preventDefault();
        axios.post('http://localhost:3000/searchserver', {searchTerm : this.state.value}).then(response=>{
            console.log('Search is complete')

            // fetch for response here
            // console.log(response.data.results);
            // this.setState({data: this.state.data.concat([response.data.results])})

            // this.setState({navigate: true});
        }).catch((err)=>{
            console.log("Search function failed");
            this.setState({navigate: false});
        })

    }

    render () {
        const { search } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search for Music: 
                        <input type="text" placeholder = "Text Here..." name="name" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </div>

        );
    }
}

export default Feed;