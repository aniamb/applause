import React, {Component, Fragment} from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import './App.css';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm:''
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
      };

    render () {
        const { search } = this.state;

        return (
            <div>
                <h1>yuh</h1>
                <form>
                    <label>
                        Search:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default Feed;