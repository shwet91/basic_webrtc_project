import { useCallback } from "react";
import { useSocket } from "../providers/SocketProvider";



function Test() {
    const {socket} = useSocket();

    const test = useCallback(() => {
    console.log("tst run")
    socket.emit("calling-peer" , )
    },[])
  return <div>This is test</div>;
}

export default Test;
