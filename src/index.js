import React from "react";
import ReactDOM from "react-dom/client";
import DFS_Nested_Comments from "./DFS_Nested_Comments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DFS_Nested_Comments ForumID="3" user="user1" />
  </React.StrictMode>
);