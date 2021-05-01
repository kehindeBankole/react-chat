import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [message, setmessage] = useState("");
  const [id, setid] = useState("");
  const [msg, setmsg] = useState([]);
  const socketRef = useRef();
  const textRef = useRef();
  // const socket = io("/");

  useEffect(() => {
    socketRef.current = io("/");
    //const socket = io("/");
    socketRef.current.on("message", (message) => {
      setmsg((oldmsg) => [...oldmsg, message]);
    document.getElementsByClassName('text')[0].scrollTop=document.getElementsByClassName('text')[0].scrollHeight
    });
  }, []);
  function sendmessage(e) {
    e.preventDefault();

    //emit message to server
    socketRef.current.emit("chatMessage", message);

  }
  return (
    <>
      <div className="text">
        {/* <p>{msg}</p> */}
      {msg.map((d) => (
       <div className="" style={{padding:'10px'}}>
         {d}
       </div>
      ))}
      </div>
      <form>
        <div className="input">
          {" "}
          <input type="text" onChange={(e) => setmessage(e.target.value)} />
        </div>
        <div className="sends">
          {" "}
          <button className="send" onClick={sendmessage}>
            SEND
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
