import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineRobot } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Logged in successfully");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    toast.info("Logged out successfully");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-transparent z-20">
        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <>
              <img
                src={user.picture}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white font-medium">{user.name}</span>
            </>
          )}
        </div>
        <div>
          <Link
            className="text-gray-500 font-semibold text-shadow-lg hover:text-gray-900 transition duration-300"
            to="/about"
          >
            About
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout} // Attach the event handler correctly
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithPopup()} // Attach the event handler correctly
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Full-width Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          MONDAY AI
        </h1>
      </div>

      <div className="relative text-center z-10">
        <AiOutlineRobot className="text-white text-6xl mb-4 animate-bounce" />
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to Monday AI Chat
        </h1>
        <p className="text-xl text-white mb-8">
          Your personal AI assistant is here to chat with you.
        </p>

        {isAuthenticated ? (
          <div>
            <h2 className="text-3xl text-white mb-4">Hello, {user.name}!</h2>
            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
              Start Chatting
            </button>
          </div>
        ) : (
          <button
            onClick={() => loginWithPopup()}
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          >
            Login to Start Chatting
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
