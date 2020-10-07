import React from 'react';
import { Switch, Route, BrowserRouter, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import Feed from './Feed.js';
import Search from './Search.js';
import CreateAccount from './CreateAccount'
import Login from './Login'
import ResetPassword from './ResetPassword'
import ResetScreen from './ResetScreen';



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
            <Route exact path="/Feed" component={Feed}/>
            <Route path="/Search" component={Search}/>
            <Route render= {() =>
                // <Timeline />
                <Feed />
            }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
