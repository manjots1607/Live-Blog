import React ,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Signin from './components/auth/signinForm';
import Signup from './components/auth/signupForm';
import Nav from './components/layout/nav';
import CreateBlog from './components/blog/createBlog';
import Dashboard from './components/dashboard/dashboard';
import DisplayBlog from './components/blog/displayBlog';
import UpdateBlog from './components/blog/updateBlog';
import Axios from 'axios';

class App extends  Component{

  state={
    user:undefined
  }

  loginHandler=(user)=>{
    this.setState({user});
  }
  render(){

    Axios.defaults.withCredentials = true
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.user} logout={this.loginHandler} />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/createBlog' component={CreateBlog}/>
            <Route exact path="/signin"
              render={(props) => <Signin {...props} isLogin={this.state.user} login={this.loginHandler} />}
            />
            <Route exact path="/signup"
              render={(props) => <Signup {...props} isLogin={this.state.user} login={this.loginHandler} />}
            />
            <Route exact path="/blog/:blogId" component={DisplayBlog}/>
            <Route exact path="/blog/:blogId/edit" component={UpdateBlog}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
