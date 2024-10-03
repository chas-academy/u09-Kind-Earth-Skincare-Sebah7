import { useState } from "react";
import InputField from "../components/Auth/InputField";
import Button from "../components/Auth/Button";
import doveImage from "../assets/dove.jpg";

const ContactPage: React.FC = () => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, email, message);
  };

  return (
<div className=" flex flex-col md:flex-row rounded-lg border-solid border-clayAsh px-1 py-1">
      <div
        className={`flex-1 flex flex-grow flex-col items-center gap-y-3 rounded-l-md px-2`}>
        <div className="w-full max-w-xs">
          <div className="relative h-3/4 flex flex-col items-center">
    <div className={`text-5xl font-bold text-formPrimaryText mt-12`}>
              Contact Us
            </div>

    <form onSubmit={handleSubmit} className="w-full px-1 py-2 mb-3">
      <InputField
        type="text"
        value={name}
        id="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        autoComplete="name"
      />

      <InputField
        type="email"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoComplete="email"
      />

      <InputField
        type="text"
        value={message}
        id="message"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
        isTextArea={true} 
        />

<div className="w-1/3 mb-8">
      <Button text="Submit" />
      </div>


    </form>
</div>
</div>
</div>
<div className="flex-1 hidden md:flex">
        <img
          src={doveImage}
          alt=""
          className="object-cover w-full h-full rounded-r-md"
        />
      </div>

    </div>
  );

};

export default ContactPage;