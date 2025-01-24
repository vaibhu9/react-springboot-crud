import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import './UpdateEmployee.css';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({ name: '', email: '', contact: '' });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/employee/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee:', error);
        setError('Failed to fetch employee data. Please try again later.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:8080/api/employee/${id}`, employee)
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error updating employee:', error);
        setError('Failed to update employee data. Please try again later.');
      });
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Update Employee</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          {error && (
            <Row className="mb-4">
              <Col>
                <Alert color="danger">{error}</Alert>
              </Col>
            </Row>
          )}
          <Form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="contact">Contact:</Label>
              <Input
                type="text"
                id="contact"
                name="contact"
                value={employee.contact}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Save</Button>
            <Link to="/" className="ms-2">
              <Button color="secondary">View Employees</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateEmployee;
