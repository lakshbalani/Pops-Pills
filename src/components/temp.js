import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleConvert = async () => {
    const profanity = require('leo-profanity');
    const sentence = 'rgw';

    console.log(profanity.clean(sentence))


  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
      <button onClick={handleConvert}>Convert</button>
    </>
  );
};

export default MyEditor;
