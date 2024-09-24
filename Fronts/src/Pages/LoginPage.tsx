import React, { useState } from "react";
import InputField from "../components/Auth/InputField";
import Button from "../components/Auth/Button";
import loginImage from "../assets/login.jpg";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login", { email, password });
  };

  return (
    <header className=" flex flex-col md:flex-row rounded-lg bg-clayAsh px-1 py-1">
      <div
        className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md bg-clayAsh px-2`}
      >
        <div className="w-full max-w-xs">
          <div className="relative h-3/4 flex flex-col items-center">
            <div className={`text-5xl font-bold text-formPrimaryText mt-12`}>
              Login
            </div>

            <p className="text-base font-bold text-formSecondaryText mb-4">
              Please enter your email and password.
            </p>

            <form className="w-full px-1 py-2 mb-3">
              <InputField
                label="Email Address:"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password:"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-3 mb-9">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 bg-formSecondaryText"
              />
              <label htmlFor="remember" className="text-base font-normal">
                Remember me
              </label>
            </div>

            <div className="w-1/3 mb-8">
              <Button text="Login" onClick={handleLogin} />
            </div>

            <div className="text-base font-bold text-formSecondaryText mb-12">
              New to Kind Earth Skincare?
              <Link
                to="/signup"
                className="text-base font-bold text-formSecondaryText underline"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 hidden md:flex">
        <img
          src={loginImage}
          alt=""
          className="object-cover w-full h-full rounded-r-md"
        />
      </div>
    </header>
  );
};

export default Login;
