import React from "react";
import ReactDOM from "react-dom/client";
import DFS_Nested_Comments from "./DFS_Nested_Comments";

const root = ReactDOM.createRoot(document.getElementById("root"));
// JSON.parse(localStorage.getItem("dfs-user")).token
// JSON.parse(localStorage.getItem("dfs-user")).user.user_email
// handle user not logged in case     => pass token and email as empty string
// create empty input alert box       => done
// token changes on each login  => handle edit delete like thingy     => done
// display date of last updated

//  cea91643-4196-4003-3de3-d5adea8aa9fa
//  427aca01-4e72-4f09-bfb3-3907473e3728
root.render(
    <DFS_Nested_Comments ForumID="2" user="427aca01-4e72-4f09-bfb3-3907473e3728" email="lakshbalani@students.iiit.ac.in" />
);