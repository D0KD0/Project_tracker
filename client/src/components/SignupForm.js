import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await createUser({
        variables: { ...userFormData }
      });



      Auth.login(data.createUser.token);
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
    <>
    <section className='signup-intro'><p >Create account and start managing your tasks!</p></section>
    <div className='signup-box'>
      
      <Form id='Form_Holder' onSubmit={handleFormSubmit}>
        <Form.Group className="email_text" controlId="formBasicEmail">
          <Form.Label htmlFor='email'>Email</Form.Label>
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control 
            name='email' 
            type="email" 
            placeholder="Enter Email..." 
            onChange={handleInputChange}
            value={userFormData.email}
            required/>
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="user-text" controlId="formBasicUsername">
          <Form.Label htmlFor='username'>Username</Form.Label>
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control 
            name='username'  
            type='text' 
            placeholder="Enter Username..." 
            onChange={handleInputChange}
            value={userFormData.username}
            required/>
          {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text> */}
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="password_text" controlId="formBasicPassword">
          <Form.Label htmlFor='password'>Password</Form.Label>
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control 
            name='password' 
            type="password" 
            placeholder="Enter Password..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="confirm-text" controlId="formBasicPassword">
          <Form.Label htmlFor='password'>Confirm Password</Form.Label>
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control name='confirmPassword' type="password" placeholder="Confirm Password..." />
        </Form.Group>
        {/* <Form.Group className="" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Save Login" />
      </Form.Group> */}
         <Button
          type='submit'
          id="Signup_Button"
          className="bg-brown flex-centered btn main-btn">
          Sign up
        </Button>

        <Link as={Link} to='/login' id="Login_Button" className="flex-centered btn sub-btn">
          Login
        </Link>
      </Form>
      </div>
    </>

  );
}

export default SignupForm;
