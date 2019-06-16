import {NavLink } from 'react-router-dom';
import React from 'react';


const SignedOutLinks = (props)=>{
    return (
            [<li className="nav-item mx-2"><NavLink to="/signup" className="nav-link text-white">Sign Up</NavLink></li>,
            <li className="nav-item mx-2"><NavLink to="/signin" className="nav-link text-white">Log In</NavLink></li>]
        );
};



export default SignedOutLinks;
