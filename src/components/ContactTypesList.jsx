import React from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';

const ContactTypesList = ({ contactTypes, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading contact types...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading contact types: {error}
      </Alert>
    );
  }

  if (!contactTypes) {
    return <p>No contact types available.</p>;
  }

  return (
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
  );
};

export default ContactTypesList;