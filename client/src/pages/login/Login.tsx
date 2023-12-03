
import React, { useState, useContext } from 'react';

import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import api from '../../utils/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/auth/login/', {
        username,
        password,
      });

      login();
      navigate('/sitemonitor');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col xs={{span: 9, offset: 3}}>
        <h1>Login</h1>
      </Col>
      <Col xs={{span: 6, offset: 3}}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
