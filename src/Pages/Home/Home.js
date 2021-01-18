import React from "react";
import { useAuth } from "../../AuthContext";
import { DndEngine as DND, Header } from "../../components";
import MediaBox from "./MediaBox";
import Api from "../../user.json";
import "./style.scss";

function loadUserMedia(apiData) {
  if (
    localStorage.getItem("userMedia") &&
    JSON.parse(localStorage.getItem("userMedia"))
  ) {
    const storageMedia = JSON.parse(localStorage.getItem("userMedia"))
    let userMedia = Object.keys(storageMedia).filter((value) => {
      return storageMedia[value] ? true : false;
    });
    let publicMedia = apiData.columns[1].contentIds.filter((value) => {
      return userMedia.includes(value) ? false : true;
    });
    apiData.columns[0].contentIds = userMedia;
    apiData.columns[1].contentIds = publicMedia;
  }
  return apiData;
}
const Home = () => {
  let auth = useAuth();
  let apiData = {
    columns: Api.columns,
    content: Api.content,
    username: auth.user.username,
  };
  return auth.user ? (
    <div>
      <Header signout={auth.signout} />
      <DND InitialData={loadUserMedia(apiData, auth.user)}>
        {(column, contentIds, dispatch) => {
          return (
            <div key={column.id}>
              <div />
              <DND.DroppableWrapper column={column}>
                <div className="user_media">
                  <h2>{column.title}</h2>
                  <div className="media-container">
                    <MediaBox
                      contentIds={contentIds}
                      dispatch={dispatch}
                      column={column}
                    />
                  </div>
                </div>
              </DND.DroppableWrapper>
            </div>
          );
        }}
      </DND>
    </div>
  ) : null;
};

export default Home;
