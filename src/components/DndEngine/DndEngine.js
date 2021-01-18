import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableWrapper from "./DropableWrapper";
import DraggableWrapper from "./DragableWrapper";
import useTaskMap from "./UseTaskMap";

const DnDEngine = ({ InitialData, children }) => {
  const { state, onDragEnd, dispatch } = useTaskMap(InitialData);
  const getcontentIds = (contentIds) => {
    return contentIds.map((contentId) => state.content[contentId]);
  };
  console.log(state)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columns.map((column) => {
        return children(column, getcontentIds(column.contentIds), dispatch);
      })}
    </DragDropContext>
  );
};

DnDEngine.DroppableWrapper = DroppableWrapper;
DnDEngine.DraggableWrapper = DraggableWrapper;

export default DnDEngine;
