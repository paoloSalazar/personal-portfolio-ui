import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { uploadPhoto } from '../../services/users';

const About = ({ readOnly, userId }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user: currentUser } = useAuth();

  const effectiveUserId = userId || currentUser?.id;

  const fetchUser = async () => {
    try {
      const data = await apiRequest(`/users/${effectiveUserId}`);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (!effectiveUserId) return;
    fetchUser();
  }, [effectiveUserId]);

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;
    try {
      await uploadPhoto(effectiveUserId, selectedFile);
      setShowModal(false);
      setSelectedFile(null);
      // Refetch user to update photo
      fetchUser();
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  if (!user) {
    return (
      <section id="about" className="py-5 bg-light">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </section>
    );
  }

  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4 display-4">About Me</h2>
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <img
              src={user.profile_photo_url}
              alt="Profile"
              className="profile-img mx-auto"
              style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '20px', cursor: !readOnly ? 'pointer' : 'default' }}
              onClick={!readOnly ? () => setShowModal(true) : undefined}
            />
          </Col>
          <Col md={8}>
            <p className="lead">
              {user.about_me}
            </p>
            <p>
              <strong>Name:</strong> {user.name} {user.last_name} {user.second_last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {!readOnly && (
              <Button as={Link} to="/edit-profile" variant="primary" className="mt-3">
                Edit Profile
              </Button>
            )}
           </Col>
         </Row>
       </Container>
       <Modal show={showModal} onHide={() => setShowModal(false)}>
         <Modal.Header closeButton>
           <Modal.Title>Update Profile Picture</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form.Group>
             <Form.Label>Select a new profile picture</Form.Label>
             <Form.Control
               type="file"
               accept="image/*"
               onChange={(e) => setSelectedFile(e.target.files[0])}
             />
           </Form.Group>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowModal(false)}>
             Cancel
           </Button>
           <Button variant="primary" onClick={handleUploadPhoto} disabled={!selectedFile}>
             Upload
           </Button>
         </Modal.Footer>
       </Modal>
     </section>
   );
 };

export default About;