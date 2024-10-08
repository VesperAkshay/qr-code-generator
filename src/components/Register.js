import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import OfficeIcon from "../assets/office-computer-table.svg";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  const auth = getAuth(); // Initialize auth globally

  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when registration starts

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      setSuccessMessage("Registration successful! Please check your email to verify your account.");
      await signOut(auth); // Sign out the user after sending the verification email
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please login or use a different email.");
      } else {
        setError(error.message);
      }
      console.error("Error during registration", error);
    } finally {
      setLoading(false); // Set loading to false after registration is complete
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
    <div className="min-h-screen max-w-screen-lg bg-white grid grid-cols-[auto,1fr] justify-items-center mx-auto items-center pb-32">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-10 items-left min-w-[26rem] max-w-full ml-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Create an Account</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        
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
            required
          />
        </div>
        
        <div className="mb-4 flex flex-row items-center min-w-full py-3 border-b-2 border-gray-400">
          <span className="pr-2">
            <MdEmail />
          </span>
          <motion.input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-2"
            required
          />
        </div>

        <div className="mb-4 flex flex-row gap-2 items-center py-3 min-w-full border-b-2 border-gray-400">
          <span>
            <RiLockPasswordFill />
          </span>
          <motion.input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-2"
            required
          />
        </div>

        <div className="mb-8 flex flex-row items-center py-3 gap-2 min-w-full border-b-2 border-gray-400 w-full">
          <span className="pr-2">
            <RiLockPasswordLine />
          </span>
          <motion.input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-2"
            required
          />
        </div>

        <div className="min-w-full flex gap-4 flex-row mb-14">
          <motion.input type="checkbox" className="" />
          <p className="min-w-full text-xs">
            I agree to all statements in <Link to="/settings" className="underline hover:text-slate-400">Terms of Service</Link>
          </p>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg font-semibold"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Creating account..." : "Register"}
        </motion.button>

        {/* Google Register Button */}
        <motion.button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full mt-6 bg-slate-100 text-black p-4 rounded-lg hover:bg-gray-200 transition-colors duration-150 shadow-lg flex items-center justify-center font-semibold"
          disabled={loading} // Disable button when loading
        >
          Register with Google
        </motion.button>
      </motion.form>

      <div className="flex flex-col justify-items-center gap-4 align-center text-center hidden sm:block">
        <img alt="OfficeIcon" src={OfficeIcon} className="mb-6" />
        <p><Link to="/login" className="underline hover:text-slate-400">I am already a member</Link></p>
      </div>
    </div>
  );
}

