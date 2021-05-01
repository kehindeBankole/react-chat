import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App() {
 
  // const socketRef = useRef();
  useEffect(() => {
   // socketRef.current = io.connect("/");
    const socket = io("/");

    socket.on('message' , message=>{
      console.log(message)
    })
  }, []);
  return (
    <>
    <form>
    <div className="input">  <input type="text" /></div>
     <div className="sends"> <button className="send">SEND</button></div>
    
    </form>
    </>
  )
}

export default App;
