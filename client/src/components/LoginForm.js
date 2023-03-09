import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      console.log(data)
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
  return (
    
    <div className='loginCont'>
    <Form id='Form_Holder' onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your login credentials!
      </Alert>
      <Form.Group className="email_text">
        <Form.Label htmlFor='email'>Email</Form.Label>
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control
          type="email"
          placeholder="Enter Email..."
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="password_text" >
        <Form.Label htmlFor='password'>Password</Form.Label>
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          type="password"
          placeholder="Enter Password..."
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group className="" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Save Login" />
          </Form.Group> */}
      <Button
        type='submit'
        id="Login_Button"
        className="bg-brown flex-centered btn main-btn">
        Login
      </Button>
      <div>
        <p className='signup-p'>Don't have an account? </p>
      <Link as={Link} to='/signup' id="Login_Button" className="flex-centered btn sub-btn">
        Sign up
      </Link>
      </div>
    </Form>
    </div>
  );
}

export default LoginForm;
