function reorderSameColumItems(columns, source, destination, draggableId) {
  const column = columns.reduce((acc, current) => {
    if (current.id === source.droppableId) {
      return current;
    }
    return acc;
  }, "");
  const contentIds = Array.from(column.contentIds);
  contentIds.splice(source.index, 1);
  contentIds.splice(destination.index, 0, draggableId);
  return { column, contentIds };
}
function reorderDiffColumItems(columns, source, destination, draggableId) {
  const destColumn = columns.reduce((acc, current) => {
    if (current.id === destination.droppableId) {
      return current;
    }
    return acc;
  }, "");
  const sourceColumn = columns.reduce((acc, current) => {
    if (current.id === source.droppableId) {
      return current;
    }
    return acc;
  }, "");

  const sourcecontentIds = Array.from(sourceColumn.contentIds);
  sourcecontentIds.splice(source.index, 1);

  const destcontentIds = Array.from(destColumn.contentIds);
  destcontentIds.splice(destination.index, 0, draggableId);
  return { sourceColumn, sourcecontentIds, destColumn, destcontentIds };
}

function isSameColumn(data) {
  return data.destination.droppableId === data.source.droppableId;
}

export { reorderDiffColumItems, reorderSameColumItems, isSameColumn };
