import toast from "react-hot-toast";

const useAccountSetting = () => {
  const useAccount = async ({ username, oldPassword, newPassword }) => {
    try {
      const success = fieldChecker({ username, oldPassword, newPassword });

      if (!success) {
        return;
      }
      const res = await fetch("http://localhost:3000/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await res.json();

      if (data.status === "password changed successfully!") {
        toast.success(data.status);
      } else {
        toast.error("An error Occured, please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return useAccount;
};

function fieldChecker({ username, oldPassword, newPassword }) {
  if (!username || !oldPassword || !newPassword) {
    toast.error("Please fill all fields");
    return false;
  }

  return true;
}
export default useAccountSetting;
