import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";

function TableView() {
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
        <tr>
          <td>1</td>
          <td><AiFillEdit /></td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>

        <tr>
          <td>2</td>
          <td><AiFillEdit /></td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>

        <tr>
          <td>3</td>
          <td><AiFillEdit /></td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>

        <tr>
          <td>4</td>
          <td><AiFillEdit /></td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>

        <tr>
          <td>5</td>
          <td><AiFillEdit /></td>
          <td colSpan={6}> 
            <a href='/CreateTask' >
            <AiOutlinePlus /> New task
            </a>
          </td>

        </tr>


      </tbody>
    </Table>
  );
}

export default TableView;