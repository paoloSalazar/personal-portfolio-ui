import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Home = () => (
  <div className="hero-section text-center text-white bg-dark d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '56px' }}>
    <Container>
      <h1 className="display-1 fw-bold">Hi, I'm [Your Name]</h1>
      <p className="lead mt-4">
        A passionate [Your Title] focused on building elegant and scalable solutions.
      </p>
      <Button variant="primary" size="lg" className="mt-4">
        View My Work
      </Button>
    </Container>
  </div>
);

export default Home;