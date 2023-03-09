import React, { useState } from 'react';
import { Form, Container, Row, Figure, Button, Dropdown } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function EditTask() {
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
    
      <div style={{marginLeft:"150px"}} class="Project-name"> <h4 className='project-name'>Project Name</h4>
      <p class="taskform">Task Form</p>
      <Form id='Form_Holder' onSubmit={handleFormSubmit}>
        <Form.Group className="edit-input" controlId="formTaskName">
          <Form.Control 
            name='projectName' 
            type='text'
            placeholder="Enter Task Name ..." 
            onChange={handleInputChange}
            value={userFormData.email} //fix here 
            required/>
          <Form.Control.Feedback type='invalid'>Task name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formCreatorName">
          <Form.Control 
            name='taskCreator'  
            type='text' 
            placeholder="Enter Creator Name ..." 
            onChange={handleInputChange}
            value={userFormData.username}
            required/>
          <Form.Control.Feedback type='invalid'>Creator name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formAsigneeName">
          <Form.Control 
            name='taskAsignee' 
            type="text" 
            placeholder="Enter Asignee Name ..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'>Assignee name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formProrjectStatus">
          <Form.Control 
            name='projectStatus' 
            type="text" 
            placeholder="Enter Project Status ..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'> Project status is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formDueDate">
          <Form.Control 
            name='taskDueDate' 
            type="date" 
            placeholder="Enter due date..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'> Due date is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formImpactLevel">
          <Form.Control 
            name='taskImpactLevel' 
            type="text" 
            placeholder="High/Moderate/Low" 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'> Due date is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formTaskBudget">
          <Form.Control 
            name='taskBudget' 
            type="text" 
            placeholder="Enter budget ..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'> Due date is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="edit-input" controlId="formTaskDescription">
          <Form.Control 
            name='taskDescription' 
            as="textarea"
            placeholder="Enter Description ..." 
            onChange={handleInputChange}
            value={userFormData.password}
            required/>
            <Form.Control.Feedback type='invalid'> Due date is required!</Form.Control.Feedback>
        </Form.Group>
      <div className='end-btn'>
         <Button
          type='submit'
          id="createProject_Button"
          className="bg-brown flex-centered btn main-btn">
          Submit
        </Button>
      </div>
      </Form>
      </div>
    </>

  );
}

export default EditTask;
