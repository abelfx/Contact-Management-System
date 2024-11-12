import Login from "./contact-ms/login.jsx";
import Signup from "./contact-ms/signup.jsx";
import Home from "./contact-ms/home.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* for now I am going to create a fall back which leads to Signup-page*/}
          <Route path="*" element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
