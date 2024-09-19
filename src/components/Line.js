import React, { useState } from "react";

const Line = ({ content, fixLine, fixNow, setFixNow }) => {
  const [Text, fixText] = useState("");
  const c_done = () => {
    content.isDone = !content.isDone;
  };

  return fixNow === content.id ? (
    <form
      onSubmit={() => fixLine({ id: content.id, text: Text, isDone: false })}
    >
      <input value={Text} onChange={(e) => fixText(e.target.value)} />
      <button>fixDone</button>
    </form>
  ) : (
    <>
      <li>
        {content.text}
        <button onClick={() => setFixNow(content.id)}>config</button>
        <input type="checkbox" value={content.isDone} onClick={c_done} />
      </li>
    </>
  );
};

export default Line;
