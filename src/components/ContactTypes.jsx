import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import ContactTypesList from './ContactTypesList.jsx';
import ContactTypeForm from './ContactTypeForm.jsx';
import useContactTypes from '../hooks/useContactTypes.js';

const ContactTypes = () => {
  const { data: contactTypes, loading, error, refetch } = useContactTypes();

  const handleFormSuccess = () => {
    refetch(); // Refresh the list when a new contact type is added
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Contact Types</h2>

      <Tabs defaultActiveKey="list" id="contact-types-tabs" className="mb-3">
        <Tab eventKey="list" title="View Contact Types">
          <ContactTypesList contactTypes={contactTypes} loading={loading} error={error} />
        </Tab>
        <Tab eventKey="add" title="Add New Contact Type">
          <ContactTypeForm onSuccess={handleFormSuccess} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ContactTypes;