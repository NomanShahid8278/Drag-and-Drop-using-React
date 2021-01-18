import React from "react";
import { DndEngine as DND } from "../../components";
const MediaBox = ({ contentIds, dispatch, column }) => {
  return contentIds.map((item, index) => {
    return (
      <DND.DraggableWrapper key={item.id} item={item} index={index}>
        <div>
          <img src={item.imageUrl} alt="media" />
        </div>
      </DND.DraggableWrapper>
    );
  });
};

export default MediaBox;
