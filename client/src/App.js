import React ,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Signin from './components/auth/signinForm';
import Signup from './components/auth/signupForm';
import Nav from './components/layout/nav';
import CreateBlog from './components/blog/createBlog';
import Dashboard from './components/dashboard/dashboard';
import DisplayBlog from './components/blog/displayBlog';
import Axios from 'axios';

class App extends  Component{
  
  state={
    login:false
  }

  loginHandler=()=>{
    this.setState({login:!this.state.login});
  }
  render(){

    Axios.defaults.withCredentials = true
    return (
      <BrowserRouter>
        <div className="App">
          <Nav login={this.state.login} logout={this.loginHandler} />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/createBlog' component={CreateBlog}/>
            <Route exact path="/signin" 
              render={(props) => <Signin {...props} isLogin={this.state.login} login={this.loginHandler} />}
            />
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/blog/:blogId" component={DisplayBlog}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
