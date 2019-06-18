import React, {Component} from 'react';
import axios from 'axios';

class CreateBlog extends Component{
    constructor(props){
      super(props);
    this.state = {
      title:"",
      content:"",
      imageURL:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  };

  handleSubmit(e){
    e.preventDefault();
    const data = this.state;

  axios.post(`http://localhost:5000/blog-api/`, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({title:"",
              content:"",
              imageURL:''});
              this.props.history.push('/');
      })
      .catch((err)=>{

      });
  }

  render(){
    const titleStyle = {
      width:'80vw',
      fontSize: '2.5em',
      border: 'none',
      borderBottom:'2px solid #b3b3b1',
      fontFamily: 'serif',
      color: '#b3b3b1'
    }
    const contentStyle = {
      width:'80vw',
      height:'60vh',
      border:'none',
      fontSize:'1.2em'
    }
    const imageStyle = {
      width:'80vw',
      border: 'none',
      borderBottom:'2px solid #b3b3b1',
      fontSize: '1.2em',
      color: 'blue'
    }

    return(
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" id="title" value={this.state.title} style={titleStyle} className="mt-5 mb-2" onChange={this.handleChange} placeholder="Title"/>
          <input type="text" name="imageURL" id="imageURL" value={this.state.imageURL} onChange={this.handleChange} style={imageStyle} className="mt-3 mb-2" placeholder="Paste the image URL"/>
          <textarea  name="content" id="content" style={contentStyle} value={this.state.content} onChange={this.handleChange} className="mt-3" placeholder="Start your story..."></textarea>
          <button className="btn btn-outline-success mb-3">Publish</button>
        </form>
      </div>
    );
  }
}

export default CreateBlog;
