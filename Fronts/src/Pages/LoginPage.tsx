import React, { useState } from 'react';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import loginImage from '../assets/login.jpg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login', { email, password });
  };

  return (
    <div className=" flex flex-col md:flex-row rounded-lg bg-[#055e2f] px-1 py-1">
    <div className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md bg-[#b8cdad] px-2`}>
    <div className="w-full max-w-xs">
    <div className="relative h-3/4 flex flex-col items-center">
      <div className={`text-5xl font-bold text-[#FFFFFF] mt-12`}>
        Login
      </div>

      <p className="text-base font-bold text-[#3a0b9882] mb-4">
        Please enter your email and password.
      </p>

<form className="w-full px-1 py-2 mb-3">
        <InputField label="Email Address:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Password:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
</form>

<div className="flex items-center gap-3 mb-9">
        <input type="checkbox" id="remember" className="w-4 h-4 bg-[#2c2c2c]" />
        <label htmlFor="remember" className="text-base font-normal">
          Remember me
        </label>
      </div>

      <div className="w-1/3 mb-8">
        <Button text="Login" onClick={handleLogin} />
      </div>

      <div className="text-base font-bold text-[#6f6d6d82] mb-12">
        New to Kind Earth Skincare? <a href="./SignupPage" className="text-base font-bold text-[#6f6d6d82] underline">CREATE ACCOUNT</a>
      </div>
    </div>
    </div>
    </div>

     <div className="flex-1 hidden md:flex">
    <img src={loginImage} alt="" 
    className="object-cover w-full h-full rounded-r-md"/>
  </div>

    </div>
  );
};

export default Login;
