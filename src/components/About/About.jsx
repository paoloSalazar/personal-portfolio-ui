import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { apiRequest } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const About = ({ readOnly, userId }) => {
  const [user, setUser] = useState(null);
  const { user: currentUser } = useAuth();

  const effectiveUserId = userId || currentUser?.id;

  useEffect(() => {
    if (!effectiveUserId) return;

    const fetchUser = async () => {
      try {
        const data = await apiRequest(`/users/${effectiveUserId}`);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [effectiveUserId]);

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
              style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '20px' }}
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;