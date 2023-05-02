import React from "react";
import { useState } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import "./styles.css";
import axios from "axios";

const DFS_Nested_Comments = (props) => {
  const [commentsData, setCommentsData] = useState({
    id: 1,
    items: []
  });

  React.useEffect(() => {
    axios
      .post("http://localhost:3002/api/get", { id: props.ForumID })
      .then((res) => {
        console.log(JSON.parse(res.data[res.data.length - 1].commentsjson));
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { insertNode, editNode, deleteNode, likeNode, dislikeNode } = useNode();

  const handleInsertNode = async (folderId, item) => {
    let email = props.email;
    let authtoken = props.user;
    let name = "";
    const response1 = await axios
      .get("https://datafoundation.iiit.ac.in/api/detokn?token="+authtoken)
      .then(res => {
        let f_name = res?.data?.data?.first_name;
        let l_name = res?.data?.data?.last_name;
        name = f_name + " " + l_name;
      })
      .catch(err => {
        console.log(err);
      });
    const authName = name;
    const authEmail = email;
    let commentsData1 = JSON.parse(JSON.stringify(commentsData));
    const finalStructure = insertNode(commentsData1, folderId, item, authtoken, authName, authEmail);
    console.log(finalStructure);
    console.log(commentsData)
    const response2 = await axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then(res => {
        console.log(JSON.parse(res.data[res.data.length - 1].commentsjson))
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
      })
  };

  const handleEditNode = (folderId, value) => {
    let commentsData1 = JSON.parse(JSON.stringify(commentsData));
    const finalStructure = editNode(commentsData1, folderId, value);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleDeleteNode = (folderId) => {
    let commentsData1 = JSON.parse(JSON.stringify(commentsData));
    const finalStructure = deleteNode(commentsData1, folderId);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleLikeNode = (folderId) => {
    let authemail = props.email
    let commentsData1 = JSON.parse(JSON.stringify(commentsData));
    const finalStructure = likeNode(commentsData1, folderId, authemail);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleDislikeNode = (folderId) => {
    let authemail = props.email
    let commentsData1 = JSON.parse(JSON.stringify(commentsData));
    const finalStructure = dislikeNode(commentsData1, folderId, authemail);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(JSON.parse(res.data[res.data.length - 1].commentsjson));
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  return (
    <>
      <div className="App">
        <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          handleLikeNode={handleLikeNode}
          handleDislikeNode={handleDislikeNode}
          user={props.user}
          email={props.email}
          comment={commentsData}
        />
      </div>
    </>
  );
};

export default DFS_Nested_Comments;
