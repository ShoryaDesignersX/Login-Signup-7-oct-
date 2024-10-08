import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/Toastify/Toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        

const DashBoard = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  //   console.log(userData);

  const token = localStorage.getItem("jwttoken");
  const decoded = jwtDecode(token);

  const fetchUserData = async (req, res) => {
    try {
      const url = `http://localhost:3000/user/DashBoard/${decoded.id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      //   console.log(response)
      if (response) {
      }
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Logout action
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleSuccess("Logged out successfully!");
      setTimeout(() => {
        localStorage.removeItem("jwttoken");
        navigate("/login");
      }, 1000);
    }
  };

  const expiresToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        handleError("Token Expired. Please Login Again");
        setTimeout(() => {
          localStorage.removeItem("jwttoken");
          navigate("/login");
        }, 2000);
      }
    } else {
      handleError("No token found. Please log in.");
      navigate("/login");
    }
  };

  useEffect(() => {
    expiresToken();
    fetchUserData();

    const interval = setInterval(() => {
      expiresToken();
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [token]); // Add token as a dependency);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            name="name"
            value={userData.name}
            // onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            type="email"
            name="email"
            value={userData.email}
            // onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            type="mobile"
            name="mobile"
            value={userData.mobile}
            // onChange={handleChange}
          />
        </div>

        {/* Update Button */}
        <button
          //   onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className=" mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashBoard;
