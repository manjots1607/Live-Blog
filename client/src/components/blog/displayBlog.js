import React,{Component} from 'react';

class DisplayBlog extends Component{
  constructor(props){
    super(props);
    this.state = {
      title:'A guide to become full stack developer',
      content:'How to become a full stack developer? As one of the hottest topics for developers, the discussions have never stopped. On LinkedIn and Facebook, lots of people put their job title as a full stack developer. Besides, it seems that the “Full Stack” topic has already become a new job trend. An article on Medium has discussed the full stack designer getting both praise and blame. Some people think that the full stack is just a title, what he/she should focus on is the real personal ability and technology.Essentially, I think the discussion about the full stack is also a kind of argument relating to the all-rounder and expert in the IT industry, and debate on the depth and breadth of development skills.You can’t have your cake and eat it too. While the full stack developers and full stack designers seem like they are challenging this possibility. Because their horizontal skills tree gives them the ability to both have and eat the cake. There is another saying is that jack of all trades, but master of none. So it’s necessary to think about how to become a real full stack developer but not an empty title.1. What is a full stack developer?Simply put, full stack developer is a kind of people who master a variety of skills and use these skills to complete a product independently. A top voted answer on Quora explained that what is a full stack developer:A full stack developer is an engineer who can handle all the work of databases, servers, systems engineering, and clients. Depending on the project, what customers need may be a mobile stack, a Web stack, or a native application stack.In fact, “full stack” refers to the collection of a series of technologies needed to complete a project. “Stack” refers to a collection of sub-modules. These software sub-modules or components combined together to achieve the established function while without the need for other modules.2. Why has the full stack developer been controversially discussed?As it mentioned above, the discussion about full stack developer is actually the debate on the depth and breadth of skills. Especially at the OSCON conference, a Facebook engineer said they only hired a “full stack developer.” This topic came as a result of a heated discussion about the strengths and weaknesses of being a full stack developer.Advantages: The full stack developers involved in a horizontal technical requirement, so that he/she can make a prototype design for a product very rapidly with his wide range of techniques. With the full stackability, they have a broader angle of views and a more active mindset. Moreover, they will be more sensitive to techniques and products. So, this kind of people can always have his/her opinions towards the product or design.From another aspect, he/she can provide help to everyone in the team and greatly reduce the time and technical costs of team communication, technology docking. So many of them become entrepreneurs or as technical partners in start-up companies.Disadvantages: It is precisely because of the horizontal technology development, some the full stack developers cannot be expert in one skill. Most of them who claim to be “full stacks developer” are only know a little about the multiple skills. As for how to make the architecture more suitable for the modular development, that’s a question.3. Even so, there are still people asking, how to become a full stack developer?A qualified full stack developer should have functional knowledge and capabilities for all aspects involved in building the application.1) Programming languagesYou need to be proficient in multiple programming languages, such as JAVA, PHP, C #, Python, Ruby, Perl, etc. As most of your core business processes need to be written in these languages.Maybe not all need. But you also have to master the language grammar, and to be very familiar with how to structure, design, implementation, and testing of the project based on one language or more languages. For example, if you choose JAVA, then you need to master the object-oriented design and development, design patterns, J2EE-based components of the development and so on.',
      author:'Bharat Nischal',
      authorURL:'data:image/png;base64,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',
      dated:'8 April 2019',
      image:'https://blog.eduonix.com/wp-content/uploads/2018/09/Full-Stack-Developer.jpg',
      id:4
    }
  }

  componentDidMount(){
    fetch(`http:localhost://:3001/blog-api/${this.props.match.blogId}`)
      .then(res=>{
        this.setState(res);
      })
      .catch(err=>{

      })
  }

  render(){
    const {title,authorURL,image,content,author} = this.state;

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
            <img src={image} className="img-fluid"/>
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
