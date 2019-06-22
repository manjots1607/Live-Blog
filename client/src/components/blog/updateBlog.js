import React, {Component} from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');


class UpdateBlog extends Component{
    constructor(props){
      super(props);
    this.state = {
      title:"",
      content:"",
      imageURL:'',
      blogId:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount()
  {
    axios.get(`http://localhost:5000/blog-api/${this.props.match.params.blogId}`)
    .then(res=>{
      const {title,imageURL,content} = res.data
      const {authorURL,username} = res.data.author;
      const blogId = res.data._id;
      this.setState({title,authorURL,imageURL,content,username,blogId});
    })
    .catch(err=>{
      console.log(this.props.match.params.blogId);
      console.log(err);
    })
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  };

  handleKeyPress(e){
    const updateBlog = this;
    var startPosition = document.querySelector('.updateContent').selectionStart;
    var endPosition = document.querySelector('.updateContent').selectionEnd;
    var x = e.charCode || e.keyCode || e.which;
      if(x!=32){
        console.log("keypress");
        socket.emit('updateContent-keypress',{
          a:startPosition,
          b:endPosition,
          x:x,
          blogId:updateBlog.state.blogId
        });
      }
  }

  handleKeyUp(e){
    const updateBlog = this;
    var startPosition = document.querySelector('.updateContent').selectionStart;
    var endPosition = document.querySelector('.updateContent').selectionEnd;
    console.log('positions are',startPosition,endPosition);
    var x = e.charCode || e.keyCode || e.which;  // Get the Unicode value
    // Check if you've selected text
      if((x==8) && startPosition==0&&endPosition!=0){
      }
      else if(x==8){  //backspace
        console.log("keyup");
        socket.emit('updateContent-keyup',{
          a:startPosition,
          b:endPosition,
          x:x,
          blogId:updateBlog.state.blogId
        });
        //p.innerText = p.innerText.substring(0,startPosition) + p.innerText.substring(startPosition+1);
      }else if(x==32){  //space
        console.log("keyup");
        socket.emit('updateContent-keyup',{
          a:startPosition,
          b:endPosition,
          x:x,
          blogId:updateBlog.state.blogId
        });
      }
}

  handleSubmit(e){
    e.preventDefault();
    const data = this.state;

  // axios.post(`http://localhost:5000/blog-api/`, { data })
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //       this.setState({title:"",
  //             content:"",
  //             imageURL:''});
  //             this.props.history.push('/');
  //     })
  //     .catch((err)=>{
  //
  //     });
  }

  render(){
    const {title,imageURL,content,authorURL,username} = this.state;
    const contentStyle = {
      width:'80vw',
      height:'60vh',
      border:'none',
      fontSize:'1.2em'
    }


    return title ===""?<p>Some fancy annimation</p>:(
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-6 sm-12">
            <h1 className="allign-middle mb-5 text-left">{title}</h1>
            <div>
              <img src={authorURL} style={{borderRadius:'50%',width:'80px'}} className="float-left"/>
              <span className="float-left text-primary ml-4" style={{fontSize:'1.3em',position:'relative',top:'20px'}}>{username}</span>
              <button className="btn-sm btn btn-outline-secondary float-left ml-5" style={{position:'relative',top:'20px'}}>Follow</button>
            </div>
          </div>
          <div className="col-md-6 sm-12">
            <img src={imageURL} className="img-fluid" style={{maxHeight:'50vh'}}/>
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col-md-1 col-sm-0"></div>
          <div className="col-md-10 col-sm-12">
          <textarea onKeyPress={this.handleKeyPress} onKeyUp={this.handleKeyUp} name="content" id="content" style={contentStyle} value={this.state.content} onChange={this.handleChange} className="mt-3 updateContent" placeholder="Start your story..."></textarea>
          </div>
          <div className="col-md-1 col-sm-0"></div>
        </div>
      </div>
    );
}

}
export default UpdateBlog;
