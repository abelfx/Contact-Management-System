import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function salesAnalytics() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl bg-white p-10 rounded-lg shadow-lg ${
        visible ? "block" : "hidden"
      }`}
    >
      <AiOutlineClose
        className="absolute top-2 right-5 text-black hover:text-red-700 cursor-pointer"
        onClick={toggleVisibility}
      />
      <h1>There Ain't No Sales Analytics Because I Did Not Sell Shit Yet</h1>
      <h2 className="text-2xl">😏</h2>
    </div>
  );
}

export default salesAnalytics;
