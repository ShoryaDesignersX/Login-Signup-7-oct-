import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/Toastify/Toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";


const DashBoard = () => {
  const navigate = useNavigate();
  const [modelShow, setmodelShow] = useState(false);
  console.log(modelShow);

  const showModel = () => {
    setmodelShow(true);
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

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
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          localStorage.removeItem("jwttoken");
          navigate("/login");
        }, 1000);
      }
    });
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
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [token]); // Add token as a dependency);

  const handleResetPassword = () => {
    navigate("/dashboard/resetPassword", { state: { userData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button
            onClick={() => {
              showModel;
            }}
          >
            <FaUserEdit className="text-2xl cursor-pointer" />
          </button>
        </div>

        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full"
            src={userData.photo || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
        </div>

        {/* Display Name */}
        <div className="mb-4">
          <h3 className="text-gray-700 text-lg font-semibold">Name</h3>
          <p className="text-gray-600">{userData.name}</p>
        </div>

        {/* Display Email */}
        <div className="mb-4">
          <h3 className="text-gray-700 text-lg font-semibold">Email</h3>
          <p className="text-gray-600">{userData.email}</p>
        </div>

        {/* Display Phone Number */}
        <div className="mb-6">
          <h3 className="text-gray-700 text-lg font-semibold">Phone Number</h3>
          <p className="text-gray-600">{userData.mobile}</p>
        </div>

        {/* Reset Password Button */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-400 text-black py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 mb-4"
        >
          Reset Password
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashBoard;
