import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import useContactTypes from '../../hooks/useContactTypes';
import useContacts from '../../hooks/useContacts';
import { createContact } from '../../services/contact';
import { useAuth } from '../../contexts/AuthContext';

const Contact = () => {
  const { user } = useAuth();
  const [contactTypeId, setContactTypeId] = useState('');
  const [linkOrNumber, setLinkOrNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: contactTypes, loading: loadingTypes, error: typesError } = useContactTypes();
  const { data: contacts, loading: loadingContacts, error: contactsError } = useContacts(user?.id);

  const getIconClass = (contactTypeName) => {
    const iconMap = {
      email: 'bi-envelope',
      phone: 'bi-telephone',
      whatsapp: 'bi-whatsapp',
      linkedin: 'bi-linkedin',
      github: 'bi-github',
      twitter: 'bi-twitter',
      instagram: 'bi-instagram',
      facebook: 'bi-facebook',
      // Add more as needed
    };
    return iconMap[contactTypeName] || 'bi-link';
  };

  const getContactHref = (contact) => {
    const contactType = contactTypes?.find(ct => ct.id === contact.contacttype_id);
    const typeName = contactType?.name || 'link';
    switch (typeName) {
      case 'email':
        return `mailto:${contact.link_or_number}`;
      case 'phone':
        return `tel:${contact.link_or_number}`;
      case 'whatsapp':
        return `https://wa.me/${contact.link_or_number.replace(/\D/g, '')}`;
      default:
        return contact.link_or_number.startsWith('http') ? contact.link_or_number : `https://${contact.link_or_number}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      await createContact(user.id, { contacttype_id: parseInt(contactTypeId), link_or_number: linkOrNumber });
      setSubmitSuccess(true);
      setContactTypeId('');
      setLinkOrNumber('');
    } catch (err) {
      setSubmitError('Failed to register contact. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <Container className="text-center">
        <div className="mt-5">
          <h3 className="mb-4">Register Your Contact</h3>
          {typesError && <Alert variant="danger">{typesError}</Alert>}
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          {submitSuccess && <Alert variant="success">Contact registered successfully!</Alert>}
          <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Type</Form.Label>
              <Form.Control
                as="select"
                value={contactTypeId}
                onChange={(e) => setContactTypeId(e.target.value)}
                disabled={loadingTypes}
              >
                <option value="">Select a contact type</option>
                {contactTypes?.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.description}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link or Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link or number"
                value={linkOrNumber}
                onChange={(e) => setLinkOrNumber(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting || !contactTypeId || !linkOrNumber || loadingTypes}
            >
              {submitting ? 'Registering...' : 'Register Contact'}
            </Button>
          </Form>
        </div>
      </Container>
      <Container className="text-center mt-5">
        <h2 className="display-4 mb-4">Contact Me</h2>
        <p className="lead mb-4">
          I'd love to hear from you! Feel free to reach out for collaborations, opportunities, or just to say hello.
        </p>
        {contactsError && <Alert variant="danger">{contactsError}</Alert>}
        {contacts && contacts.length > 0 ? (
          <div className="d-flex justify-content-center flex-wrap">
            {contacts.map((contact) => {
              const contactType = contactTypes?.find(ct => ct.id === contact.contacttype_id);
              const typeName = contactType?.name || 'link';
              return (
                <a
                  key={contact.id}
                  href={getContactHref(contact)}
                  target={typeName === 'email' || typeName === 'phone' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary mx-2 my-1"
                  title={contactType?.description || 'Contact'}
                >
                  <i className={`bi ${getIconClass(typeName)} me-2`}></i>
                  {/* {contactType?.description || 'Contact'} */}
                </a>
              );
            })}
          </div>
        ) : (
          !loadingContacts && <p>No contacts available.</p>
        )}
      </Container>
    </section>
  );
};

export default Contact;