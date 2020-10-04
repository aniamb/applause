import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import './EditProfile.css';
import axios from 'axios'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user =
    {
        "firstname":"Jane",
        "lastname":"Doe",
        "handle": "janedoe",
        "email": "1234@mail.net",
        "password":"1234",
        "reviews": {},
        "followers":{"1":"hi"},
        "following":{},
        "favorites":{},
        "groups":{},
        "bio": "Lover of Pop, Harry Styles, and Country Music"
    }

class EditProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        user:user,
        edit:false
    }
}

componentDidMount(){
    console.log("component mounted");

    //need to change this to use local storage
    var lookupUser = user.email;
    axios.get('http://localhost:5000/profile', {
        params: {
            email:lookupUser
        }
    })
    .then((response) => {        
        console.log("response received.");
        this.setState({user: response.data});
    })
    .catch((err) => {
        console.log('error getting info');
    });
}

editProfile = () => {
    this.setState({edit:true});
}

render() {
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <FontAwesomeIcon className="prof" icon={faUserCircle} size="sm"/>
                <form>
                    <label>Handle</label>
                    <input type="text" id="username" value={this.state.user.handle}/> 
                    <br></br>

                    <label>First Name</label>
                    <input type="text" id="name" value={this.state.user.firstname}/> 
                    <br></br>

                    <label>Last Name</label>
                    <input type="text" id="name" value={this.state.user.lastname}/> 
                    <br></br>

                    <label>Bio</label>
                    <textarea rows="3" cols="20" name="bio" value={this.state.user.bio} />
                </form>
                <input className="submit" type="submit" value="Save Changes"/>
            </div>
        </div>
    </div>

  );
}

}
export default EditProfile