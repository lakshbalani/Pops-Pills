import React from "react";
import ReactDOM from "react-dom/client";
import DFS_Nested_Comments from "./DFS_Nested_Comments";
import CommentSection from "./components/temp";

const root = ReactDOM.createRoot(document.getElementById("root"));

// JSON.parse(localStorage.getItem("dfs-user")).token
// JSON.parse(localStorage.getItem("dfs-user")).user.user_email
// handle user not logged in case     => pass token and email as empty string

root.render(
    <DFS_Nested_Comments ForumID="4" user="87d29b4d-8996-48a2-162a-12439a111c2e" email="lakshbalani2002@gmail.com" />
    // <CommentSection></CommentSection>
);