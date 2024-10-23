import React, { useState } from "react";
import InputField from "../components/Shared/InputField";
import Button from "../components/Shared/Button";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const [signupStatus, setSignupStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
       
    // console.log("Form Data being sent:", formData);

    fetch("https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/users/register", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
    .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSignupStatus("success");
          window.alert("Signup Failed. Try again.");
          console.log(signupStatus);
        } else {
          setSignupStatus("error");
          window.alert("Woho, you are signed up & redirected to login!");
          navigate("/");
        }
  console.log("from DB:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Signup Failed. Try again.");
      });
  };

  const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};

  return (
    <div className=" flex flex-col md:flex-row rounded-lg border-solid border-clayAsh px-1 py-1">
      <div
        className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md px-2 bg-glass backdrop-blur-glass`}
      >
        <div className="w-full max-w-xs">
          <div className="relative h-3/4 flex flex-col items-center">
            <div className={`text-5xl font-bold text-formPrimaryText mt-12`}>
              Register{" "}
            </div>

            <p className="text-base font-bold text-formSecondaryText mb-4">
              Please enter details to create account.
            </p>

            <form className="w-full px-1 py-2 mb-3" onSubmit={handleSubmit}>
              <InputField
                label="First Name"
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <InputField
                label="Email Address:"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                autoComplete="off" 
              />
              <div className="relative">
              <InputField
                label="Password:"
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                autoComplete="off" 
              />
              <button
    type="button"
    onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent border-transparent"
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
  </div>
  <div className="relative">
              <InputField
                label="Confirm Password:"
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
              <button
    type="button"
    onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent border-transparent"
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
  </div>
              <InputField
                label="Date of birth:"
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Date of birth"
              />

              <div className="flex items-center gap-3 mb-9">
              <input
                type="checkbox"
                id="privacy"
                className="w-4 h-4 bg-formSecondaryText"
                checked={checked}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="text-base font-normal">
                Privacy Policy
              </label>
            </div>

            <div className="w-1/3 mb-8">
              <Button text="Register" type="submit" />
            </div>

            </form>


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
