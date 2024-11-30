import userLogout from "../hooks/userLogout";
import userDeleteAccount from "../hooks/userDeleteAccount";
import { useAuthContext } from "../context/authContext";
import { AiOutlineLogout } from "react-icons/ai";
import { useAccountSettingContext } from "../context/accountSettingContext";

const leftSide = () => {
  const logout = userLogout();
  const { authUser } = useAuthContext();
  const deleteAccount = userDeleteAccount();

  const { accountToggleFunctionality } = useAccountSettingContext();

  return (
    <div
      id="left"
      className="fixed top-10 left-20 bottom-10 h-screen w-[300px] bg-gray-100 rounded-2xl shadow-lg p-5 flex flex-col items-center"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src="../public/profile.jpg"
          alt="Profile"
          className="rounded-full h-40 w-40 object-cover border-4 border-blue-700 shadow-md"
        />
      </div>

      {/* Profile Information */}
      <p className="text-center text-xl text-blue-800 font-semibold mt-4">
        {authUser.Username}
      </p>
      <p className="text-center text-md text-blue-800 mb-8">{authUser.Email}</p>

      {/* Settings Links */}
      <div className="w-full">
        <p
          className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition"
          onClick={accountToggleFunctionality}
        >
          Account Settings
        </p>
        <p className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition">
          Overview
        </p>
        <p className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition">
          Unsubscribe
        </p>
        <p
          onClick={deleteAccount}
          className="text-center py-3 cursor-pointer text-red-500 hover:bg-red-100 rounded-md transition"
        >
          Delete Account
        </p>
      </div>

      {/* Logout Button */}
      <AiOutlineLogout
        className="text-blue-800 hover:text-blue-500 cursor-pointer mt-auto mb-10 transition"
        size={30}
        onClick={logout}
      />
    </div>
  );
};

export default leftSide;
