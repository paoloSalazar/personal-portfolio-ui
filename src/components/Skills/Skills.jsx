import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import useSkills from '../../hooks/useSkills';
import useUserSkills from '../../hooks/useUserSkills';
import { createSkill, associateSkill } from '../../services/skills';

const Skills = ({ readOnly, userId }) => {
  const { user, isAuthenticated } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { data: suggestions, loading, error } = useSkills(debouncedQuery);
  const { data: userSkills, loading: userLoading, error: userError, refetch } = useUserSkills(userId || user?.id);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() && isAuthenticated) {
      e.preventDefault();
      const skillName = inputValue.trim();
      const existingSkill = suggestions?.find(s => s.name.toLowerCase() === skillName.toLowerCase());

      let skillToAdd;
      if (existingSkill) {
        skillToAdd = existingSkill;
      } else {
        try {
          skillToAdd = await createSkill({ name: skillName });
        } catch (err) {
          console.error('Error creating skill:', err);
          return;
        }
      }

      try {
        await associateSkill(user.id, skillToAdd.id);
        refetch(); // Refresh user skills
      } catch (err) {
        console.error('Error associating skill:', err);
      }
      setInputValue('');
    }
  };

  if (readOnly || !isAuthenticated) {
    return (
      <section id="skills" className="py-5">
        <Container>
          <h2 className="text-center mb-5 display-4">Skills</h2>
          <div className="text-center">
            {userLoading && <div>Loading skills...</div>}
            {userError && <div>Error loading skills: {userError}</div>}
            {userSkills && userSkills.length > 0 ? (
              userSkills.map((skill, index) => (
                <Badge key={skill.id || index} pill variant="primary" className="me-2 mb-2">
                  {skill.name}
                </Badge>
              ))
            ) : (
              <p>No skills available.</p>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="py-5">
      <Container>
        <h2 className="text-center mb-5 display-4">Skills</h2>
        <Row>
          <Col md={8} className="mx-auto">
            <Form.Group className="mb-3">
              <Form.Label>Add Skill</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type skill name and press Enter"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {loading && <div>Loading...</div>}
              {error && <div>Error: {error}</div>}
            </Form.Group>
            <div>
              {userLoading && <div>Loading your skills...</div>}
              {userError && <div>Error loading skills: {userError}</div>}
              {userSkills && userSkills.map((skill, index) => (
                <Badge key={skill.id || index} pill variant="primary" className="me-2 mb-2">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Skills;