import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
import ResetPassword from './ResetPassword'
import ResetScreen from './ResetScreen';
import Profile from './Profile'
import EditProfile from './EditProfile'


function App () {

  return (
    <div className="App">
      <div className="App-header">
          <div style={{ textDecoration: "none", fontSize: "70px" }}>
           applause
            </div>
      </div>
      <BrowserRouter>
        <Switch>
            <Route path="/createaccount" component={CreateAccount}/>
            <Route path="/login" component={Login}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route exact path="/reset/:token" component={ResetScreen} />
            <Route path="/profile" component={Profile}/>
            <Route path="/editprofile" component={EditProfile}/>
            <Route render= {() =>
                // <Timeline />
                <CreateAccount />
                // <Profile />
            }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
