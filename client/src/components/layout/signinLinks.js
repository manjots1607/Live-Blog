import React from 'react'
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

const SignedInLinks = (props)=>{
    console.log('props of SignedInLinks',props);
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
            <li className="nav-item mx-2"><NavLink className="nav-link text-white" to="/"><img width="30" height="30" href={props.user.authorURL} /></NavLink></li>]
        );
};

export default withRouter(SignedInLinks);
