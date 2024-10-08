
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  const auth = getAuth(); // Initialize auth globally


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

//leaving here for design updates on where to place this functionality 
  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);

    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true); // Set loading to true while signing in

    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Google registration successful!");
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (error) {
      setError(error.message);
      console.error("Error during Google registration", error);
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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

        <h1 className="text-3xl font-extrabold text-left mb-12 text-gray-800 ">Create an Account</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          Sign Up
        </h1>
        <div className="mb-4 flex flex-row items-center min-w-full py-3 border-b-2 border-gray-400">
          <span className="pr-2" >
            <FaUser />
          </span>
          <motion.input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-2"

            required
          />
        </div>
        <div className="mb-4 flex flex-row min-w-full items-center py-3 border-b-2 border-gray-400">
          <span className="pr-2" >
            <MdEmail className="" />
          </span>
          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <p className="min-w-full text-xs">I agree to all statements in <Link to="/settings" className="underline hover:text-slate-400" href="">Terms of Service</Link> </p>

        </div>
        <motion.button
          type="submit"
          className=" bg-blue-400 text-white py-3 px-8 rounded-lg hover:bg-blue-300 transition-colors duration-300 shadow-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Register
        </motion.button>
      </motion.form>
      <div className="flex flex-col justify-items-center gap-4 align-center text-center hidden sm:block">
        <img alt="OfficeIcon" src={OfficeIcon}  className="mb-6"/>
        <p><Link to="/login" className="underline hover:text-slate-400" href="">I am already a member</Link></p>
      </div>
    </div>
  );
}
