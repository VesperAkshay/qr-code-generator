import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import OfficeIcon from "../assets/office-computer-table.svg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // New state for terms
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailExp.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (emailError) {
      toast.error("Please enter a valid email address.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      toast.error("You must agree to the terms to register.");
      return;
    }

    if (emailError || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-[auto,1fr] justify-items-center items-center p-6 md:p-12 lg:p-0 lg:max-w-screen-lg mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 items-left min-w-[20rem] max-w-full lg:ml-8 shadow-lg rounded-lg w-full lg:w-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-left mb-6 md:mb-12 text-gray-800">
          Sign Up
        </h1>
        <div className="mb-4 flex flex-row items-center py-2 border-b-2 border-gray-400">
          <span className="pr-2">
            <FaUser />
          </span>
          <motion.input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-2"
          />
        </div>
        <div className="mb-4 flex flex-row items-center py-2 border-b-2 border-gray-400">
          <span className="pr-2">
            <MdEmail />
          </span>
          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className="w-full pl-2"
            required
          />
        </div>
        <div className="mb-4 flex flex-row relative gap-2 items-center py-2 border-b-2 border-gray-400">
          <span>
            <RiLockPasswordFill />
          </span>
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-2"
            required
          />
          <span
            className="absolute right-4 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="mb-8 flex flex-row items-center py-2 border-b-2 border-gray-400">
          <span className="pr-2">
            <RiLockPasswordLine />
          </span>
          <motion.input
            type="password"
            placeholder="Repeat your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div className="flex gap-4 flex-row mb-6">
          <motion.input
            type="checkbox"
            checked={isTermsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)} // Update checkbox state
          />
          <p className="text-xs">
            I agree to all statements in{" "}
            <Link to="/settings" className="underline hover:text-slate-400">
              Terms of Service
            </Link>
          </p>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors duration-300 shadow-md font-semibold disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          disabled={!isTermsAccepted} // Disable button when terms are not accepted
        >
          Register
        </motion.button>
      </motion.form>
      <div className="flex flex-col justify-center items-center mt-8 lg:mt-0 lg:block">
        <img alt="OfficeIcon" src={OfficeIcon} className="mb-6 w-64 lg:w-auto" />
        <p>
          <Link to="/login" className="underline hover:text-slate-400">
            I am already a member
          </Link>
        </p>
      </div>
    </div>
  );
}
