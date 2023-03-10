import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Figure, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import { QUERY_USERS,  GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function CreateProject() {
    
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [userList, setUserList] = useState([]);

    const [userData, setUserData] = useState({});

    const [addProject, { error }] = useMutation(ADD_PROJECT);

    const { loading, data } = useQuery(QUERY_USERS);

    const { data:myInfo } = useQuery(GET_ME);

    useEffect(() => {
        setUserData(myInfo?.me || {})
        setProjectFormData({ ...projectFormData, "members": [...projectFormData.members, myInfo?.me._id] });
      }, [myInfo])

    useEffect(() => {
        setUserList(data?.users || [])
    }, [data])

    // set initial form state
    const [projectFormData, setProjectFormData] = useState({ name: '', members: [], memberName: [], budget: 0 });

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "budget") value = parseFloat(value);
        setProjectFormData({ ...projectFormData, [name]: value });
    };

    const handleSelect = (event) => {
        const { name, value } = event.target;
        const user = userList.find(user => user.username === value)
        setProjectFormData({ ...projectFormData, [name]: [...projectFormData.memberName, value], "members": [...projectFormData.members, user._id] });
        setUserList(userList.filter(user => user.username !== value))
        event.target.value = ""
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addProject({
                variables: {
                    ...projectFormData 
                },
            });

        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setProjectFormData({
            name: '',
            memberName: [],
            members: [],
            budget: 0,
        });
        window.location.assign('/');
    };

    return (
        <>
        <div className=" w-100 createnew-box">
            <h4 className='newpro_cont'> New Project </h4>
            <Form style={{backgroundColor:"whitesmoke"}} id='create-formfolder' onSubmit={handleFormSubmit}>
                <Form.Group className="user-text" >
                    <Form.Label htmlFor='name'>Name</Form.Label>
                    <Form.Control
                        name='name'
                        type="text"
                        placeholder="Enter Project Name..."
                        onChange={handleInputChange}
                        value={projectFormData.name}
                        required />
                    <Form.Control.Feedback type='invalid'>Project Name is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="budget-text" >
                    <Form.Label htmlFor='budget'>Budget</Form.Label>
                    <Form.Control
                        name='budget'
                        type='text'
                        placeholder="Enter Project Budget ..."
                        onChange={handleInputChange}
                        value={projectFormData.budget}
                        required />
                    <Form.Control.Feedback type='invalid'>Project budget is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="member-text">
                    <Form.Label htmlFor='members'>Members</Form.Label>
                    <Form.Control as="select" name='memberName' onInput={handleSelect}>
                        <option value="">Select members</option>
                        {userList.map(user => {
                            if (userData.username !== user.username) {
                                return (
                                    <option value={user.username} >{user.username}</option>
                                );
                            }
                            
                        })}
                    </Form.Control>

                    <Form.Control
                        name='members'
                        type='text'
                        placeholder="Members"
                        value={projectFormData.memberName}
                         />

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

export default CreateProject;
