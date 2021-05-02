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
    // socket = io("/");
    socketRef.current.on("id", (id) => {
      setid(id);
    });
    socketRef.current.on("message", (message) => {
      console.log(message);
      setmsg((oldmsg) => [...oldmsg, message]);
      document.getElementsByClassName(
        "text"
      )[0].scrollTop = document.getElementsByClassName("text")[0].scrollHeight;
    });
  }, []);
  function sendmessage(e) {
    e.preventDefault();

    //emit message to server
    socketRef.current.emit("chatMessage", message);
    console.log(message);
  }
  return (
    <>
      <div className="text">
        {/* <p>{msg}</p> */}
        <div className="bg">
          <div className="first">
          {msg.map((d, i) =>{
            if(d.id===id){
              return(
                <div className="" style={{ padding: "10px" }} key={i}>
            {d.text}
          </div>
              )
            }
          })}
          </div>
          <div className="second">
          {msg.map((d, i) =>{
            if(d.id!==id){
              return(
                <div className="" style={{ padding: "10px" }} key={i}>
            {d.text}
          </div>
              )
            }
          })}
          </div>
        </div>
        {/* {msg.map((d, i) => (
          <div className="" style={{ padding: "10px" }} key={i}>
            {d.text}
          </div>
        ))} */}
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
