import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Google from '../assets/Icons/google.svg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login logic
    if (email === "test@example.com" && password === "123456") {
      alert("Login successful!");
      if (remember) {
        localStorage.setItem("auth", JSON.stringify({ email }));
      }
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon...");
  };

  return (
    <div className=" flex items-center justify-center  px-4 py-6 bg-[#FFF8E6] ">
      <div className="bg-white p-8 rounded-2xl shadow-md w-[450px] px-14">
        <h2 className="text-3xl font-medium mb-6 font-poppins text-[#9B4E2B] ">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[15px] font-poppins text-[#414141] font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-[#D5D5D5] rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block  font-medium mb-1 text-[#414141] font-poppins text-[15px]">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-[#D5D5D5] rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#868686]">
              <input
                type="checkbox"
                className="mr-2 font-poppins text-[#868686] text-sm font-medium"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm font-poppins font-medium text-[#9B4E2B]">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#BA4A20] text-white py-2 rounded-lg font-poppins"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 flex items-center gap-2 font-poppins">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 font-poppins"
        >
          <img
            src={Google}
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4 font-poppins">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#BA4A20] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
