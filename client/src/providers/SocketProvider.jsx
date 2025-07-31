import { useMemo } from "react";
import { createContext, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const socketInstance = io("http://localhost:8000");
  //   setSocket(socketInstance);

  //   return () => socketInstance.disconnect();
  // }, []);

  const socket = useMemo(() => io("http://localhost:8000"), []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
