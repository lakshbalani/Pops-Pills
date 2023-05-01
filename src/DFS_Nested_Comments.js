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

  const { insertNode, editNode, deleteNode, likeNode, dislikeNode} = useNode();

  const handleInsertNode = async (folderId, item) => {
    let authtoken = props.user;
    const response1 = await axios
      .post("http://localhost:3002/api/getname", {
        token: authtoken
      })
    const authName = response1.data[0].name;
    console.log(response1.data[0].name);
    let commentsData1 = commentsData
    const finalStructure = insertNode(commentsData1, folderId, item, authtoken, authName);
    console.log(finalStructure);
    console.log(commentsData)
    const response2 = await axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then(res=>{
        console.log(res)
        // setCommentsData(res.data.data[res.data.data.length-1]);
      })
    // reload page
    // window.location.reload();
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    console.log(finalStructure);
    console.log(commentsData)
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(finalStructure);
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(temp);
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleLikeNode = (folderId) => {
    let authtoken = props.user
    const finalStructure = likeNode(commentsData, folderId, authtoken);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(finalStructure);
        console.log(res);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const handleDislikeNode = (folderId) => {
    let authtoken = props.user
    const finalStructure = dislikeNode(commentsData, folderId, authtoken);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        id: props.ForumID,
        content: finalStructure
      })
      .then((res) => {
        setCommentsData(finalStructure);
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
          user = {props.user}
          // width = {1000}
          comment={commentsData}
        />
      </div>
    </>
  );
};

export default DFS_Nested_Comments;
