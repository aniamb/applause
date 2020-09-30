import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar'
import './CreateAccount.css';
import axios from 'axios'



class CreateAccount extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        isSubmitted: false,
        isRedirect: null,
    }
}
componentDidMount(){
  localStorage.clear();
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
handleSubmit(event){
  const { password, passwordConfirm } = this.state
  event.preventDefault();
  event.target.reset();
  const registerInfo = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm}
  if(password !== passwordConfirm){
      alert("Passwords don't match");
  }else{
      axios.post('http://localhost:5000/createaccount', registerInfo).then(response=> {
          console.log(this.state.firstname);
          localStorage.setItem("currentUser", response.data);
          console.log('create account success');
          this.setState({isRedirect: true})
      })
       .catch((err)=> {
           this.setState({isRedirect: false});
           console.log('create account fail');
           alert(err.response.data.message);
       })
      }
}
render() {
  const styles = {
    scoreWord: {
      fontSize: 15,
      color: "rgb(82,82,82)",
    }
  };
  return (
    <div className="CreateAccount">
            <div className="inputBox">
                <p> create an account </p>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                        <PasswordStrengthBar 
                            className = "passwordbar"
                            password={this.state.password}
                            minLength={5}
                            scoreWordStyle = {styles.scoreWord}
                            barColors = {['#d1d1d1','#db2a33', '#f58c3b', '#177cfe', '#25943f' ]}/>
                             
                        <input className="inputCreate" type="password" name="passwordConfirm" placeholder = "confirm password" value={this.state.passwordConfirm}
                            onChange={this.handlePasswordConfirmChange.bind(this)} required/><br></br>
                        <br></br>
                    <input className="submitButton" type="submit" value="create account"/><br></br>
                </form>
                <br/>
                <NavLink to="/login">existing user?</NavLink><br></br>
                {this.state.isRedirect && <Redirect to={{
                    pathname: '/login'
                }}/>}
            </div>
        </div>

  );
}

}
export default CreateAccount