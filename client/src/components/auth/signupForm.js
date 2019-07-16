import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();

    Axios.post("http://localhost:5000/api/register",
      {
        username: this.state.email,
        password: this.state.password,
        name:this.state.username
      })
      .then(res => {
        if (res.data.success === "true") {
          this.props.login(res.data.user);
          this.props.history.push("/");
        }
        else {
          alert("there is some problem ");
        }
      }).catch(err => {
        console.log(err);
        alert(err);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("signUpform : ",this.props.isLogin);
    if(!(this.props.isLogin===undefined)){
      this.props.history.replace("/");
    }
    const formInputStyle = {
      fontSize: '1.3em',
      fontFamily: "san-frans",
      backgroundColor: "#e3e8e8"
    };
    const labelStyle = {
      fontSize: '1.2em',
    };
    const cardHeaderStyle = {
      fontSize: '1.6em',
      fontFamily: 'ariel',
    };
    return (
      <div className="container mt-5 pt-3">
        <div className="row">

          <div className="col-md-3 col-sm-0"></div>

          <div className=" col-md-6 col-sm-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6 p-2" style={{ fontSize: '1.5em' }} >Sign Up</div>
                  <div className="col-sm-6 p-2 shadow" style={{ fontSize: '1.5em', backgroundColor: '#1BA94C', color: '#fff' }}><Link to="/signin" style={{ color: '#fff', textDecoration: 'none' }}>Sign In</Link></div>
                </div>
                <br />
                <br />
                <form action="" method="POST" onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label for="username" className="col-sm-3 col-form-label" style={labelStyle}>Name <i className="fa fa-user" aria-hidden="true"></i></label>
                    <div className="col-sm-9">
                      <input className="form-control" type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} style={formInputStyle} />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="email" className="col-sm-3 col-form-label" style={labelStyle}>Email <i class="fa fa-envelope" aria-hidden="true"></i></label>
                    <div className="col-sm-9">
                      <input className="form-control" type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} style={formInputStyle} />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="password" class="col-sm-3 col-form-label" style={labelStyle}>Password <i class="fa fa-lock" aria-hidden="true"></i></label>
                    <div className="col-sm-9">
                      <input className="form-control" type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} style={formInputStyle} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 col-md-6"></div>
                    <div className="col-sm-9 col-md-6 text-right"><span className="text-info">Forgot your password?</span></div>
                  </div>
                  <button className="btn btn-lg text-white shadow" style={{ backgroundColor: '#1BA94C', float: 'right' }}>Sign Up</button>
                  <br />
                  <br />
                  <br />
                  <p className="text-secondary" style={{ fontSize: '1.2em' }}>or connect with</p>
                  <br />
                  <div className="row">

                    <div className="col-sm-3"></div>

                    <div className="col-sm-2">
                      <a><img class="social-btn-icon" alt="Login with Google" src="https://hrcdn.net/fcore/assets/google-colored-20b8216731.svg" /></a>
                    </div>

                    <div className="col-sm-2"></div>

                    <div className="col-sm-2">
                      <a><img class="social-btn-icon" alt="Login with Facebook" src="https://hrcdn.net/fcore/assets/facebook-colored-af4249157d.svg" /></a>
                    </div>

                    <div className="col-sm-3"></div>

                  </div>
                </form>
                <br />
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-0"></div>

        </div>
      </div>
    );
  }
}

export default Signup;
