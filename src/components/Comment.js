import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Dislike } from "../assets/dislike.svg";
import axios from "axios";

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  handleLikeNode,
  handleDislikeNode,
  user,
  email,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);


  useEffect(() => {
    inputRef?.current?.focus();
    setExpand(comment.id === 1 | comment?.items?.length);
    setInput("");

  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if(user === "")
    {
      alert("Please Login to comment")
      return;
    }
    if (editMode) {
      if(inputRef?.current?.innerText === "")
      {
        alert("Please type something");
        return;
      }
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      if (input === "") {
        alert("Please type something");
        return;
      }
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"} >
        {comment.id === 1 ? (
          <>
            <textarea
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />
            <div className="comment-btn-container">
              <Action
                className="reply comment"
                type="COMMENT"
                handleClick={onAddComment}
              />
            </div>
          </>
        ) : (
          <>
            <b>{comment.authorName}</b>
            <br></br>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {comment.likers &&
                          <>
                            {
                              Object.entries(comment.likers).find(([key, value]) => key === email && value) ? (
                                <>
                                  <Like width="15px" height="15px" fill="black" />
                                </>
                              ) : (
                                <>
                                  <Like width="15px" height="15px" />
                                </>
                              )
                            }
                          </>
                        }
                        {" " + comment.likes}
                      </>
                    }
                    handleClick={() => {
                      handleLikeNode(comment.id);
                    }}
                  />
                  <Action
                    className="reply"
                    type={
                      <>
                        {comment.dislikers &&
                          <>
                            {
                              Object.entries(comment.dislikers).find(([key, value]) => key === email && value) ? (
                                <>
                                  <Dislike width="15px" height="15px" fill="black" />
                                </>
                              ) : (
                                <>
                                  <Dislike width="15px" height="15px" />
                                </>
                              )
                            }
                          </>
                        }
                        {" " + comment.dislikes}
                      </>
                    }
                    handleClick={() => {
                      handleDislikeNode(comment.id);
                    }}
                  />
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  {comment.authorEmail === email && (
                    <>
                      <Action
                        className="reply"
                        type="EDIT"
                        handleClick={() => {
                          setEditMode(true);
                        }}
                      />
                      <Action
                        className="reply"
                        type="DELETE"
                        handleClick={handleDelete}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: comment.id === 1 ? 0 : 25 }}>
        {showInput && (
          <div className="inputContainer">
            <textarea
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              handleLikeNode={handleLikeNode}
              handleDislikeNode={handleDislikeNode}
              user={user}
              email={email}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
