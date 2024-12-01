import useAccountSettings from "../hooks/useAccountSetting";
import { useState } from "react";

const accountSettings = () => {
  const useAccount = useAccountSettings();
  const [user, setUser] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const changePassword = async (e) => {
    e.preventDefault();
    await useAccount(user);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Account Settings
      </h2>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* current password*/}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          value={user.oldPassword}
          onChange={(e) => setUser({ ...user, oldPassword: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={user.newPassword}
          onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Email Notifications */}
      {/* <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={(e) =>
            updateSettings("emailNotifications", e.target.checked)
          }
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">
          Enable email notifications
        </label>
      </div> */}

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={changePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default accountSettings;
