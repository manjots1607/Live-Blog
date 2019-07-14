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
      isLive:false,
      cursor:-1,
      isAuthorised:true
    };
    this.socket = openSocket('http://localhost:5000');
    this.handleEdit = this.handleEdit.bind(this);
    this.delHandler = this.delHandler.bind(this);
  }

  handleEdit = function(){
    this.props.history.push(`/blog/${this.props.match.params.blogId}/edit`)
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
        const isAuthorised = res.data.curUser?res.data.author.id===res.data.curUser._id:false;
        this.setState({title,authorURL,imageURL,content,username,blogId,isLive,isAuthorised});
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
            displayBlog.setState({content:par,cursor:data.a+1});
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
              displayBlog.setState({content:par,cursor:data.a});
            }else if(data.x==32){
              const par = displayBlog.state.content.substring(0,data.a-1) +" " + displayBlog.state.content.substring(data.a-1);
              displayBlog.setState({content:par,cursor:data.a+1});
            }
          }else{  //Selected more than 1 character
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
      fontWeight:'20px',
      animation:'cursorAnimation 0.5s infinite'
      // position:'relative',
      // left:'3px'
    };
    const authorStyle={
      backgroundColor:'green',
      fontSize:'10px',
      color:'white',
      zIndex: '3',
      position:'Relative',
      top:'-18px'
    }
    const {title,imageURL,authorURL,username} = this.state;
    var {content} = this.state;
    content = this.state.cursor==-1?content:content.substring(0,this.state.cursor)+'%$'+content.substring(this.state.cursor); //%$ is just a symbol
    var modifiedContentarr=content.split('\n');
    var modifiedContent2 = modifiedContentarr.map((e,i)=>{
      return(
        <p className="text-left updateParagraph" style={{fontSize:'1.3em'}}>{e}</p>
      )
    });
  const modifiedContent =  modifiedContent2.map(function(p){
      const list = p.props.children.split('%$');
      if(list.length == 1){
        return p;
      }else{
        return <p className="text-left updateParagraph" style={{fontSize:'1.3em'}}><span>{list[0]}</span><span style={liveCursorStyle}>|</span><span style={authorStyle} >Updating</span><span>{list[1]}</span></p>
      }
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
              {!(this.state.isAuthorised)?<button className="btn-sm btn btn-outline-secondary float-left ml-2" style={{position:'relative',top:'20px'}}>Follow</button>:null}
              {this.state.isAuthorised?<button className="btn-sm btn btn-outline-danger float-left ml-2" onClick={this.delHandler} style={{position:'relative',top:'20px'}}>Delete</button>:null}
              {this.state.isAuthorised?<button className="btn-sm btn btn-outline-primary float-left ml-2" onClick={this.handleEdit} style={{position:'relative',top:'20px'}}>Edit</button>:null}
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
