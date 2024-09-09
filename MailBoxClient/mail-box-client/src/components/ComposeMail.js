import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sentActions } from "../store/sentSlice";
import fetchMail from "../hooks/useFetch";

const ComposeEmail = () => {
  const toRef = useRef();
  const subjectRef = useRef();

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const subject = subjectRef.current.value;
    const toList = toRef.current.value.split(" ");
    const toList1 = toList.map((item) => {
      let sitem = item.toLowerCase().split("@");
      let item1 = "";
      sitem.forEach((item) => (item1 += item));
      sitem = item1.split(".");
      item1 = "";
      sitem.forEach((item) => (item1 += item));
      return item1;
    });
    toList1.forEach(async (email) => {
      const res = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/received${email}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: localStorage.getItem("actualEmail"),
            header: subject,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            read: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data && data.error && data.error.message) {
        alert(data.error.message);
      }
    });
    const res = await fetch(
      `${process.env.REACT_APP_DATABASE_URL}/sent${localStorage.getItem(
        "email"
      )}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          to: toList,
          header: subject,
          content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    if (data && data.error && data.error.message) {
      alert(data.error.message);
    }

    toRef.current.value = "";
    subjectRef.current.value = "";
    setEditorState(() => EditorState.createEmpty());
    
    data = await fetchMail(localStorage.getItem("email"), "sent");
    dispatch(sentActions.setSent())

  };

  return (
    <form
      className="my-3 text-center"
      onSubmit={submitHandler}
    >
      <label htmlFor="to" className="mx-2">
        To:
      </label>
      <input
        type="text"
        id="to"
        className="p-1"
        placeholder="Recipients"
        ref={toRef}
        required
      />
      <label htmlFor="to" className="mx-1">
        Cc/Bcc
      </label>
      <br />
      <textarea
        rows="1"
        cols="50"
        placeholder="Subject"
        className="my-2 p-1"
        ref={subjectRef}
      />
      <br />
      <Container className="shadow-lg p-3 rounded-3">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="type your message"
      />
      </Container>
      <Button type="submit" variant="secondary" className="mt-2" >Send</Button>
    </form>
  );
};

export default ComposeEmail;
