import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";

import { useQuery, useMutation } from '@apollo/client';
import { ADD_TASK } from '../utils/mutations';
import { QUERY_USERS, GET_ME, QUERY_SINGLE_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';
import { Link, useParams } from 'react-router-dom';


function TableView() {
  const { projectId } = useParams();
  const [tasksData, setTasksData] = useState([]);
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECTS, {
    // pass URL parameter
    variables: { projectId: projectId },
  });

  useEffect(() => {
    console.log(data)
    setTasksData(data?.project.tasks || []);
  }, [data])

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Task Name</th>
          <th>Assignee</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Impact</th>
          <th>Budget</th>
        </tr>
      </thead>

      <tbody>
        {
          tasksData.map((task, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Link to="/editTask" className='edit-btn'><AiFillEdit /></Link>
                </td>
                <td>{task.name}</td>
                <td>{task.assignees.map(assignee => {
                  return assignee.username + " "
                })}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString("en-US")}</td>
                <td>{task.impact}</td>
                <td>{task.budget}</td>
              </tr>
            );
          })
        }

        <tr>
          <td></td>
          <td colSpan={7}>
            <Link to={`/project/${projectId}/CreateTask`} className="Newtask">
              <AiOutlinePlus /> New task
            </Link>
          </td>

        </tr>


      </tbody>
    </Table>
  );
}

export default TableView;