import React from 'react';
import { Switch, Route, BrowserRouter, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import Feed from './Feed.js';
import Search from './Search.js';

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
            <Route path="/feed" component={Feed}/>
            <Route path="/Search" component={Search}/>
            <Route render= {() =>
                <Feed />
            }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
