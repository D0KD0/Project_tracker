import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (

        // div which the class task that handles the draggability
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          {/* This is the information that will be shown in each task */}
          <div className="taskTitle">{task.title}</div>
          <div className="taskDesc">{task.priority}</div>
          <div className="taskCreator">By: {task.creator}</div>
        </div>


      )}
    </Draggable>
  );
};

export default Task;
