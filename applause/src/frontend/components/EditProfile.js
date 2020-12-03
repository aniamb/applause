import React from 'react';
import '../styles/EditProfile.css';
import axios from 'axios'
import { Avatar } from '@material-ui/core';

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
        this.setState({handle: response.data.handle, firstname: response.data.firstname, lastname: response.data.lastname,
                      bio: response.data.bio, visibility: response.data.visibility, path: response.data.meta_data.split("/")[3]});
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

handlePictureChange(event) {
    this.setState({file: event.target.files[0]})
}

handleOptionChange(event) {
    this.setState({visibility: event.target.value});
}

handleSubmit(event){
    event.preventDefault();
    event.target.reset();

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

        // Nothing is being uploaded, so it will send avatar.png
        
        //  We first check if there is a path that already exists by checking if it's set
        //    to default of avatar.png
        if (this.state.path !== undefined && !this.state.path.includes("avatar.png")) {
          // We found that the path exists, so we now check wheter or not that the response
            // was set to avatar
            if (response.data.includes("avatar.png")) {
              this.setState({path: "../../public/" + this.state.path})

              // Now we know that the user has given us a picture
            } else {
              this.setState({path: "../" + response.data});
            }
        } else {
          this.setState({path: "../" + response.data});
        } 

        const updateInfo = {handle:this.state.handle, firstname: this.state.firstname, lastname: this.state.lastname, bio:this.state.bio, currUserEmail:currUserEmail, meta_data: this.state.path, visibility: this.state.visibility};
        
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

importAll(r) {
  let images = {};
  r.keys().map((item, index) => { 
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

render() {

  let images = this.importAll(require.context('../../public/', false));

  return (
    <div className="EditProfile">
        <div className="container">
            <div className="left">
                <Avatar 
                  style={{
                    marginTop: "20px",
                    display: 'inline-block',
                    verticalAlign:"middle",
                    width: "15vw",
                    height: "15vw",
                  }} 
                  variant="circle"
                  src={images[this.state.path]}
                  alt={this.state.firstname + " " + this.state.lastname}
                />
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="file" id="file" className="inputfile" name="file" onChange= {this.handlePictureChange} />
                    <label for="file">Choose Image</label>

                    <label className="editTitle">Handle</label>
                    <input type="text" id="username" className="editProfileInput" required value={this.state.handle} onChange={this.handleHandleChange.bind(this)} maxLength="10"/> 
                    {this.state.errorMessage && <h5 className="error" style={{marginTop: "8px", marginBottom: "1px", color: "red"}}> { this.state.errorMessage } </h5>}

                    <label className="editTitle">First Name</label>
                    <input type="text" id="name" className="editProfileInput" value={this.state.firstname} onChange={this.handleFirstnameChange.bind(this)}/> 

                    <label className="editTitle">Last Name</label>
                    <input type="text" id="name" className="editProfileInput" value={this.state.lastname} onChange={this.handleLastnameChange.bind(this)}/> 

                    <label className="editTitle">Bio</label>
                    <textarea rows="3" cols="20" name="bio" className="editProfileInputTextArea" value={this.state.bio} onChange={this.handleBioChange.bind(this)} maxLength="15"/>

                    <label className="editTitle">Profile</label>
                        {/* <br/> */}
                        <input type="radio" id="public" name="visibility" value="public" checked={this.state.visibility === 'public'} onChange = {this.handleOptionChange.bind(this)}/>
                        <label for="public">  Public</label>
                        <br/>
                        <input type="radio" id="private" name="visibility" value="private" checked={this.state.visibility === 'private'} onChange = {this.handleOptionChange.bind(this)}/>
                        <label for="private">Private</label><br/>  
                      
                      {/* <br/> */}
                    <input className="submit button" type="submit" value="Save Changes"/>
                </form>
                <input className = "button" type="button" value="Delete Account" onClick={this.deleteAccount.bind(this)}/>
            </div>
        </div>        
    </div>

  );
}

}
export default EditProfile