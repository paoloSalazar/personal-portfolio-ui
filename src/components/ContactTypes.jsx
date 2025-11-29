import React from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import useContactTypes from '../hooks/useContactTypes.js';

const ContactTypes = () => {
  const { data: contactTypes, loading, error } = useContactTypes();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Contact Types</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading contact types...</p>
        </div>
      )}
      {error && (
        <Alert variant="danger">
          Error loading contact types: {error}
        </Alert>
      )}
      {contactTypes && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {contactTypes.map((contactType) => (
              <tr key={contactType.id}>
                <td>{contactType.id}</td>
                <td>{contactType.name}</td>
                <td>{contactType.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ContactTypes;