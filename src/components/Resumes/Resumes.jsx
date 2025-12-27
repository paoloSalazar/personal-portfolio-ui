import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useAuth } from '../../contexts/AuthContext';
import useResumes from '../../hooks/useResumes';
import useSkills from '../../hooks/useSkills';
import { createResume, associateResumeSkills, getResumeSkills } from '../../services/resumes';

const Resumes = ({ readOnly, userId }) => {
  const { user, isAuthenticated } = useAuth();
  const { data: resumes, loading, error, refetch } = useResumes(userId || user?.id);
  const { data: allSkills } = useSkills();
  const [resumeSkills, setResumeSkills] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    education: '',
    startDate: null,
    endDate: null,
    selectedSkills: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchResumeSkills = async () => {
      if (resumes && resumes.length > 0) {
        const currentUserId = userId || user?.id;
        const skillsPromises = resumes.map(resume =>
          getResumeSkills(currentUserId, resume.id).catch(err => {
            console.error(`Failed to fetch skills for resume ${resume.id}:`, err);
            return [];
          })
        );
        const skillsArray = await Promise.all(skillsPromises);
        const newResumeSkills = {};
        resumes.forEach((resume, index) => {
          newResumeSkills[resume.id] = skillsArray[index];
        });
        setResumeSkills(newResumeSkills);
      }
    };
    fetchResumeSkills();
  }, [resumes, userId, user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const resumeData = {
        title: formData.title,
        summary: formData.summary,
        education: formData.education,
        start_date: formData.startDate ? formData.startDate.toISOString().split('T')[0] : null,
        end_date: formData.endDate ? formData.endDate.toISOString().split('T')[0] : null,
      };
      const createdResume = await createResume(user.id, resumeData);

      // Associate skills if any selected
      if (formData.selectedSkills.length > 0) {
        const skillIds = formData.selectedSkills.map(skill => skill.value);
        await associateResumeSkills(user.id, createdResume.id, skillIds);
        // Update local state with the selected skills
        setResumeSkills(prev => ({ ...prev, [createdResume.id]: formData.selectedSkills.map(s => ({ id: s.value, name: s.label })) }));
      }

      setSuccessMessage('Resume added successfully!');
      setFormData({
        title: '',
        summary: '',
        education: '',
        startDate: null,
        endDate: null,
        selectedSkills: [],
      });
      refetch();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setSubmitError(err.message || 'Failed to create resume');
    } finally {
      setSubmitting(false);
    }
  };

  const canEdit = !readOnly && isAuthenticated && user?.id === (userId || user?.id);

  return (
    <section id="resumes" className="py-5">
      <Container>
        <h2 className="text-center mb-5 display-4">Resumes</h2>
        {canEdit && (
          <Row className="mb-4">
            <Col md={8} className="mx-auto">
              <Card>
                <Card.Body>
                  <h5>Add New Resume</h5>
                  {submitError && <Alert variant="danger">{submitError}</Alert>}
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Summary</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label><br/>
                      <DatePicker
                        selected={formData.startDate}
                        onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={50}
                        scrollableYearDropdown
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date (optional)</Form.Label>
                      <DatePicker
                        selected={formData.endDate}
                        onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={50}
                        scrollableYearDropdown
                        isClearable
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Skills (optional)</Form.Label>
                      <Select
                        isMulti
                        options={allSkills?.map(skill => ({ value: skill.id, label: skill.name })) || []}
                        value={formData.selectedSkills}
                        onChange={(selected) => setFormData(prev => ({ ...prev, selectedSkills: selected || [] }))}
                        placeholder="Select skills..."
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </Form.Group>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Adding...' : 'Add Resume'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={10} className="mx-auto">
            {loading && <div>Loading resumes...</div>}
            {error && <Alert variant="danger">Error loading resumes: {error}</Alert>}
            {resumes && resumes.length > 0 ? (
              resumes.map((resume) => (
                <Card key={resume.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{resume.title}</Card.Title>
                    <Card.Text>{resume.summary}</Card.Text>
                    <p><strong>Education:</strong> {resume.education}</p>
                    <p><strong>Start Date:</strong> {new Date(resume.start_date).toLocaleDateString()}</p>
                    {resume.end_date && (
                      <p><strong>End Date:</strong> {new Date(resume.end_date).toLocaleDateString()}</p>
                    )}
                    {resumeSkills[resume.id] && resumeSkills[resume.id].length > 0 && (
                      <div>
                        <strong>Skills:</strong>
                        <div className="mt-2">
                          {resumeSkills[resume.id].map((skill) => (
                            <Badge key={skill.id} pill variant="secondary" className="me-2 mb-2">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No resumes available.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resumes;