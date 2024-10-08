import React from "react";

const ForgetPassword = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Forgot Password
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Reset Link
            </button>
          </form>

          {/* Note/Instruction Message */}
          <p className="mt-4 text-gray-600 text-sm text-center">
            Please enter your email to receive password reset instructions.
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
