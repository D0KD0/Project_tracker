import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Task from "./Task";
import Modal from "./modal";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    task1: {
      id: "task1",
      title: "Task 1",
      priority: "Task 1 Priority: High",
      creator: "John Doe",
    },
    task2: {
      id: "task2",
      title: "Task 2",
      priority: "Task 2 Priority: Low",
      creator: "Jane Doe",
    },
    task3: {
      id: "task3",
      title: "Task 3",
      priority: "Task 3 Priority: Low",
      creator: "Bob Smith",
    },
    task4: {
      id: "task4",
      title: "Task 4",
      priority: "Task 4 Priority: Mid",
      creator: "Alice Smith",
    },
  });

  const [columns, setColumns] = useState({
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1", "task2"],
    },
    column2: {
      id: "column2",
      title: "In Progress",
      taskIds: ["task3"],
    },
    column3: {
      id: "column3",
      title: "Done",
      taskIds: ["task4"],
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleInputChange = (event) => {
    setNewColumnName(event.target.value);
  };

  const handleSubmit = () => {
    if (newColumnName === '') {
      
      return;
    }

    const newColumnId = `column${Object.keys(columns).length + 1}`;
    const newColumn = {
      id: newColumnId,
      title: `${newColumnName}`,
      taskIds: [],
    };
    setColumns({
      ...columns,
      [newColumnId]: newColumn,
    });
    setShowModal(false);
  };

  const handleAddTask = () => {
    const newTaskId = `task${Object.keys(tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      title: "New Task",
      priority: "New Task Priority: Low",
      creator: "New Creator",
    };
    setTasks({
      ...tasks,
      [newTaskId]: newTask,
    });
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    // If the item was dropped outside of any valid column, don't do anything
    if (!destination) {
      return;
    }
  
    // If the item was dropped in the same column it was dragged from
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
  
      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    }
    // If the item was dropped in a different column than it was dragged from
    else {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
  
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };
  
      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };
  
      setColumns({
        ...columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      });
    }
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        
        <div className="columnBox">
        {Object.values(columns).map((column) => (
          <Column key={column.id} column={column} tasks={tasks}>
            {column.taskIds.map((taskId) => {
              const task = tasks[taskId];
              return <Task key={task.id} task={task} />;
            })}
          </Column>
        ))}
        </div>

        {/* Add Task */}
        <div>
          <div className="openModal" onClick={() => setShowModal(true)}>+Add Task</div>
          {showModal && (
            <Modal
              ModalTitle="New Task"
              closeModal={() => setShowModal(false)}
              submitModal={handleAddTask}
              inputPlaceholder="Enter column name..."
              inputValue={newColumnName}
              handleInputChange={handleInputChange}
            />
          )}
        </div>

        {/* Add Column */}
        <div>
          <div className="openModal" onClick={() => setShowModal(true)}>+Column</div>
          {showModal && (
            <Modal
              ModalTitle="New Column"
              closeModal={() => setShowModal(false)}
              submitModal={handleSubmit}
              inputPlaceholder="Enter column name..."
              inputValue={newColumnName}
              handleInputChange={handleInputChange}
            />
          )}
        </div>


        <div>
          <button onClick= {()=> console.log(tasks)}>hihi</button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;