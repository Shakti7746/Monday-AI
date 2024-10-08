import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AiChat from "./components/AiChat";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <AiChat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
