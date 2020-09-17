import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import './CreateAccount.css';



class CreateAccount extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        handle: '',
        isSubmitted: false,
        isRedirect: null,
        //receivedRequest: false
    }
}

handleFirstNameChange(event) {
  this.setState({firstname: event.target.value})
}
handleLastNameChange(event) {
  this.setState({lastname: event.target.value})
}
handleEmailChange(event) {
  this.setState({email: event.target.value})
}
handlePasswordChange(event) {
  this.setState({password: event.target.value})
}
handlePasswordConfirmChange(event) {
  this.setState({passwordConfirm: event.target.value})
}
handleHandleChange(event) {
  this.setState({handle: event.target.value})
} 
render() {
  return (
    <div className="CreateAccount">
            <div className="inputBox">
                <p> create an account </p>
                <form>
                        <input className="inputCreate" type="text" name="firstname" placeholder="first name" value={this.state.firstname}
                            onChange={this.handleFirstNameChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="text" name="lastname" placeholder="last name" value={this.state.lastname}
                            onChange={this.handleLastNameChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="email" name="email" placeholder ="email" value={this.state.email}
                            onChange={this.handleEmailChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="password" name="password" placeholder="password" value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                        <br></br>
                        <input className="inputCreate" type="password" name="passwordConfirm" placeholder = "confirm password" value={this.state.passwordConfirm}
                            onChange={this.handlePasswordConfirmChange.bind(this)} required/><br></br>
                        <br></br>
                    <input className="submitButton" type="submit" value="create account"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">existing user?</NavLink><br></br>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/editprofile'
                }}/>}
            </div>
        </div>

  );
}

}
export default CreateAccount