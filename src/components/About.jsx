import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => (
  <section id="about" className="py-5 bg-light">
    <Container>
      <h2 className="text-center mb-4 display-4">About Me</h2>
      <Row className="align-items-center">
        <Col md={4} className="text-center">
          {/* Placeholder for your professional photo */}
          <div className="profile-img mx-auto" style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#007bff', marginBottom: '20px' }}>
            {/*  */}
          </div>
        </Col>
        <Col md={8}>
          <p className="lead">
            I'm a full-stack developer with 5+ years of experience in JavaScript, React, and Python/Flask. I specialize in turning complex requirements into clean, user-friendly applications. My focus is on writing efficient, maintainable code and continuous learning.
          </p>
          <p>
            **Key Skills:** React, Vite, Python, Flask, REST APIs, PostgreSQL, Docker, AWS.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default About;