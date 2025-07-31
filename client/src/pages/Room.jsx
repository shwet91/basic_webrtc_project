import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import peerService from "../providers/peerService";
import Test from "./Test";

function Room() {
  const selfVid = useRef();
  const remoteVid = useRef();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [remoteName, setRemoteName] = useState("null");

  const test = useCallback(async () => {
    console.log("test ruin")
    const offer = await peerService.createOffer();
    socket.emit("calling-peer" , {receiverName : remoteName ,offer })
  }, [socket , remoteName])

  const newUserJoined = useCallback(
    async (newUserName) => {
      console.log("new user joined :", newUserName);
      setRemoteName(newUserName);
      const offer = await peerService.createOffer();
      socket.emit("calling-peer", { receiverName: newUserName, offer });
    },
    [socket]
  );

  const acceptCall = useCallback(async (data) => {
    const { offer, senderName } = data;
    console.log(`offer recieved from ${senderName}`, offer);
    const answer = peerService.createAnswer(offer);
    setRemoteName(senderName);
    socket.emit("call-accepted", answer);
  }, [socket]);

  useEffect(() => {
    socket.on("new-user-joined", newUserJoined);
    // socket.on("incomming-call", acceptCall);
    return () => {
      socket.off("new-user-joined", newUserJoined);
      // socket.off("incomming-call", acceptCall);
    };
  }, [socket, newUserJoined, acceptCall]);


  useEffect(() => {
    socket.on("incomming-call" , (data) => {
      console.log("worked")
      console.log(data)
    } )
  }, [socket, acceptCall])

  return (
    <div className="w-full h-[90vh] border-white border-2">
      <h1>You are connected to {remoteName}</h1> 
      <video
        ref={selfVid}
        autoPlay
        playsInline
        muted
        className="border-2 w-[40%]"
      ></video>
      <video ref={remoteVid} className="border-2 w-[40%]"></video>
      <button className="text-white">create offer</button>
      <button className="text-white" onClick={() => navigate("/")}>
        Home
      </button>
      <button onClick={test} >Test</button>
    </div>
  );
}

export default Room;
