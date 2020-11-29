import React from 'react';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './frontend/components/PrivateRoute'
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
import ViewProfile from './frontend/components/ViewProfile'
import AlbumPage from './frontend/components/AlbumPage'
import ArtistPage from './frontend/components/ArtistPage'
import Review from './frontend/components/Review'
import EditReview from './frontend/components/EditReview'
import ViewPlaylist from './frontend/components/ViewPlaylist'



function App () {
  return (
    <div className="App">
       <BrowserRouter>
      <div className="App-header">
        <div style={{ textDecoration: "none", fontSize: "70px" }} >
            {/* applause */}
           
            <Link exact to="/feed" style={{ textDecoration: 'none', color: 'black'}}>applause</Link>

              <div  className="topright"> 
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'black'}}>my profile</Link>
              </div>
        </div>
      </div>
     
        <Switch>
            <Route path="/createaccount" component={CreateAccount}/>
            <Route path="/login" component={Login}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <PrivateRoute path="/followers" component={Followers}/>
            <PrivateRoute path="/following" component={Following}/>
            <PrivateRoute path="/viewprofile" component={ViewProfile}/>
            <Route exact path="/reset/:token" component={ResetScreen} />
            <PrivateRoute path="/feed" component={Feed}/>
            <PrivateRoute path="/viewplaylist" component={ViewPlaylist}/>
            <PrivateRoute path="/search" component={Search}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/editprofile" component={EditProfile}/>
            <PrivateRoute exact path="/albumpage/:albumName/:artistName/:albumId" component ={AlbumPage}/>
            <PrivateRoute exact path="/artistpage/:artistName" component ={ArtistPage}/>
            <PrivateRoute exact path="/review/:album/:artist/:albumId" component={Review}/>
            <PrivateRoute exact path="/editreview/:album/:artist/:reviewid" component={EditReview}/>
            <PrivateRoute render= {() =>
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
