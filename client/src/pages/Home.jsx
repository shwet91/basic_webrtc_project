import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { socket } = useSocket();
  const [name, setName] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate()

  const submitBtnHandler = () => {
    if (!name || !roomId) return;
    socket.emit("join-room", { roomId: roomId, name: name });

  };

  useEffect(() => {
    if (!socket) return;

    socket.on("joined-room", (roomId) => {
      console.log("Room joined succesfully :", roomId);
      navigate(`/room/${roomId}`)
    });

    return () => socket.off("welcome");
  }, [socket]);

  return (
    <div className="h-full w-full bg-slate-700">
      <h1>test for the web rtc</h1>

      <div>
        <input
          type="text"
          className="bg-white text-black"
          placeholder="Enter the name "
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="bg-white text-black m-5"
          placeholder="Enter the room Id "
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      <button onClick={submitBtnHandler} className="bg-green-500">Enter the room</button>
    </div>
  );
}

export default Home;
