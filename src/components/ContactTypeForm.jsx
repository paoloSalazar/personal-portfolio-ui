import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createContactType } from '../services/contactTypes.js';

const ContactTypeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createContactType(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', description: '' });
      if (onSuccess) onSuccess(); // Callback to refresh list
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Add New Contact Type</h3>
      {submitSuccess && (
        <Alert variant="success">
          Contact type added successfully!
        </Alert>
      )}
      {submitError && (
        <Alert variant="danger">
          Error adding contact type: {submitError}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., email"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="e.g., Personal Email Address"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Contact Type'}
        </Button>
      </Form>
    </div>
  );
};

export default ContactTypeForm;