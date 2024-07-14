import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import { UserProvider } from "./UserContext";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workout from "./pages/Workout";
import Logout from "./pages/Logout";

function App() {
  const [user, setUser] = useState({
    id: null,
    // isAdmin: null,
    firstName: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`https://fitness-tracker-using-api.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== "undefined") {
          setUser({
            id: data.user._id,
            firstName: data.user.firstName,
          });
        } else {
          setUser({
            id: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
