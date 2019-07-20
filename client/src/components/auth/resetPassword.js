
import React,{Component} from "react";
import axios from 'axios';


class ResetPassword extends Component{
  constructor(props){
    super(props);
    this.state ={password:"",msg:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  };

  handleSubmit(e){
    e.preventDefault();
    axios.post(`/api/reset/${this.props.match.params.token}`,{password:this.state.password})
      .then(res=>{
          this.setState({msg:res.data.msg});
      })
      .catch(err=>{
        this.setState({msg:err.message});
      })
  }

  render(){
    return(
      <div className="row container">
      	<div className="col-md-12">
      		<form onSubmit={this.handleSubmit}>
      		  <legend>Reset Password</legend>
      		  <div className="form-group">
      		    <label for="password">New Password</label>
      		    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="New password" autofocus="autofocus" className="form-control" required />
      		  </div>
      		  <div class="form-group">
      		    <button type="submit" class="btn btn-primary">Update Password</button>
      		  </div>
      		</form>
      	</div>
      </div>
    );
  }
}

export default ResetPassword;