import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Signin from './components/auth/signinForm';
import Signup from './components/auth/signupForm';
import Nav from './components/layout/nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
