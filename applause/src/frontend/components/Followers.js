import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import '../styles/Follow.css';
import axios from 'axios'


class Followers extends Component{
  constructor(props){
      super(props);
      this.state = {
          username: "",
          currHandle: null,
          followerData: [],
          followerRedirect: false,
          navigate: false,
          userNames: [],
          hand: "",
          users: []
      }
  }

  whichUser = (username) => {
    if (username === sessionStorage.getItem('currentUser')) {
      return "/profile";
    } else {
      return '/viewprofile';
    }
  };

  linkToProfile = (username) => {
      this.setState({navigate : true});
      this.setState({username: username});
  };  

  componentDidMount() {
    var currHandle = null;

    if (this.props.location.state.hand === "") {
      currHandle = sessionStorage.getItem('currentUser');
      console.log(currHandle);
    } else {
      currHandle = this.props.location.state.hand;
      console.log(currHandle);
    }
    
    axios.get('http://localhost:5000/followers', {
        params: {
          userHandle: currHandle
        }
      }).then((response) => {
        console.log(response)
        
        this.setState({followerData: response.data.results})
        // console.log(response.data)
        this.setState({followerRedirect: true});

        var temp_users = [];
        
        for (let index = 0; index < response.data.results.length; index++) {
            console.log("Iterating with \t" + response.data.results[index]);

            axios.get('http://localhost:5000/profile', {
              params: {
                  userHandle: response.data.results[index]
              }
            })
            .then((r) => {   
              console.log("Got User");
              // this.setState({user: response.data});
              console.log(r);

              // if (response.data.meta_data !== "") {
              //   this.setState({path: response.data.meta_data.split("/")[3]});
              // }

              var temp = [];
              temp.push(r.data);
              

              var joined = this.state.users.concat(temp)
              this.setState({users: joined});

            })
            .catch((err) => {
                console.log('error getting info');
                console.log(err);
            });
        }
        
        // console.log(temp_users)
        // this.setState({users: temp_users});
        // console.log(this.state.users)
        
      })
      .catch((err) => {
        console.log('error getting info');
        this.setState({followerRedirect: false});

      })
  }

  importAll(r) {
    console.log(r)
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  render() {

    let userNames = [];
    let images = this.importAll(require.context('../../public/', false));

    // console.log(this.state.followerData);
    // console.log(this.state.followerData.length);
    // console.log(this.state.users.length)
    
    for(let i = 0; i< this.state.users.length; i++){

        // Grabs the user object
        console.log(this.state.users[i].handle);

        let path = ""
        console.log("Meta data:\t" + this.state.users[i].meta_data);
        if (this.state.users[i].meta_data !== "" && this.state.users[i].meta_data !== undefined) {
          path = this.state.users[i].meta_data.split("/")[3];
        } 

        userNames.push(
            <div className="follow" onClick={() => this.linkToProfile(this.state.users[i].handle)}>
              <div className="followProfPic">
                <Avatar
                  style={{
                    float: "left",
                    // margin: "auto",
                    margin: "5%",
                    // marginTop: "5%",
                    
                    width: "100px",
                    height: "100px",
                  }} 
                  variant="circle"
                  src={images[path]}
                  alt={this.state.users[i].firstname + " " + this.state.users[i].lastname}
                />
              </div>
              <div className="headerName">
                <h2>
                  {this.state.users[i].firstname} {this.state.users[i].lastname}
                </h2>
                <h3>
                  @{this.state.users[i].handle}
                </h3>
              </div>
            </div>
        )
    }

    userNames.sort();

    return (
      
      <div className="header">
        
        <h1> Followers!</h1>
          <div className="row">
            <div className="userOrder">
                {userNames}
            </div>
          {this.state.navigate && <Redirect to={{
              pathname: this.whichUser(this.state.username),
              state: {"username": this.state.username}
          }}/>}
          </div>
      </div>

    );
  }
}

export default Followers;