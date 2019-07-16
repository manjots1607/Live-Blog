import React from 'react'
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

const SignedInLinks = (props)=>{
    console.log('props of SignedInLinks',props);

    const handleMystories = ()=>{
      Axios.get("http://localhost:5000/blog-api/mystories")
        .then(res=>{
          props.history.push('/temp', {result:res.data});
        })
        .catch(err=>{
          console.log(err.message);
        })
    };

    const handleBookmarks = ()=>{
      console.log("bookmark clicked");
      Axios.get("http://localhost:5000/blog-api/bookmarks")
        .then(res=>{
          console.log("results",res.data);
          props.history.push('/temp', {result:res.data});
        })
        .catch(err=>{
          console.log(err.message);
        })
    };

    const handleSignOut = (e)=>{
        //e.preventDefault();
        Axios.get("/api/logout")
        .then(res=>{
            if(res.data.msg){
                props.logout(undefined);
                props.history.push('/');
            }

        }).catch(err=>{
            alert(err);
        });

    };
    return (
            [<li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/createBlog">Add Story</NavLink></li>,
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" onClick={handleSignOut} to="/">LogOut</NavLink></li>,
            <li className="nav-item dropdown mx-2">
              <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.user.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={handleMystories}>My Stories</a>
                <a className="dropdown-item" href="#" >Following</a>
                <a className="dropdown-item" href="#" onClick={handleBookmarks}>Bookmarks</a>
              </div>
            </li>]
        );
};

export default withRouter(SignedInLinks);
