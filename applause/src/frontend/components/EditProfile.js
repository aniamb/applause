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
        "bio": "Lover of Pop, Harry Styles, and Country Music",
        "file": null
    }

class EditProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        firstname:"",
        lastname:"",
        handle:"",
        bio:"",
        edit:false,
        errorMessage:'',
        file: null,
        path: "",
        visibility: ""
    }
    this.handleHandleChange = this.handleHandleChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
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
            lastname: response.data.lastname, bio: response.data.bio, visibility: response.data.visibility});
        sessionStorage.setItem("currentUser", response.data.handle);
        console.log("visibiliy = " + this.state.visibility)
        
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

handlePictureChange(event) {
    this.setState({file: event.target.files[0]})
}

handleOptionChange(event) {
    this.setState({visibility: event.target.value});
    console.log(this.state.visibility);
}

handleSubmit(event){
    event.preventDefault();
    event.target.reset();

    // var currUserEmail = localStorage.getItem('currentUser');
    var currUserEmail = this.props.location.state.email;

      const formData = new FormData();
      formData.append("file",this.state.file);

      console.log("Form\t" + formData)

      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };

    // Calls the server for uploading a picture
      axios.post('http://localhost:5000/uploadpicture', formData).then(response => {
        console.log(response.data);
        // Get's the path from the server to then be posted to the user's meta_data schema
        this.setState({path: response.data});
        const updateInfo = {handle:this.state.handle, firstname: this.state.firstname, lastname: this.state.lastname, bio:this.state.bio, currUserEmail:currUserEmail, meta_data: "../" + response.data, visibility: this.state.visibility};
        
        axios.post('http://localhost:5000/editprofile', updateInfo).then(r => {
            console.log("Edited profile successfully.");
            sessionStorage.setItem("currentUser", this.state.handle);
            this.props.history.push('/profile');
        }).catch((err) => {
            console.log(err);
            console.log("Edit profile failed.");
            this.setState({errorMessage: err.r.data.message});
        })
    }).catch((err) => {
        console.log(err);
        console.log("Profile Picture Upload failed.");
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
    <div className="EditProfile">
        <div className="container">
            <div className="left">
                <FontAwesomeIcon className="prof profileIcon" icon={faUserCircle} size="6x"/>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="file" className="custom-file-input" name="myImage" onChange= {this.handlePictureChange} />
                    {console.log(this.state.file)}
                    {/* <button className="upload-button" type="submit">Upload to DB</button> */}
                    <br></br>
                    <label>Handle</label>
                    <input type="text" id="username" required value={this.state.handle} onChange={this.handleHandleChange.bind(this)} maxLength="10"/> 
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
                    <br></br>

                    <label>Profile</label>
                        <input type="radio" id="public" name="visibility" value="public" checked={this.state.visibility === 'public'} onChange = {this.handleOptionChange.bind(this)}/>
                        <label for="public">public</label>
                        <input type="radio" id="private" name="visibility" value="private" checked={this.state.visibility === 'private'} onChange = {this.handleOptionChange.bind(this)}/>
                        <label for="private">private</label><br/>  

                    <input className="submit button" type="submit" value="Save Changes"/>
                </form>
                <input className = "button" type="button" value="Delete Account" onClick={this.deleteAccount.bind(this)}/>
            </div>
        </div>
        
        {/* {this.state.wantDelete ? <> : null} */}
    </div>

  );
}

}
export default EditProfile