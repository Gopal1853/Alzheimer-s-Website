import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleAboutClick = () => {
    const aboutSection = document.getElementById("info_section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMoreClick = () => {
    window.location.href = "https://www.alz.org/alzheimers-dementia/research_progress/earlier-diagnosis"; // Change this to the desired URL
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact_section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const bgImage = document.querySelector('.image-bg-scroll');
    const taskImage = document.querySelector('.image-task-scroll');
    const scrollPosition = window.scrollY + window.innerHeight;

    if (bgImage && scrollPosition > bgImage.offsetTop + 200) {
      bgImage.classList.add('active');
    }

    if (taskImage && scrollPosition > taskImage.offsetTop + 200) {
      taskImage.classList.add('active');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    // Logic to send email (use EmailJS or a backend service)
    
    // For now, just simulate success message
    setConfirmationMessage("Message sent successfully!");

    // Optionally, reset the form
    nameRef.current.value = '';
    emailRef.current.value = '';
    messageRef.current.value = '';
  };

  return (
    <div>
      <header className="relative text-left bg-white-600 text-Blue mt-4">
        <h1 className="text-3xl font-bold">We welcome you to Alzheimer's Prediction Website</h1>
        <div className="absolute top-0 right-0 mt-2 mr-4 flex space-x-4">
          <button
            onClick={handleAboutClick}
            className="px-4 py-2 text-white bg--600 rounded hover:bg-red-700"
          >
            About
          </button>
          <button
            onClick={handleLearnMoreClick}
            className="px-4 py-2 text-white bg--600 rounded hover:bg-cyan-700"
          >
            Learn More
          </button>
          <button
            onClick={handleContactClick}
            className="px-4 py-2 text-white bg--600 rounded hover:bg-purple-700"
          >
            Contact
          </button>
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 text-white bg--600 rounded hover:bg-indigo-700"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="px-4 py-2 text-white bg--600 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
        <div className="absolute top-12 right-0 mt-2 mr-4 flex justify-center">
          <div id="google_translate_element"></div>
        </div>
      </header>
      <section id="info_section" className="flex flex-col items-center p-8 image-scroll image-task-scroll">
  <img
    src="/Task management.png"
    alt="Task Management"
    className="rounded-lg shadow-md"
    style={{ maxWidth: "1000px", maxHeight: "800px" }}
  />
  <div className="flex flex-col items-left p-10 bg-cyan-100">
    <h1 className="text-2xl font-bold mb-4">What is Alzheimer’s Disease?</h1>
    <p className="mb-6">
      Alzheimer’s disease is a progressive neurodegenerative disorder that leads to memory loss, cognitive decline, and changes in behavior and personality. It is the most common cause of dementia, affecting millions of people worldwide. The disease gradually destroys brain cells, leading to severe impairment of cognitive functions, which affects the ability to perform daily activities.
    </p>
    <h2 className="text-xl font-semibold mb-4">How Can It Be Prevented?</h2>
    <p>
      While Alzheimer’s disease poses challenges, there is hope through proactive measures that can help mitigate the risk. Embracing a healthy lifestyle, including a balanced diet and regular physical activity, can have a significant impact. Engaging in stimulating mental exercises and nurturing social connections also play a crucial role. By focusing on overall well-being and preventive care, we can take meaningful steps towards a brighter future and potentially reduce the risk of Alzheimer’s disease.
    </p>
  </div>
</section>

      <section id="contact_section" className="contact_section p-10 bg-cyan-100">
        <div className="contact_content">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-2">PIMS Puducherry</p>
          <p>Address: Kalathumettupathai, Ganapathichettikulam Village No.20, Kalapet, Puducherry 605014</p>
          <p>Phone: 0413 265 1111, 1800 425 9009</p>

          <form id="contactForm" className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameRef}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                ref={messageRef}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700"
            >
              Submit
            </button>
          </form>

          <p id="confirmationMessage" className="mt-4 text-green-600">{confirmationMessage}</p>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
