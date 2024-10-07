import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { SignUp } from "./Components/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
