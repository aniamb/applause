import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import '../../App.css';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            navigate: false,
            albums: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
    //#alert('Search Value was: ' + this.state.value);

        const { search } = this.state; 
        event.preventDefault();
  

        axios.post('http://localhost:5000/searchserver', {
            value: this.state.value
        })
        .then(res => {
            this.state.albums = res.data.result;
            this.setState({navigate: true});
        })
        .catch(error => {
            console.error(error);
            this.setState({navigate: false});
        })
    }


    render () {

        return (
            <div className="Feed">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Search: 
                        <input className = "searchBox" type="text" name="name" value={this.state.value} onChange={this.handleChange.bind(this)} required/>
                    </label>
                    <input type="submit" value="Search" />
                </form>
                {this.state.navigate && <Redirect to={{
                    pathname: '/search',
                    state: {"albums": this.state.albums}
                }}/>}
            </div>

        );
    }
}

export default Feed;