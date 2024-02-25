import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import { addUser, removeUser } from "../utils/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signedIn
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        //user is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscirbe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute w-full px-8 py-6 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-12"
        src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico"
        alt=""
      />
      {user && (
        <div className="flex">
          <div></div>
          <div className="flex justify-around items-center">
            <img src={user.photoURL} alt="user-logo" className="w-12 h-12" />
            <button onClick={signOutUser} className="text-white">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
