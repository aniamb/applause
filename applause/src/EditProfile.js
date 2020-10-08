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
        firstname:"",
        lastname:"",
        handle:"",
        bio:"",
        // user:user,
        edit:false
    }
    this.handleHandleChange = this.handleHandleChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
}

componentDidMount(){
    console.log("component mounted");
    console.log(localStorage.getItem("currentUser"));

    var localEmail = localStorage.getItem('currentUser');
    //need to change this to use local storage
    // var lookupUser = user.email;
    // localEmail="pujam123@gmail.com";
    axios.get('http://localhost:5000/profile', {
        params: {
            email:localEmail
        }
    })
    .then((response) => {        
        console.log("response received.");
        this.setState({handle: response.data.handle, firstname: response.data.firstname, 
            lastname: response.data.lastname, bio: response.data.bio});
    })
    .catch((err) => {
        console.log('error getting info');
    });
}

editProfile = () => {
    this.setState({edit:true});
}

handleHandleChange(event) {
    this.setState({handle: event.target.value});
}

handleFirstnameChange(event) {
    this.setState({firstname: event.target.value});
}

handleLastnameChange(event) {
    this.setState({lastname: event.target.value});
}

handleBioChange(event) {
    this.setState({bio: event.target.value});
}

handleSubmit(event){
    event.preventDefault();
    event.target.reset();

    var currUserEmail = localStorage.getItem('currentUser');
    // currUserEmail = "pujam123@gmail.com";
    const updateInfo = {handle:this.state.handle, firstname: this.state.firstname, lastname: this.state.lastname, bio:this.state.bio, currUserEmail:currUserEmail}
    axios.post('http://localhost:5000/editprofile', updateInfo). then(response => {
        console.log("Edited profile successfully.");
    }).catch((err) => {
        console.log("Edit profile failed.");
    })
}

render() {
  return (
    <div className="CreateAccount">
        <div className="container">
            <div className="left">
                <FontAwesomeIcon className="prof" icon={faUserCircle} size="sm"/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Handle</label>
                    <input type="text" id="username" value={this.state.handle} onChange={this.handleHandleChange.bind(this)}/> 
                    <br></br>

                    <label>First Name</label>
                    <input type="text" id="name" value={this.state.firstname} onChange={this.handleFirstnameChange.bind(this)}/> 
                    <br></br>

                    <label>Last Name</label>
                    <input type="text" id="name" value={this.state.lastname} onChange={this.handleLastnameChange.bind(this)}/> 
                    <br></br>

                    <label>Bio</label>
                    <textarea rows="3" cols="20" name="bio" value={this.state.bio} onChange={this.handleBioChange.bind(this)}/>
                    
                    <input className="submit" type="submit" value="Save Changes"/>
                </form>
            </div>
        </div>
    </div>

  );
}

}
export default EditProfile