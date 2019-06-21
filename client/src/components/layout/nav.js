import React from 'react';
import {NavLink} from 'react-router-dom';
import SigninLinks from './signinLinks';
import SignoutLinks from './signoutLinks';

const Nav = (props)=>{
  var login = props.login;
  const links = login?<SigninLinks logout={props.logout}/>:<SignoutLinks />;
  return(
    <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor:'#39424E'}}>
      <NavLink className="navbar-brand text-white" to="/" >Live Blog</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown mx-2">
          <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Tech</a>
            <a className="dropdown-item" href="#">Culture</a>
            <a className="dropdown-item" href="#">Sports</a>
          </div>
        </li>

        <form className="form-inline my-2 my-lg-0 mx-2">
          <input type="search" placeholder="Search" aria-label="Search" style={{background:'inherit',border:'none',borderBottom:'2px solid white',color:'#e3e8e8'}}/>
          <i className="fa fa-search" aria-hidden="true" style={{cursor:'pointer',color:'white'}}></i>
        </form>

        {links}

        </ul>
      </div>
    </nav>
  );
}

export default Nav;
