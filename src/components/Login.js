import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateFormData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
    setErrorMessage(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = signInForm
      ? validateFormData(email.current.value, password.current.value)
      : validateFormData(
          email.current.value,
          password.current.value,
          name.current.value,
          true
        );
    setErrorMessage(message);
    if (message) return;
    if (!signInForm) {
      //create new user here
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName: name.current.value,
                  photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              navigate("/error");
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        });
    } else {
      //sign in goes here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        });
    }

    //sign-in / sign-up
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
      <form
        className="w-3/12 absolute p-12 bg-black my-16 mx-auto right-0 left-0 text-white bg-opacity-80"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold py-4">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="p-3 my-4 w-full bg-gray-700"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-700"
          ref={password}
        />
        <p className="py-2 text-red-500 font-bold text-lg">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-800 w-full rounded-lg" type="submit">
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        {/* {signInForm ? (
          <button
            className="p-4 my-6 bg-red-800 w-full rounded-lg"
            type="submit"
          >
            Sign In{" "}
          </button>
        ) : (
          <button
            className="p-4 my-6 bg-red-800 w-full rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        )} */}
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
