import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import './Login.css';
import axios from 'axios'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            isSubmitted: false,
            isRedirect: null,
            receivedRequest: false
        }
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
    axios.post('http://localhost:5000/login', loginInfo).then(response=> {
            localStorage.setItem("currentUser", response.data);
            this.setState({isRedirect: true});
        })
        .catch((err)=> {
            this.setState({isRedirect: false});
            alert('Invalid Email/Password');
        })
};
 
render() {
  return (
    <div className="CreateAccount">
            <div className="inputBox">
                <p> welcome back </p>
                <form onSubmit = {this.handleSubmit.bind(this)}>
                        <input className="inputLogin" type="email" name="email" placeholder ="email" value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputLogin" type="password" name="password" placeholder="password" value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    <input className="submitButtonLogin" type="submit" value="login"/><br></br>
                </form>
                <br/>
                <NavLink to="/createaccount">forgot password?</NavLink><br></br>
                <NavLink to="/createaccount">new user?</NavLink><br></br>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/'
                }}/>}
            </div>
        </div>

  );
}

}
export default Login;