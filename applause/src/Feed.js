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
        alert('Search Value was: ' + this.state.value);
        event.preventDefault();
        axios.post('/searchserver', {value : this.state.value}).then(response=>{
           console.log('Search is complete')

        }).catch((err)=>{
            console.log("Search function failed");
            this.setState({navigate: false});
        })

    }

    render () {
        const { search } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Search for Music: 
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </div>

        );
    }
}

export default Feed;