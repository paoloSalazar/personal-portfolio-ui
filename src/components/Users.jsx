import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

const Users = () => {
  const { data: users, loading, error } = useUsers();

  if (loading) return <Container className="py-5"><p>Loading users...</p></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Users</h1>
      {users && users.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <Button as={Link} to={`/users/${user.id}`} variant="primary" size="sm">
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No users found.</p>
      )}
    </Container>
  );
};

export default Users;