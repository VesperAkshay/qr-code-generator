import { useState } from "react";
import { sendEmailVerification } from "firebase/auth"; 
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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email and password
    if (emailError || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send email verification
      await sendEmailVerification(user);
  
      // Display a success message for email verification
      toast.success("Registration successful! Please check your email for verification.");
  
      // Navigate to the login page
      navigate("/login");
  
    } catch (error) {
      // Handle any errors during registration
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen max-w-screen-lg bg-white grid grid-cols-[auto,1fr] justify-items-center  mx-auto items-center pb-32">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-10 items-left min-w-[26rem] max-w-full ml-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-3xl font-extrabold text-left mb-12 text-gray-800 ">
          Sign Up
        </h1>
        <div className="mb-4 flex flex-row items-center min-w-full py-3 border-b-2 border-gray-400">
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
        <div className="mb-4 flex flex-row min-w-full items-center py-3 border-b-2 border-gray-400">
          <span className="pr-2">
            <MdEmail className="" />
          </span>
          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className="w-full pl-2"
            required
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>
        <div className="mb-4 flex flex-row gap-2 items-center py-3 min-w-full border-b-2 border-gray-400 w-full">
          <span>
            <RiLockPasswordFill />
          </span>
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-2"
            required
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
            style={{ backgroundColor: "white !important" }}
          />
        </div>
        <div className="mb-8 flex flex-row items-center py-3 gap-2 min-w-full border-b-2 border-gray-400 w-full">
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
            animate={{ backgroundColor: "#ffffff" }}
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>

        <div className="min-w-full flex gap-4 flex-row mb-14">
          <motion.input type="checkbox" className="" />
          <p className="min-w-full text-xs">
            I agree to all statements in{" "}
            <Link to="/settings" className="underline hover:text-slate-400" href="">
              Terms of Service
            </Link>{" "}
          </p>
        </div>
        <motion.button
          type="submit"
          className=" bg-blue-400 text-white py-3 px-8 rounded-lg hover:bg-blue-300 transition-colors duration-300 shadow-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Register
        </motion.button>
      </motion.form>
      <div className="flex flex-col justify-items-center gap-4 align-center text-center sm:block">
        <img alt="OfficeIcon" src={OfficeIcon} className="mb-6" />
        <p>
          <Link to="/login" className="underline hover:text-slate-400" href="">
            I am already a member
          </Link>
        </p>
      </div>
    </div>
  );
}