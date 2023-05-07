import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import { useState, useRef, useEffect} from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Dislike } from "../assets/dislike.svg";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const profanity = require('leo-profanity');

const ITEM_HEIGHT = 48;

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const handleReset = () => {
    setEditorState(EditorState.createEmpty());
  };

  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const [editCommentState, setEditCommentState] = useState();


  useEffect(() => {
    inputRef?.current?.focus();
    if (comment.id === 1)
      setExpand(true)
    else setExpand(false)
    setEditorState(EditorState.createEmpty());
    if (comment.id !== 1)
      setEditCommentState(EditorState.createWithContent(convertFromHTML(comment?.name)))
  }, [editMode]);

  const handleNewComment = () => {
    setShowInput(true);
  };

  const handleShowReplies = () => {
    setExpand(!expand);
  };

  const onAddComment = () => {
    if (user === "") {
      alert("Please Login to comment")
      return;
    }
    if (editMode) {
      let htmlData = draftToHtml(convertToRaw(editCommentState.getCurrentContent()));
      if (editCommentState.getCurrentContent().hasText() === false) {
        alert("Please type something");
        return;
      }
      handleEditNode(comment.id, profanity.clean(htmlData));
    } else {
      let htmlData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      if (editorState.getCurrentContent().hasText() === false) {
        alert("Please type something");
        return;
      }
      setExpand(true);
      console.log(htmlData)
      console.log(profanity.clean(htmlData))
      handleInsertNode(comment.id, profanity.clean(htmlData));
      setShowInput(false);
      handleReset();
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleClose();
    if (window.confirm("Are you sure you want to delete") === true) {
      handleDeleteNode(comment.id);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditMode(true)
    handleClose();
  };

  var parse = require('html-react-parser');



  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"} >
        {comment.id === 1 ? (
          <>
            <Editor
              editorStyle={{ border: "1px solid #C0C0C0" }}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Type your comment here..."
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
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p>
                <b>{comment.authorName}</b>
                <div className='lastUpdated'>
                  Last updated at
                  {
                    // if new Date(comment.last_updated).getHours() is 1 digit, add 0 before it
                    " " + (new Date(comment.last_updated).getHours().toString().length === 1 ? "0" : "") + new Date(comment.last_updated).getHours() + ":" + (new Date(comment.last_updated).getMinutes().toString().length === 1 ? "0": "") + new Date(comment.last_updated).getMinutes() + " " + new Date(comment.last_updated).getDate() + " " + months[new Date(comment.last_updated).getMonth()] + ", " + new Date(comment.last_updated).getFullYear()
                  }
                </div>
              </p>
              {comment.authorEmail === email && (<div className='three-dots-menu'>
                <IconButton
                  size="very small"
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem onClick={handleEdit}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
              )}
            </div>
            {editMode ?
              (
                <>
                  <Editor
                    editorStyle={{ border: "1px solid #C0C0C0" }}
                    editorState={editCommentState}
                    onEditorStateChange={setEditCommentState}
                  />
                </>
              ) : (
                <>
                  <div>{parse(comment.name)}</div>
                </>
              )
            }

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
                                  <Like className="like" />
                                </>
                              )
                            }
                          </>
                        }
                        {" " + comment.likes}
                      </>
                    }
                    handleClick={() => {
                      if (user === "") {
                        alert("Please Login to like")
                        return;
                      }
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
                                  <Dislike className="dislike" />
                                </>
                              )
                            }
                          </>
                        }
                        {" " + comment.dislikes}
                      </>
                    }
                    handleClick={() => {
                      if (user === "") {
                        alert("Please Login to dislike")
                        return;
                      }
                      handleDislikeNode(comment.id);
                    }}
                  />
                  <Action
                    className="reply"
                    type={
                      <>
                        {/* {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "} */}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {(comment.id !== 1 && comment.items.length > 0) &&
        <div style={{ display: "flex" }}>
          <Action
            className="reply comment"
            type={
              <>
                {expand ? (
                  <UpArrow width="10px" height="10px" fill='white' />
                ) : (
                  <DownArrow width="10px" height="10px" fill='white' />
                )}{" "}
                {comment.items.length}
                {comment.items.length > 1 ? " Replies" : " Reply"}
              </>
            }
            handleClick={handleShowReplies}
          />
        </div>
      }

      <div style={{ display: expand | showInput ? "block" : "none", paddingLeft: comment.id === 1 ? 0 : 25 }}>
        {showInput && (
          <div className="inputContainer reply_textbox">
            <Editor
              editorStyle={{ border: "1px solid #C0C0C0" }}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Type your comment here..."
            />
            <div style={{ display: "flex", flexdirection: "column", marginTop: "5px" }}>
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
