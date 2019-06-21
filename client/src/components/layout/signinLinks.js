import React from 'react'
import {NavLink} from 'react-router-dom';
import Axios from 'axios';

const SignedInLinks = (props)=>{
    const handleSignOut = (e)=>{
        //e.preventDefault();
        Axios.get("/api/logout")
        .then(res=>{
            if(res.msg){
                alert(res.msg);
                props.logout();
            }

        }).catch(err=>{
            alert(err);
        });

    };
    return (
            [<li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/createBlog">Add Story</NavLink></li>,
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" onClick={handleSignOut} to="/">LogOut</NavLink></li>,
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/">Profile Pic</NavLink></li>]
        );
};

export default SignedInLinks;
