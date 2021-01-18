import { useReducer } from "react";
import {
  reorderDiffColumItems,
  reorderSameColumItems,
  isSameColumn,
} from "./Helpers";

const reducer = (state, action) => {
  console.log(state);
  const switcher = {
    SAME_COLUMN_UPDATE: () => {
      const { column, contentIds } = action.payload;
      const newColumn = {
        ...column,
        contentIds,
      };
      return {
        ...state,
        columns: state.columns.map((oldColumn) => {
          if (oldColumn.id === column.id) {
            return newColumn;
          }
          return oldColumn;
        }),
      };
    },
    DIFFERENT_COLUMN_UPDATE: () => {
      const cols = action.payload;
      const newSourceColumn = {
        ...cols.source.column,
        contentIds: cols.source.contentIds,
      };
      const newDestColumn = {
        ...cols.destination.column,
        contentIds: cols.destination.contentIds,
      };

      const columns = state.columns.map((column) => {
        if (column.id === newSourceColumn.id) {
          return newSourceColumn;
        } else if (column.id === newDestColumn.id) {
          return newDestColumn;
        }
        return column;
      });
      //const data = state.content[cols.draggableId]
      if (newDestColumn.id === "column-1") {
        if (localStorage.getItem("userMedia")) {
          const currentData = JSON.parse(localStorage.getItem("userMedia"));
          currentData[cols.draggableId] = state.content[cols.draggableId];
          localStorage.setItem("userMedia", JSON.stringify(currentData));
        } else {
          localStorage.setItem(
            "userMedia",
            JSON.stringify({
              [cols.draggableId]: state.content[cols.draggableId],
            })
          );
        }
      } else {
        if (localStorage.getItem("userMedia")) {
          const currentData = JSON.parse(localStorage.getItem("userMedia"));
          currentData[cols.draggableId] = null;
          localStorage.setItem("userMedia", JSON.stringify(currentData));
        }
      }
      return {
        ...state,
        columns: columns,
      };
    },
  };

  return switcher[action.type]() || state;
};

const useDragDrop = (initialData) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (isSameColumn(result)) {
      const { column, contentIds } = reorderSameColumItems(
        state.columns,
        source,
        destination,
        draggableId
      );
      dispatch({
        type: "SAME_COLUMN_UPDATE",
        payload: { column, contentIds },
      });
    } else {
      const {
        sourceColumn,
        sourcecontentIds,
        destColumn,
        destcontentIds,
      } = reorderDiffColumItems(
        state.columns,
        source,
        destination,
        draggableId
      );

      dispatch({
        type: "DIFFERENT_COLUMN_UPDATE",
        payload: {
          source: {
            column: sourceColumn,
            contentIds: sourcecontentIds,
          },
          destination: {
            column: destColumn,
            contentIds: destcontentIds,
          },
          draggableId: draggableId,
        },
      });
    }
  };
  return { onDragEnd, state, dispatch };
};

export default useDragDrop;
