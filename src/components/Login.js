import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
      </div>
      {/* <div className="flex justify-center items-center h-96 text-white"> */}
      <form className="w-3/12 absolute p-12 bg-black my-16 mx-auto right-0 left-0 text-white bg-opacity-80 ">
        <h1 className="text-3xl font-bold py-4">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="p-3 my-4 w-full bg-gray-700"
        />
        <input
          type="text"
          placeholder="password"
          className="p-3 my-4 w-full bg-gray-700"
        />
        {signInForm ? (
          <button className="p-4 my-6 bg-red-800 w-full rounded-lg">
            Sign In{" "}
          </button>
        ) : (
          <button className="p-4 my-6 bg-red-800 w-full rounded-lg">
            Sign Up
          </button>
        )}
        {signInForm ? (
          <p className="text-gray-400">
            New to Netflix ?{" "}
            <span
              className="cursor-pointer text-white"
              onClick={toggleSignInForm}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-gray-400">
            Already a user?{" "}
            <span
              className="text-white cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign In
            </span>
          </p>
        )}
      </form>
      {/* </div> */}
    </div>
  );
};

export default Login;
