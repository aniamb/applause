import React from 'react';
import { NavLink, Redirect} from 'react-router-dom'
import '../styles/Profile.css';
import axios from 'axios'
import exampleImg from './gkmc.jpg';




// class AlbumPage extends React.Component{
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //         value:'',
// //         navigate: false,
// //         albums: []

// //     }

  
// // }




// render() {
// //  const Album = props => {
//     return (
//       <div className="CreateAccount">
//           <div className="container">
//               <div className="left">
//                   <h1>Album Name</h1>
//                   <h2>Artist Name</h2>
//                   <img src={exampleImg}></img>
//                   <br></br>
//                   <input type="submit" value="Review this Album" />
//                   <h4> Learn more on Genius</h4>

//               </div>
//               <div className="right">Album-related reviews here</div>
//           </div>
//       </div>

//     );
// //  }
// }

// }
// export default AlbumPage;




class AlbumPage extends React.Component {
  render() {
    return (
      <h1>Name: {this.props.name}</h1>
    );
  }
}

// const AlbumPage = (props) => {
//     console.log(props);
//     console.log(props.name);
//       return <h1>{this.props.name}</h1>
//   }
export default AlbumPage;
