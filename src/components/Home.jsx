import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Home = () => (
  <div className="hero-section text-center text-white bg-dark d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '56px' }}>
    <Container>
      <h1 className="display-1 fw-bold">MultiUser Portfolio</h1>
      <p className="lead mt-4">
        In this platform, users can create and manage their personal portfolios, 
        showcasing their projects, skills, and contact information all in one place.
      </p>
    </Container>
  </div>
);

export default Home;