import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableWrapper = ({ item, index, children }) => {
  const { id, content } = item;
  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={item.isDragDisabled}
    >
      {(provided, dragSnap) => {
        return (
          <div
          style={{width:"400px", height: "400px", border: "1px solid black"}}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {React.cloneElement(children, {
              provided: { ...provided },
              dragSnap: { ...dragSnap },
            })}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableWrapper;
