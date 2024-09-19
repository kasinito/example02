import React, { useState, useEffect } from "react";
import axios from "axios";
import Line from "./Line";

const Main = () => {
  const [content, setContent] = useState([]);
  const [text, setText] = useState("");
  const [reload, setReload] = useState(false);
  const check = () => {
    console.log(content);
  };
  const lineUp = async (e) => {
    e.preventDefault();
    if (text !== "") {
      const liner = {
        text: text,
        isDone: false,
      };
      await axios.post(`http://localhost:3001/list`, liner);
      setText("");
      setReload(!reload);
    }
  };
  const deleteLine = async () => {
    const e = content
      .filter((res) => res.isDone === true)
      .map((rese) => rese.id);
    e.map((rel) => axios.delete(`http://localhost:3001/list/${rel}`));
    setReload(!reload);
  };
  const fixLine = (li) => {
    axios.patch(`http://localhost:3001/list/${li.id}`, li);
    setReload(!reload);
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/list`).then((res) => {
      setContent(res.data);
    });
  }, [reload]);

  return (
    <>
      <form onSubmit={(e) => lineUp(e)}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button>confirm</button>
      </form>
      <button onClick={check}>check</button>
      {content.map((line) => {
        return <Line key={line.id} content={line} fixLine={fixLine} />;
      })}
      <button onClick={deleteLine}>delete</button>
    </>
  );
};

export default Main;
