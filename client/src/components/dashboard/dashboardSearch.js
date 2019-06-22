import React, {Component} from 'react';
import BlogList from '../blog/blogList';

class DashboardSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      blogs:[]
    }
  }
  componentDidMount(){
    this.setState({blogs:this.props.location.state.result})
  }

    render(){
    console.log(this.props.location.state);
    return (
      <div className="container">
        <div className="row">
          <BlogList blogs={this.state.blogs}/>
        </div>
      </div>
    );
  }
}

export default DashboardSearch;
