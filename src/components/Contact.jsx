import React from 'react';
import { Container } from 'react-bootstrap';

const Contact = () => (
  <section id="contact" className="py-5 bg-light">
    <Container className="text-center">
      <h2 className="display-4 mb-4">Contact Me</h2>
      <p className="lead mb-4">
        I'd love to hear from you! Feel free to reach out for collaborations, opportunities, or just to say hello.
      </p>
      <p>
        <a href="mailto:you@example.com" className="btn btn-primary mx-2">Email</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" className="btn btn-secondary mx-2">LinkedIn</a>
        <a href="https://github.com/yourprofile" target="_blank" className="btn btn-dark mx-2">GitHub</a>
      </p>
    </Container>
  </section>
);

export default Contact;