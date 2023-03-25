import React, { Component } from 'react';
// import Typewriter from "typewriter-effect";


// const myidentity = [
//   'Aradhana Singh',
//   // "Welcomes You",
//   'Web Developer',
//   'A Blogger',
//   'A Writer',
//   'An Artist'
// ];
class Home extends Component {
  constructor() {
    super();
    this.state = { textIndex: 0 };
  }

  // componentDidMount() {
  //   this.timeout = setInterval(() => {
  //     let currentIndex = this.state.textIndex;
  //     this.setState({ textIndex: currentIndex + 1 });
  //   }, 1500);
  // }
  // componentDidUnmount() {
  //   clearInterval(this.timeout);
  // }
  render() {
    // let textChanges = myidentity[this.state.textIndex % myidentity.length];
    return (
      <div className='container'>
        <h1>Hello,</h1>
        <h6 className='welcomeTxt'>Welcome To My Web World!</h6>
        <h3>
        I'm Aradhana
          {/* I'm <span className='mytitle'>{textChanges}</span> */}
          {/* <Typewriter
  
       onInit={(typewriter)=> {
  
       typewriter
        
       .typeString("Aradhana Singh")         
       .pauseFor(1000)
       .deleteAll()
       .typeString("Welcomes You")
       .start();
       }}
       /> */}

{/* <Typewriter
className="typingText"
  options={{
    strings: ['Aradhana Singh',
    'Front End Web Developer',
    'A Blogger',
    'Content Creater',
    'A Youtuber',
    'An Artist'],
    autoStart: true,
    loop: true,
  }}
/> */}
        </h3>
        <h6>A Front End Web Developer</h6>
        <h6>A Blogger</h6>
        <h6>A Content Creater</h6>
        <h6>A Youtuber</h6>
        <h6>An Artist</h6>
        <p>A passionate web developer based in Bangaluru, India.</p>
      </div>
    );
  }
}

export default Home;
