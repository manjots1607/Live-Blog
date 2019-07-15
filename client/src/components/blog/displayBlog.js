import React,{Component} from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';
  


class DisplayBlog extends Component{
  constructor(props){
    super(props);
    this.state = {
      title:'',
      authorURL:'',
      username:'',
      imageURL:'',
      content:'',
      blogId:'',
      isLive:false
    };
    this.socket = openSocket('http://localhost:5000');
  }
  delHandler=()=>{
    axios.delete(`http://localhost:5000/blog-api/${this.props.match.params.blogId}`)
    .then(res=>{
      if(res.data.msg==="deleted Successfully"){
        this.props.history.push("/");
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }
  componentDidMount(){
    const displayBlog = this;
    axios.get(`http://localhost:5000/blog-api/${this.props.match.params.blogId}`)
      .then(res=>{
        const {title,imageURL,content} = res.data
        const {authorURL,username} = res.data.author;
        const blogId = res.data._id;
        const isLive=res.data.isLive;
        this.setState({title,authorURL,imageURL,content,username,blogId,isLive});
      })
      .catch(err=>{
        console.log(this.props.match.params.blogId);
        console.log(err);
      });

      this.socket.on('updateContent-keypress',function (data) {
        const updating = document.getElementById('updating');
        updating.innerText = "Updating...";
        setTimeout(()=>{
          updating.innerText = "";
        },1000)
        if(data.blogId ===displayBlog.state.blogId){
            if(data.x===13){
              data.x=10;
            }
            const par = displayBlog.state.content===''?'': displayBlog.state.content.substring(0,data.a)+String.fromCharCode(data.x) + displayBlog.state.content.substring(data.b);
            displayBlog.setState({content:par});
        }
      });

      this.socket.on('updateContent-keyup',function (data) {
        const updating = document.getElementById('updating');
        updating.innerText = "Updating...";
        setTimeout(()=>{
          updating.innerText = "";
        },1000)
        if(data.blogId ===displayBlog.state.blogId){
         if(data.a===data.b){
            if(data.x==8){
              const par = displayBlog.state.content.substring(0,data.a) + displayBlog.state.content.substring(data.b+1);
              displayBlog.setState({content:par});
            }else if(data.x==32){
              console.log("space coming",data.a,data.b);
              const par = displayBlog.state.content.substring(0,data.a-1) +" " + displayBlog.state.content.substring(data.a-1);
              displayBlog.setState({content:par});
            }
          }else{  //Selected more than 1 character
            console.log(data);
            if(data.x==8){
              if(displayBlog.state.content[data.a-2]==='\\'){
                const par = displayBlog.state.content.substring(0,data.a-1) + displayBlog.state.content.substring(data.b);
                displayBlog.setState({content:par});
              }else{
                const par = displayBlog.state.content.substring(0,data.a) + displayBlog.state.content.substring(data.b);
                displayBlog.setState({content:par});
              }
            }
         }
        }
      });
  }

  componentWillUnmount(){
    this.socket.disconnect();    
  }

  render(){
    const liveCursorStyle={
      color:'green',
      fontSize:'24px',
      fontWeight:'600',
      animation:'cursorAnimation 0.3s infinite',
      position:'relative',
      left:'3px'
    };
    const authorStyle={
      backgroundColor:'green',
      fontSize:'8px',
      color:'white',
      position:'Relative',
      top:'-10px',
      
    }
    const {title,imageURL,content,authorURL,username} = this.state;
    var modifiedContentarr=content.split('\n');
    var modifiedContent = modifiedContentarr.map((e,i)=>{
      if(i===modifiedContentarr.length-1){
        return(
          <p className="text-left updateParagraph" style={{fontSize:'1.3em'}}>
          {e }
          {this.state.isLive?
          <React.Fragment><span style={liveCursorStyle}>|</span><span style={authorStyle} >{username}</span></React.Fragment>
          :null}
          
          </p>
        )
      }
      return(
        <p className="text-left updateParagraph" style={{fontSize:'1.3em'}}>{e}</p>
      )
      
    });
    return title ===""?<p>Some fancy annimation</p>:(
      <div className="container mt-5">
      <p id="updating" style={{position:'fixed',top:'10px',zIndex:'3',fontWeight:'bold',color:'blue',fontSize:'1.2em',width:'80vw'}} className="align-center"></p>
        <div className="row mb-5">
          <div className="col-md-6 sm-12">
            <h1 className="allign-middle mb-5 text-left">{title}</h1>
            <div>
              <img src={authorURL} style={{borderRadius:'50%',width:'80px'}} className="float-left"/>
              <span className="float-left text-primary ml-4" style={{fontSize:'1.3em',position:'relative',top:'20px'}}>{username}</span>
              <button className="btn-sm btn btn-outline-secondary float-left ml-5" style={{position:'relative',top:'20px'}}>Follow</button>
              <button className="btn-sm btn btn-outline-danger float-left ml-5" onClick={this.delHandler} style={{position:'relative',top:'20px'}}>Delete</button>
            </div>
          </div>
          <div className="col-md-6 sm-12">
            <img src={imageURL} className="img-fluid" style={{maxHeight:'50vh'}}/>
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col-md-1 col-sm-0"></div>
          <div className="col-md-10 col-sm-12">
          {modifiedContent}
          </div>
          <div className="col-md-1 col-sm-0"></div>
        </div>
      </div>
    );
  }

}

export default DisplayBlog;
