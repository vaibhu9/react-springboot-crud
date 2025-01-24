import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Input, Alert } from 'reactstrap';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:8080/api/employee/by-name', {
      params: { name: searchQuery }
    })
    .then(response => {
      setEmployees(response.data);
      setError(null);
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees. Please try again later.');
    });
  }, [searchQuery]);

  const handleDelete = (id) => {
    
    axios.delete(`http://localhost:8080/api/employee/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
        setError(null);
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
        setError('Failed to delete the employee. Please try again later.');
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Employee List</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-end">
          <Link to="/add-employee">
            <Button color="primary">Add Employee</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert color="danger">{error}</Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.contact}</td>
                  <td>
                    <Link to={`/update-employee/${employee.id}`}>
                      <Button color="warning" className="me-2">Update</Button>
                    </Link>
                    <Button color="danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
