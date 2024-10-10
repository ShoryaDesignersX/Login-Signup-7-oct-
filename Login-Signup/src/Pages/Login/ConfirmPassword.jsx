import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const ConfirmPassword = () => {
  const navigate = useNavigate()
  const location = useLocation();
  // console.log(location.state.userID);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async (values) => {
    const newPassword = values.confirmPassword;

    // console.log(newPassword, decoded.id);

    try {
      const url = `http://localhost:3000/user/update/${location.state.userID}`;
      const response = await axios.put(url, {
        password: newPassword,
      });

      //   console.log("Response", response);

      if (response.data.success === true) {
        Swal.fire({
          title: "Password Changed!",
          text: "Your password has been successfully updated.",
          icon: "success",
          timer:2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash />);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<FaEye />);
    } else {
      setType("password");
      setIcon(<FaEyeSlash />);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* New Password Field */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Field
                      name="newPassword"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      type={type}
                      placeholder="Enter your new password"
                    />
                    <span
                      onClick={handleToggle}
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {icon}
                    </span>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="small"
                    className="text-red-500   absolute"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4" style={{ marginBottom: "10px" }}>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    type="password"
                    placeholder="Confirm your new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="small"
                    className="text-red-500  absolute"
                  />
                </div>

                {/* Change Password Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Change Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
