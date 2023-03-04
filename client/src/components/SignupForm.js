import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function SignupForm() {
  return (
    <Form id='Form_Holder'>
      <Form.Group className="" controlId="formBasicEmail">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="email" placeholder="Enter Email..." />
        <Form.Text className="text-muted">
          {/* We'll never share your email with anyone else. */}
        </Form.Text>
      </Form.Group>

      <Form.Group className="" controlId="formBasicUsername">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="email" placeholder="Enter Username..." />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="" controlId="formBasicPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control type="password" placeholder="Enter Password..." />
      </Form.Group>

      <Form.Group className="" controlId="formBasicPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control type="password" placeholder="Confirm Password..." />
      </Form.Group>
      {/* <Form.Group className="" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Save Login" />
      </Form.Group> */}

      <div id="Signup_Button" className="bg-brown flex-centered btn main-btn">
        <a>Sign up</a>
      </div>
      
      <div id="Login_Button" className="flex-centered btn sub-btn">
        Login
      </div>
    </Form>
);
}

export default SignupForm;
