import React from "react";
import useAccountSettings from "../hooks/useAccountSetting";

const accountSettings = () => {
  const { username, email, password, emailNotifications, updateSettings } =
    useAccountSettings();

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
          value={username}
          onChange={(e) => updateSettings("username", e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => updateSettings("email", e.target.value)}
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
          value={password}
          onChange={(e) => updateSettings("password", e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Email Notifications */}
      <div className="flex items-center mb-4">
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
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={() => alert("Settings saved!")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default accountSettings;
