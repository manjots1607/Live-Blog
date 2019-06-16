import React from 'react'

const BlogList = (props)=>{
  let projects = <p>Some Fancy annimation</p>;
  if(props.blogs && props.blogs.length>0){
    projects = props.blogs.map((b)=>(
      <div className="container col-sm-12 col-md-6 mt-4 mb-4" key={b.id}>
        <div>
          <img src={b.image} style={{width:'100%', height:'30vh'}} alt="blog image"/>
          <img src={b.authorURL} className="ml-3"style={{borderRadius:'50%',width:'80px',position:'relative',bottom:'40px',float:'left'}} />
          <span className="float-left ml-2">By :<span className="text-primary">{b.author}</span></span>
          <span className="float-right">{b.dated}</span>
        </div>
        <h2 className="text-left float-left"><a href="/">{b.title}</a></h2>
        <p className="text-left float-left">{b.content}</p>
        <button type="button" className="btn btn-outline-success float-left">Read this post</button>
      </div>
    ));
  }
  return (projects);
}

export default BlogList;
