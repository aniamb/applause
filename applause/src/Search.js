import React, {Component} from 'React';
import './App.css';
import './Search.css';

class Search extends Component {

    handleSearch = (ev) => {
        this.setState({searchTerm: ev.target.value});
    };
    
    return (
        

    );

}

export default Search;