import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="column-tasks"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columnTasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
