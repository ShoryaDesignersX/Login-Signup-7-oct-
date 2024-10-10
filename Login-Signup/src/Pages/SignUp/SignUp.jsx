import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../../utils/Toastify/Toastify";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    gender: "",
    qualifications: [],
    mobile: "",
    email: "",
    password: "",
  };

  //   dasdsdsad
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Name is required"),
    gender: Yup.string().required("Gender Required"),
    qualifications: Yup.array()
      .min(1, "Select at least one qualification") // Ensures at least one qualification is selected
      .required("Qualification is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits") // Ensures the mobile number has exactly 10 digits
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const onSubmit = async (values) => {
    console.log(values);

    // try {
    //   const url = "http://localhost:3000/user/SignUp";
    //   const resposne = await axios.post(url, values);
    //   console.log("data send succesfully", resposne);
    //   if (resposne.data.success === true) {
    //     handleSuccess("SignUp SuccessFully");
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   handleError(`Error Occur: ${error.response.data.message}`);
    // }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full "
          style={{ maxWidth: "35rem" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

                {/* Gender Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-1 space-y-2">
                    <div>
                      <Field
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                      />
                      <label htmlFor="male" className="text-gray-700">
                        Male
                      </label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                      />
                      <label htmlFor="female" className="text-gray-700">
                        Female
                      </label>
                    </div>
                    <div>
                      <Field
                        type="radio"
                        id="other"
                        name="gender"
                        value="Other"
                        className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                      />
                      <label htmlFor="other" className="text-gray-700">
                        Other
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Qualifications
                  </label>
                  <div className="flex space-x-4 mt-1">
                    <div className="flex items-center">
                      <Field

                        name="qualifications"
                        id="tenth"
                        type="checkbox"
                        value="10th"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="tenth"
                        className="text-gray-700 ml-2 text-sm"
                      >
                        10th
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        name="qualifications"
                        id="twelfth"
                        type="checkbox"
                        value="12th"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="twelfth"
                        className="text-gray-700 ml-2 text-sm"
                      >
                        12th
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        name="qualifications"
                        id="graduation"
                        type="checkbox"
                        value="Graduation"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="graduation"
                        className="text-gray-700 ml-2 text-sm"
                      >
                        Graduation
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        name="qualifications"
                        id="masters"
                        type="checkbox"
                        value="Masters"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="masters"
                        className="text-gray-700 ml-2 text-sm"
                      >
                        Masters
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="qualifications"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

                {/* Mobile Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile
                  </label>
                  <Field
                    type="tel"
                    name="mobile"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your mobile number"
                    required
                  />
                  <ErrorMessage
                    name="mobile"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

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
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-red-500 absolute "
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className=" mt-1 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Up
                  </button>
                </div>
                <ToastContainer />
              </Form>
            )}
          </Formik>
          <h2 className="text-sm text-gray-700 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </h2>{" "}
        </div>
      </div>
    </>
  );
};
