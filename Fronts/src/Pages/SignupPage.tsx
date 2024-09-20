import React, { useState } from "react";
import InputField from "../components/Auth/InputField";
import Button from "../components/Auth/Button";
import loginImage from "../assets/login.jpg";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  const handleRegister = () => {
    // Handle registration logic
    console.log("Register", {
      firstName,
      email,
      password,
      confirmPassword,
      dob,
    });
  };

  return (
    <div className=" flex flex-col md:flex-row rounded-lg bg-[#055e2f] px-1 py-1">
      <div
        className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md bg-formColor px-2`}
      >
        <div className="w-full max-w-xs">
          <div className="relative h-3/4 flex flex-col items-center">
            <div className={`text-5xl font-bold text-formPrimaryText mt-12`}>
              Register{" "}
            </div>

            <p className="text-base font-bold text-formSecondaryText mb-4">
              Please enter details to create account.
            </p>

            <form className="w-full px-1 py-2 mb-3">
              <InputField
                label="First Name"
                type="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
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
              <InputField
                label="Confirm Password:"
                type="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputField
                label="Date of birth:"
                type="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-3 mb-9">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 bg-formSecondaryText"
              />
              <label htmlFor="remember" className="text-base font-normal">
                Privacy Policy
              </label>
            </div>

            <div className="w-1/3 mb-8">
              <Button text="Register" onClick={handleRegister} />
            </div>

            <div className="text-base font-bold text-formSecondaryText mb-12">
              Already a User?
              <Link
                to="/login"
                className="text-base font-bold text-formSecondaryText underline"
              >
                LOGIN HERE
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
    </div>
  );
};

export default Register;
