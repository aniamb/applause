import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import './Login.css';
import axios from 'axios'

class ResetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isSubmitted: false,
            isRedirect: null,
            receivedRequest: false,
            errorMessage: ''
        }
    }
componentDidMount(){
    localStorage.clear();
}

handleEmailChange(event) {
  this.setState({email: event.target.value})
}

handleSubmit(event){
    event.preventDefault();
    event.target.reset();
    this.setState({receivedRequest: true});
    const resetemail = {email: this.state.email};
    axios.post('http://localhost:5000/resetpassword', resetemail).then(response=> {
            localStorage.setItem("currentUser", response.data);
            this.setState({isRedirect: true});
            console.log("user exists");
            alert('Found User Account')
        })
        .catch((err)=> {
            this.setState({isRedirect: false});
            // alert(err.response.data.message);
            this.setState({errorMessage: err.response.data.message});
        })
};
 
render() {
  return (
    <div className="ResetPassword">
            <div className="inputBox">
                <p> reset password </p>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                        <input className="inputLogin" type="email" name="email" placeholder ="email" value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)} required/><br></br>
                        <br></br>
                    {this.state.errorMessage && <h5 className="error" style={{marginTop: "0", color: "red"}}> { this.state.errorMessage } </h5>}
                    <input className="submitButtonLogin" type="submit" value="reset"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">back to login</NavLink><br></br>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/'
                }}/>}
            </div>
        </div>

  );
}

}
export default ResetPassword;