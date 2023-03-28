import React from "react";
import { useState } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import "./styles.css";
import axios from "axios";

const App = () => {
  const [commentsData, setCommentsData] = useState({
    id: 1,
    items: []
  });

  const [flag, setFlag] = useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get")
      .then((res) => {
        console.log(JSON.parse(res.data[res.data.length-1].commentsjson).finalStructure);
        setCommentsData(JSON.parse(res.data[res.data.length-1].commentsjson).finalStructure);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        finalStructure
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

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    console.log(finalStructure);
    axios
      .post("http://localhost:3002/api/create", {
        finalStructure
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
        finalStructure
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

  return (
    <>
      <div className="App">
        <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        />
      </div>
    </>
  );
};

export default App;
