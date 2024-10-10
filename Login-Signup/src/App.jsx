import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { SignUp } from "./Pages/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import PublicRoute from "./Routes/PublicRoutes";

import ChangePass from "./Pages/DashBoard/ChangePass";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import ConfirmPassword from "./Pages/Login/ConfirmPassword";
import ResetPassword from "./Pages/DashBoard/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route>
            {/* Public Route */}

            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/confirmpassword" element={<ConfirmPassword />} />
              <Route path="*" element={<Login />} />
            </Route>
            {/* Protected route */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="profile" element={<DashBoard />} />
              <Route path="resetPassword" element={<ResetPassword />} />
              <Route path="changepassword" element={<ChangePass />} />
              <Route path="*" element={<DashBoard />} />
              {/* Fallback route */}
            </Route>

            {/* </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
