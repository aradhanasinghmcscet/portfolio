import React from "react";
import { Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div className="container">
      <Row>
        <Col sm={6}>
          <h1>About Me</h1>
          <p>
            Here you will find more information about me, what I do, and my
            current skills mostly in terms of programming and technology.
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <h4>What I do?</h4>
          <p>
            I'm a <strong>Frontend Web Developer</strong> building the Front-end of Websites and
            Web Applications that leads to the success of the overall product.
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <h4>My Skills</h4>
          <div className="skills">
            <div className="skills-skill">HTML</div>
            <div className="skills-skill">CSS</div>
            <div className="skills-skill">JavaScript</div>
            <div className="skills-skill">React</div>
            <div className="skills-skill">Redux</div>
            <div className="skills-skill">Angular 2+ Intermediate</div>
            <div className="skills-skill">NoSQL Intermediate</div>
            <div className="skills-skill">NodeJS Intermediate</div>
            <div className="skills-skill">Express Intermediate</div>
            <div className="skills-skill">RWD</div>
            <div className="skills-skill">Git</div>
            <div className="skills-skill">Git Hub</div>
            <div className="skills-skill">SEO</div>
            <div className="skills-skill"><a href="https://youtu.be/y40bW8sx33g">Content Creater </a></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default About;
