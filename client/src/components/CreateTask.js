import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Figure, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TASK } from '../utils/mutations';
import { QUERY_SINGLE_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function CreateTask() {

  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECTS, {
    // pass URL parameter
    variables: { projectId: projectId },
  });
  const [assigneeList, setAssigneeList] = useState([]);

  const [projectData, setProjectData] = useState({ name: '', members: [], budget: 0 });

  useEffect(() => {
    setProjectData(data?.project || {})
    setAssigneeList(data?.project?.members)
  }, [data])

  const [tasksFormData, setTaskFormData] = useState({ name: '', description: '', project: '', creator: '', assignees: [], assigneeName: [], status: '', dueDate: '', impact: '', budget: 0 });

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addTask, { error }] = useMutation(ADD_TASK);





  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === "budget") value = parseFloat(value);
    if (name === "dueDate") value = (new Date(value)).getTime()
    setTaskFormData({ ...tasksFormData, [name]: value });
  };

  const handleSelect = (event) => {
    const { name, value } = event.target;
    const user = assigneeList.find(user => user.username === value)
    setTaskFormData({ ...tasksFormData, [name]: [...tasksFormData.assigneeName, value], "assignees": [...tasksFormData.assignees, user._id] });
    setAssigneeList(assigneeList.filter(user => user.username !== value))
    event.target.value = ""
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addTask({
        variables: {
          projectId: projectId,
          ...tasksFormData
        },
      });

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setTaskFormData({
      name: '',
      memberName: [],
      members: [],
      budget: 0,
    });
    window.location.assign(`/project/${projectId}/TableView`);
  };

  return (
    <>
    <div style={{marginLeft:"150px"}} class="Project-name"> <h4 className='project-name'>{projectData.name}</h4>
      <p class="taskform">Task Form</p>
      <Form id='createtask_Holder' onSubmit={handleFormSubmit}>
        <Form.Group className="tasksinput" id="">
        <Form.Label htmlFor='name'>Task Name</Form.Label>
          <Form.Control
            name='name'
            type='text'
            placeholder="Enter Task Name ..."
            onChange={handleInputChange}
            value={tasksFormData.name}
            required />
          <Form.Control.Feedback type='invalid'>Task name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='assignees'>Assignees</Form.Label>
          <Form.Control as="select" name='assigneeName' onInput={handleSelect}>
            <option value="">Select Assignees</option>
            {assigneeList?.map(member => {
                return (
                  <option value={member.username} >{member.username}</option>
                );

            })}
          </Form.Control>

          <Form.Control
            name='assignees'
            type="text"
            placeholder="Asignee Name ..."
            onChange={handleInputChange}
            value={tasksFormData.assigneeName}
            readOnly />

          <Form.Control.Feedback type='invalid'>Assignee name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='status'>Status</Form.Label>
          <Form.Control as="select" name='status' onInput={handleInputChange}>
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </Form.Control>
          <Form.Control.Feedback type='invalid'> Project status is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='dueDate'>Due Date</Form.Label>
          <Form.Control
            name='dueDate'
            type="date"
            placeholder="Enter due date..."
            onChange={handleInputChange}
            value={tasksFormData.password}
            required />
          <Form.Control.Feedback type='invalid'> Due date is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='impact'>Impact</Form.Label>
          <Form.Control as="select" name='impact' onInput={handleInputChange}>
            <option value="">Select Impact</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='budget'>Budget</Form.Label>
          <Form.Control
            name='budget'
            type="text"
            placeholder="Enter budget ..."
            onChange={handleInputChange}
            value={tasksFormData.budget}
            required />
          <Form.Control.Feedback type='invalid'> Budget is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="tasksinput" >
          <Form.Label htmlFor='description'>Description</Form.Label>
          <Form.Control
            name='description'
            as="textarea"
            placeholder="Enter Description ..."
            onChange={handleInputChange}
            value={tasksFormData.description}
            required />
          <Form.Control.Feedback type='invalid'> Description is required!</Form.Control.Feedback>
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

export default CreateTask;
