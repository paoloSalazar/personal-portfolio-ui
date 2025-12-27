import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { useUser } from '../hooks/useUsers';
import About from './About/About';
import Skills from './Skills/Skills';
import Contact from './Contacts/Contact';
import Resumes from './Resumes/Resumes';

const UserProfile = () => {
  const { userId } = useParams();
  const { data: user, loading, error } = useUser(userId);

  if (loading) return <Container className="py-5"><p>Loading user profile...</p></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!user) return <Container className="py-5"><p>User not found.</p></Container>;

  return (
    <Container className="py-5">
      <h1 className="mb-4">{user.name || 'User'}'s Profile</h1>
      <About readOnly userId={userId} />
      <Skills readOnly userId={userId} />
      <Contact readOnly userId={userId} />
      <Resumes readOnly userId={userId} />
    </Container>
  );
};

export default UserProfile;