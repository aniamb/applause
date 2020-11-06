import React from 'react';
import '../styles/Login.css';
import { NavLink, Redirect} from 'react-router-dom'
import PasswordStrengthBar from 'react-password-strength-bar'
import axios from 'axios'

const loading = {
    margin: '1em',
    fontSize: '24px',
  };

class ResetScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            passwordConfirm: '',
            isRedirect: null,
            errorMessage: '',
            isLoading: true,
            error: false
        }
    }

async componentDidMount() {
    sessionStorage.clear();
    console.log(this.props.match.params.token);
    await axios.get('http://localhost:5000/reset', {
        params: {
            resetPasswordToken: this.props.match.params.token,
        }
    }).then(response => {
        console.log(response);
        if(response.data.message === 'password reset link a-ok'){
            this.setState({
                email: response.data.email,
                isLoading: false,
                error: false
            })
            console.log(this.state.email);
        }else{
            this.setState({
                isLoading: false, 
                error: true,
            })
        }
    }).catch(error => {
        console.log(error.data);
    })
}

handlePasswordChange(event) {
    this.setState({password: event.target.value})
}

handlePasswordConfirmChange(event) {
    this.setState({passwordConfirm: event.target.value})
}

handleSubmit(event){
    const { password, passwordConfirm } = this.state
    event.preventDefault();
    const resetpassword = {email: this.state.email, password: this.state.password};
    if(password !== passwordConfirm){
        this.setState({errorMessage: "Passwords Don't Match"});
    } else {
        axios.put('http://localhost:5000/updatePasswordViaEmail', resetpassword).then(response=> {
            if(response.data === 'password updated'){
                this.setState({
                    error: false,
                    errorMessage: 'your password has been reset. you will now be redirected to login'
                })
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 3000);
            }else {
                this.setState({
                    error: true, 
                    errorMessage: 'there was an error in updating your password. please try again'
                })
            }
        })
        .catch((err)=> {
            console.log(err.data)
        })
    }

}

render() {
    const styles = {
        scoreWord: {
          fontSize: 15,
          color: "rgb(82,82,82)",
        }
    }
    const isError = this.state.error;
    const loaded = this.state.isLoading;

    if(isError){
        return (
        <div>
            <div style={loading}>
            <h4>problem resetting password. please send another reset link.</h4>
            <NavLink to="/resetpassword">new reset link</NavLink><br></br>
            </div>
        </div>
        );
    }
  if (loaded) {
    return (
      <div>
        <div style={loading}>Loading User Data...</div>
      </div>
    );
  } else
  return (
    <div>
      <div className="ResetScreen">
             <div className="inputBox">
                 <p> reset password </p>
                 <form onSubmit = {this.handleSubmit.bind(this)}>
                 <input className="inputCreate" type="password" name="password" placeholder="password" value={this.state.password}
                             onChange={this.handlePasswordChange.bind(this)} required/><br></br>
                         <PasswordStrengthBar 
                             className = "passwordbar"
                             password={this.state.password}
                             minLength={1}
                             scoreWordStyle = {styles.scoreWord}
                             barColors = {['#d1d1d1','#db2a33', '#f58c3b', '#177cfe', '#25943f' ]}/>
                             
                         <input className="inputCreate" type="password" name="passwordConfirm" placeholder = "confirm password" value={this.state.passwordConfirm}
                             onChange={this.handlePasswordConfirmChange.bind(this)} required/><br></br>
                     {this.state.errorMessage && <h5 className="error" style={{marginTop: "5px", color: "red", fontSize: "15px"}}> { this.state.errorMessage } </h5>}
                     {/* {this.state.isRedirect && <Redirect to={{
                    pathname: '/login'
                }}/>} */}
                     <input className="submitButtonLogin" type="submit" value="reset" style={{marginTop: '15px'}}/><br></br>
                 </form>
                 <br/>
             </div>
         </div>
    </div>
  )
}
}

export default ResetScreen;