import React,{Component} from 'react';


//This is just a dummy component needed for a fix
class Temp extends Component{

  componentDidMount(){
    this.props.history.push('/search',{result:this.props.location.state.result})
  }
  render(){
    console.log(this.props);
    return (<p></p>);
  }

}

export default Temp;
