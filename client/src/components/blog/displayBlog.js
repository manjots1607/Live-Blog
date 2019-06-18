import React,{Component} from 'react';
import axios from 'axios';

class DisplayBlog extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    axios.get(`http://localhost:5000/blog-api/${this.props.match.params.blogId}`)
      .then(res=>{
        this.setState(res.data);
      })
      .catch(err=>{

      })
  }

  render(){
    const {title,authorURL,imageURL,content,author} = this.state;

    return title ===""?<p>Some fancy annimation</p>:(
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-6 sm-12">
            <h1 className="allign-middle mb-5 text-left">{title}</h1>
            <div>
              <img src={authorURL} style={{borderRadius:'50%',width:'80px'}} className="float-left"/>
              <span className="float-left text-primary ml-4" style={{fontSize:'1.3em',position:'relative',top:'20px'}}>{author}</span>
              <button className="btn-sm btn btn-outline-secondary float-left ml-5" style={{position:'relative',top:'20px'}}>Follow</button>
            </div>
          </div>
          <div className="col-md-6 sm-12">
            <img src={imageURL} className="img-fluid"/>
          </div>
        </div>
        <div className="row mt-5 pt-5">
          <div className="col-md-2 col-sm-0"></div>
          <div className="col-md-8 col-sm-12">
            <p className="text-left" style={{fontSize:'1.3em'}}>{content}</p>
          </div>
          <div className="col-md-2 col-sm-0"></div>
        </div>
      </div>
    );
  }

}

export default DisplayBlog;
