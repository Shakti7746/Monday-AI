import React, { useState } from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import shakti_Img from '../assets/shakti_img.jpg'
import roshan_img from '../assets/roshan.jpeg'

const About = () => {
  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <h1 className="text-5xl font-bold mb-4">Meet Your AI Companion</h1>
      <h2 className="text-2xl mb-8">
        Discover the power of intelligent conversation.
      </h2>

      {/* Introduction and other sections */}
      <div className="bg-gradient-to-r from-sky-400 via-green-400 to-magenta-400 text-gray-800 rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h3 className="text-3xl font-semibold mb-4">Introduction</h3>
        <p className="text-lg mb-4">
          Welcome to Monday-AI, your personal AI companion. We're committed to
          creating a platform that seamlessly blends human-like interaction with
          cutting-edge artificial intelligence. Our goal is to provide you with
          a supportive, informative, and engaging conversational experience.
        </p>

        {/* Key Features */}
        <h3 className="text-3xl font-semibold mb-4">Key Features</h3>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>
            <strong>Intelligent Conversations:</strong> Engage in natural,
            dynamic conversations on a wide range of topics.
          </li>
          <li>
            <strong>24/7 Availability:</strong> Get assistance or companionship
            anytime, anywhere.
          </li>
          <li>
            <strong>Personalized Experience:</strong> Enjoy tailored
            interactions based on your preferences and interests.
          </li>
        </ul>

        {/* How it Works */}
        <h3 className="text-3xl font-semibold mt-8 mb-4">How it Works</h3>
        <p className="text-lg mb-4">
          Our AI is built on advanced language models and machine learning
          algorithms. It's designed to understand and respond to your queries,
          requests, and even emotions in a human-like manner.
        </p>

        {/* Our Mission */}
        <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
        <p className="text-lg mb-4">
          We strive to create an AI that is not only intelligent but also
          empathetic and helpful. Our mission is to make your life easier, more
          enjoyable, and more fulfilling through meaningful interactions.
        </p>

        {/* Team */}
        <h3 className="text-3xl font-semibold mb-4">Team</h3>
        <p className="text-lg mb-4">Developed by CodeNoobies</p>

        {/* Photos of Developers */}
        <div className="flex space-x-4 mb-8">
          <img
            src={shakti_Img}
            alt="Shakti Kushwaha"
            className="w-32 h-32 rounded-full object-cover"
          />
          <img
            src={roshan_img}
            alt="Roshan"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Privacy and Security */}
        <h3 className="text-3xl font-semibold mb-4">Privacy and Security</h3>
        <p className="text-lg mb-4">
          Your privacy is our top priority. We are committed to protecting your
          data and ensuring secure interactions.
        </p>

        {/* Call to Action */}
        <h3 className="text-3xl font-semibold mb-4">Join the AI revolution!</h3>
        <p className="text-lg">
          Start chatting with Monday-AI today and experience the future of
          conversation.
        </p>
      </div>

      {/* Contact Options */}
      <div className="flex space-x-6 mt-8">
        <a
          onClick={toggleModal}
          className="text-3xl cursor-pointer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://github.com/shakti7746"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <FaGithub />
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg text-center text-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Follow us on Instagram</h3>
            <div className="space-y-4">
              <a
                href="https://instagram.com/_shakti.kushwaha_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Shakti Kushwaha
              </a>
              <br/>
              <a
                href="https://instagram.com/roshant2861"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Roshan Tiwari
              </a>
            </div>
            <button
              onClick={toggleModal}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8">
        <p className="text-sm">© 2024 Monday-AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
