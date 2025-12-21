import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProjectCard = ({ title, description, link }) => (
  <Col md={4} className="mb-4">
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="outline-dark" href={link} target="_blank">
          View Project
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

const Projects = () => (
  <section id="projects" className="py-5">
    <Container>
      <h2 className="text-center mb-5 display-4">Featured Projects</h2>
      <Row>
        <ProjectCard
          title="Flask API Dashboard"
          description="A performance monitoring dashboard built with React and powered by a custom Flask REST API."
          link="#"
        />
        <ProjectCard
          title="E-commerce Prototype"
          description="Full-stack prototype using MERN stack, featuring Stripe integration and user authentication."
          link="#"
        />
        <ProjectCard
          title="Interactive Data Visualizer"
          description="A data visualization tool using D3.js integrated into a modern React application."
          link="#"
        />
      </Row>
    </Container>
  </section>
);

export default Projects;