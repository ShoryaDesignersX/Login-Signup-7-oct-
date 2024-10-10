import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  // console.log(location.state.userData.email)
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const [email, setEmail] = useState(location.state.userData.email);
  //   console.log(email);
  const [otpVisible, setOtpVisible] = useState(false);
  const [mailOtp, setmailOpt] = useState();
  console.log("mail", mailOtp);
  const [userOtp, setuserOtp] = useState();
  //   console.log("user", userOtp);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleChange2 = (e) => {
    setuserOtp(Number(e.target.value));
  };

  const handleVerify = async () => {
    try {
      const url = `http://localhost:3000/user/mailsend`;
      const response = await axios.post(url, {
        email: email,
      });
      console.log("ssss", response);

      if (response.data.success === true) {
        Swal.fire({
          title: "OTP Sent!",
          text: "An OTP has been sent to your email address.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setOtpVisible(true);
          setIsDisabled(true);
        });
        setmailOpt(response.data.otp);
      }
    } catch (error) {
      // Handle error case
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleResetBtn = () => {
    if (mailOtp === userOtp) {
      Swal.fire({
        title: "OTP Authenticated!",
        text: "Your Otp is Correct You can change your password",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/dashboard/changepassword");
      }, 2000);
    } else {
      Swal.fire({
        title: "OTP Failed!",
        text: "Your Otp is not valid or empty",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              disabled
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              type="email"
              placeholder="Enter your Email"
            />
            <button
              disabled={isDisabled}
              onClick={handleVerify}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Verify
            </button>
          </div>

          {/* OTP Field */}
          {otpVisible && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter OTP
              </label>
              <input
                onChange={handleChange2}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                type="number"
                placeholder="Enter the OTP sent to your email"
              />
            </div>
          )}

          {/* Reset Button */}
          {otpVisible && (
            <button
              onClick={handleResetBtn}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Reset Password
            </button>
          )}
        </div>
        {/* <Outlet/> */}
      </div>
    </>
  );
};

export default ResetPassword;
