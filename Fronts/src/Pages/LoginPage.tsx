import React, { useState } from "react";
import InputField from "../components/Shared/InputField";
import Button from "../components/Shared/Button";
import loginImage from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

 const [formData, setFormData] = useState ({
  email: "",
  password: "",
 });

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
         
     fetch(
      "https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        
      })
      .then((data) => {
              console.log("Response data:", data);
        if (data.error) {
          console.error("Login error:", data.error);
          return;
        }
        const { user, token } = data;
        if (user && user._id && token) {
           console.log("User role Backs:", user.role);
          localStorage.setItem("authToken", token);
          localStorage.setItem("userData", JSON.stringify(user));
          


          const previousPage = localStorage.getItem('previousPage');
          if (previousPage) {
            localStorage.removeItem('previousPage');
            navigate(previousPage);
          } else {
            navigate("/dashboard");
          }
        } else {
          console.error("User ID or token is undefined in the response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};

  return (
    <header className=" flex flex-col md:flex-row rounded-lg border-solid border-clayAsh px-1 py-1">
      <div
        className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md px-2 bg-glass backdrop-blur-glass`}
      >
        <div className="w-full max-w-xs">
          <div className="relative h-3/4 flex flex-col items-center">
            <div className={`text-5xl font-bold text-formPrimaryText mt-12`}>
              Login
            </div>

            <p className="text-base font-bold text-formSecondaryText mb-4">
              Please enter your email and password.
            </p>

            <form className="w-full px-1 py-2 mb-3" onSubmit={handleSubmit}>
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
      <div className="flex items-center gap-3 mb-9">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 bg-formSecondaryText"
                checked={checked}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="text-base font-normal">
                Remember me
              </label>
            </div>

            <div 
            className="w-1/3 mb-8"
            >
              <Button text="Login" type="submit"/>
            </div>
            </form>

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
