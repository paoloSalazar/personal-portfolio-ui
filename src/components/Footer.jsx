import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white py-4 mt-auto">
    <Container className="text-center">
      <p className="mb-0">© {new Date().getFullYear()} All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;