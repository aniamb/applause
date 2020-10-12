import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/EditProfile.css';
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
        edit:false,
        errorMessage:'',
    }
    this.handleHandleChange = this.handleHandleChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
}

componentDidMount(){
    console.log("component mounted");
    console.log(this.props.location.state.email);
    // var localEmail = localStorage.getItem('currentUser');
    var localEmail = this.props.location.state.email;
    //need to change this to use local storage
    // var lookupUser = user.email;
    // localEmail="pujam123@gmail.com";
    axios.get('http://localhost:5000/fillProfile', {
        params: {
            email:localEmail
        }
    })
    .then((response) => {        
        console.log("response received.");
        this.setState({handle: response.data.handle, firstname: response.data.firstname, 
            lastname: response.data.lastname, bio: response.data.bio});
        sessionStorage.setItem("currentUser", response.data.handle);
        
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

    // var currUserEmail = localStorage.getItem('currentUser');
    var currUserEmail = this.props.location.state.email;
    const updateInfo = {handle:this.state.handle, firstname: this.state.firstname, lastname: this.state.lastname, bio:this.state.bio, currUserEmail:currUserEmail}
    axios.post('http://localhost:5000/editprofile', updateInfo).then(response => {
        console.log("Edited profile successfully.");
        sessionStorage.setItem("currentUser", this.state.handle);
        this.props.history.push('/profile');
    }).catch((err) => {
        console.log(err);
        console.log("Edit profile failed.");
        this.setState({errorMessage: err.response.data.message});
    })
}

deleteAccount(event){
    event.preventDefault();
    const deleteAct = {currUser: sessionStorage.getItem("currentUser")};
    axios.post('http://localhost:5000/delete', deleteAct).then(response => {
        console.log("Deleted Account Successfully");
        this.props.history.push('/createaccount');
    }).catch((err) => {
        console.log("Error deleting account");
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
                    <input type="text" id="username" value={this.state.handle} onChange={this.handleHandleChange.bind(this)} maxLength="10"/> 
                    {this.state.errorMessage && <h5 className="error" style={{marginTop: "8px", marginBottom: "1px", color: "red"}}> { this.state.errorMessage } </h5>}
                    <br></br>

                    <label>First Name</label>
                    <input type="text" id="name" value={this.state.firstname} onChange={this.handleFirstnameChange.bind(this)}/> 
                    <br></br>

                    <label>Last Name</label>
                    <input type="text" id="name" value={this.state.lastname} onChange={this.handleLastnameChange.bind(this)}/> 
                    <br></br>

                    <label>Bio</label>
                    <textarea rows="3" cols="20" name="bio" value={this.state.bio} onChange={this.handleBioChange.bind(this)} maxLength="15"/>
                    
                    <input className="submit" type="submit" value="Save Changes"/>
                </form>
            </div>
        </div>
        <input type="button" value="Delete Account" onClick={this.deleteAccount.bind(this)}/>
        {/* {this.state.wantDelete ? <> : null} */}
    </div>

  );
}

}
export default EditProfile