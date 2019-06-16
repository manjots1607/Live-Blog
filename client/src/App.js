import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Signin from './components/auth/signinForm';
import Signup from './components/auth/signupForm';
import Nav from './components/layout/nav';
import CreateBlog from './components/blog/createBlog';
import Dashboard from './components/dashboard/dashboard';
import DisplayBlog from './components/blog/displayBlog';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/createBlog' component={CreateBlog}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/blog/:blogId" component={DisplayBlog}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
