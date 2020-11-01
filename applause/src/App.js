import React from 'react';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import './App.css';
import Feed from './frontend/components/Feed.js';
import Search from './frontend/components/Search.js';
import CreateAccount from './frontend/components/CreateAccount'
import Login from './frontend/components/Login'
import ResetPassword from './frontend/components/ResetPassword'
import Followers from './frontend/components/Followers';
import Following from './frontend/components/Following';
import ResetScreen from './frontend/components/ResetScreen';
import Profile from './frontend/components/Profile'
import EditProfile from './frontend/components/EditProfile'


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
            <Route path="/followers" component={Followers}/>
            <Route path="/following" component={Following}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path="/reset/:token" component={ResetScreen} />
            <Route path="/feed" component={Feed}/>
            <Route path="/search" component={Search}/>
            {/* <Route path="/profile" component={Profile}/> */}
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
