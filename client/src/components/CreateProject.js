import React, { useState } from 'react';
import { Form, Container, Row, Figure, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function CreateProject() {
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
      <Figure class="container"> New Project </Figure>
      <Form id='Form_Holder' onSubmit={handleFormSubmit}>
        <Form.Group className="" controlId="formProjectName">
          <Form.Control 
            name='projectName' 
            type="text" 
            placeholder="Enter Project Name ..." 
            onChange={handleInputChange}
            value={userFormData.email} //fix here 
            required/>
          <Form.Control.Feedback type='invalid'>Project name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formProjectBudget">
          <Form.Control 
            name='projectBudget'  
            type='text' 
            placeholder="Enter Project Budget ..." 
            onChange={handleInputChange}
            value={userFormData.username}
            required/>
          <Form.Control.Feedback type='invalid'>Project budget is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="" controlId="formProjectMembers">
          <Form.Control 
            name='projectMemger' 
            type="text" 
            placeholder="Enter Project Members..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'>Project member is required!</Form.Control.Feedback>
        </Form.Group>

         <Button
          type='submit'
          id="createProject_Button"
          className="bg-brown flex-centered btn main-btn">
          Submit
        </Button>

      </Form>
    </>

  );
}

export default CreateProject;
