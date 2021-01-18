import React from "react";
import { Droppable } from "react-beautiful-dnd";

const DroppableWrapper = (data) => {
  const { column, children } = data;
  return (
    <Droppable droppableId={column.id} direction="horizontal">
      {(provided, dropSnapshot) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {React.cloneElement(children, {
              provided: { ...provided },
              //dropSnapshot: { ...dropSnapshot },
            })}
          </div>
        );
      }}
    </Droppable>
  );
};

export default DroppableWrapper;
