import { useState } from "react";
import InputField from "../components/Shared/InputField";
import Button from "../components/Shared/Button";
import doveImage from "../assets/dove.jpg";
import axios from "axios";

const ContactPage: React.FC = () => { 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [contactData, setContactData] = useState({
    first_name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === "email") {
      setError('');
    }

    setContactData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   console.log("Submit button clicked", contactData);

if (!validateEmail(contactData.email)) {
      setError('Please enter a valid email address.');
      return; 
    }

    setError('');
    setSuccess('');

   try {
      const response = await axios.post('https://u09-kind-earth-skincare-sebah7-4.onrender.com/api/contact/contact', contactData, {
        headers: {
      'Content-Type': 'application/json'
   },
  });
      console.log(response);
      setSuccess('Your message was sent successfully!');
      setError('');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      resetForm();
          } catch(error) {
        console.error('Error submitting contact form:', error);
        setError('Failed to send your message. Please try again.');
        setSuccess('');
        setTimeout(() => {
        setSuccess('');
      }, 3000);
  }};
    
  const resetForm = () => {
    setContactData({
      first_name: '',
      email: '',
      message: '',
    });
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

      {/* Success or Error Message */}
              {success && <div className="text-green-600">{success}</div>}
              {error && <div className="text-red-600">{error}</div>}

      <InputField
        type="text"
        value={contactData.first_name}
        id="first_name"
        onChange={handleInputChange}
        placeholder="Your Name"
        autoComplete="name"
      />

      <InputField
        type="email"
        value={contactData.email}
        id="email"
        onChange={handleInputChange}
        placeholder="Your Email"
        autoComplete="email"
      />

      <InputField
        type="text"
        value={contactData.message}
        id="message"
        onChange={handleInputChange}
        placeholder="Your Message"
        isTextArea={true} 
        />

      <Button text="Submit" type="submit"/>

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