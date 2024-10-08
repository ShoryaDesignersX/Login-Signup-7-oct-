import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/Toastify/Toastify";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [rememMe, setRememMe] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: sessionStorage.getItem("email") || "",
    password: sessionStorage.getItem("password") || "",
    rememberMe: sessionStorage.getItem("remem") || rememMe,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onSubmit = async (values) => {
    setRememMe(values.rememberMe);
    try {
      const url = "http://localhost:3000/user/Login";
      const resposne = await axios.post(url, values);
      console.log("data send succesfully", resposne);
      if (resposne.data.success === true) {
        handleSuccess("Login SuccessFully");
        setTimeout(() => {
          localStorage.setItem("jwttoken", resposne.data.jwt_token);
          if (values.rememberMe === true) {
            sessionStorage.setItem("email", values.email);
            sessionStorage.setItem("password", values.password);
            sessionStorage.setItem("remem", values.rememberMe);
          }
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };

  // for eye button
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-red-500  inline-block absolute"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={type}
                      name="password"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      onClick={handleToggle}
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {icon}
                    </span>
                  </div>
                  </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
