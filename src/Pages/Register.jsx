import React, { useState } from "react";
import { Link } from "react-router-dom";
import Google from '../assets/Icons/google.svg';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();
    //  Your register logic here
    console.log({ name, email, password, agree });
    alert("Signin successfully!");
  };

  const handleGoogleRegister = () => {
    //  Google signup logic
    console.log("Google Signup");
  };

  return (
    <div className=" flex items-center justify-center  px-4 py-4 bg-[#FFF8E6]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[480px] px-14">
        <h2 className="text-3xl font-medium mb-6 font-poppins text-[#9B4E2B]">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[15px] font-poppins text-[#414141] font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-[#D5D5D5] rounded-md outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[15px] font-poppins text-[#414141] font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-[#D5D5D5] rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#414141] font-poppins text-[15px]">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-[#D5D5D5] rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <label className="flex items-center text-sm text-[#868686]">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree to the <span className="text-[#9B4E2B] ml-1">Terms & Conditions</span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#BA4A20] text-white py-2 rounded-lg font-poppins"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 flex items-center gap-2 font-poppins">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 font-poppins"
        >
          <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4 font-poppins">
          Already have an account?{" "}
          <Link to="/login" className="text-[#BA4A20] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
