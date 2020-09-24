import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import CreateAccount from './CreateAccount'
import Login from './Login'
import ResetPassword from './ResetPassword'


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
            <Route render= {() =>
                // <Timeline />
                <CreateAccount />
            }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
