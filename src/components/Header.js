import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Header = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
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
