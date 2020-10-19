import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'




class AlbumPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        value:'',
        navigate: false,
        albums: []

    }

  
}




render() {
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <h1>yea</h1>


            </div>

        </div>
    </div>

  );
}

}
export default AlbumPage