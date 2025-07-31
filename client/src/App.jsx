import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Room from "./pages/Room";
import { SocketProvider } from "./providers/SocketProvider";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<Room/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
