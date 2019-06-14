import React from 'react'
import {NavLink} from 'react-router-dom';

const SignedInLinks = (props)=>{
    const handleSignOut = (e)=>{
        //e.preventDefault();

    };
    return (
            [<li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/createBlog">Add Story</NavLink></li>,
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" onClick={handleSignOut} to="/">LogOut</NavLink></li>,
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/">Profile Pic</NavLink></li>]
        );
};

export default SignedInLinks;
