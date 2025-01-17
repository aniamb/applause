import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Login.css';
import axios from 'axios'
import validator from 'validator'
import GoogleButton from 'react-google-button'



class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isSubmitted: false,
            isRedirect: null,
            receivedRequest: false,
            errorMessage: '',
        }
    }

componentDidMount(){
    sessionStorage.clear();
}
handleEmailChange(event) {
  this.setState({email: event.target.value})
}
handlePasswordChange(event) {
  this.setState({password: event.target.value})
}

handleSubmit(event){
    event.preventDefault();
    event.target.reset();
    this.setState({receivedRequest: true});
    const loginInfo = {email: this.state.email, password:this.state.password};
    if(!validator.isEmail(this.state.email)){
        this.setState({errorMessage: "Email Format is Incorrect"});
    } else { 
        axios.post('http://localhost:5000/login', loginInfo).then(response=> {
            console.log(response.data);
            sessionStorage.setItem("currentUser", response.data);
            sessionStorage.setItem("loggedIn", "true");
            this.setState({isRedirect: true});
            // this.props.history.push('/resetpassword');
           // this.props.history.push('/profile');

        })
        .catch((err)=> {
            this.setState({isRedirect: false});
            console.log("err:\t", err);
            this.setState({errorMessage: err.response.data.message});
        })
    }
};
 
render() {
  return (
    <div className="Login">
            <div className="inputBox">
                <p> welcome back </p>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                        <input className="inputLogin" type="text" name="email" placeholder ="email" value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)} required/><br></br>
                        <input className="inputLogin" type="password" name="password" placeholder="password" value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                        <br></br>
                       
                        { this.state.errorMessage && <h3 className="error" style={{marginTop: "0", color: "red"}}> { this.state.errorMessage } </h3> }
                    <input className="submitButtonLogin" type="submit" value="login"/><br></br>
                </form>
                <br/>
                <NavLink to="/resetpassword">forgot password?</NavLink><br></br>
                <NavLink to="/createaccount">new user?</NavLink><br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <a href="http://localhost:5000/auth/google" >
                  <GoogleButton
                    className="googleBtn"
                    type="light" // can be light or dark
                    onClick={() => { this.setLoggedIn() }}
                  />
                </a>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/profile'
                }}/>}
            </div>
        </div>

  );
}

}
export default Login;