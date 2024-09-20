import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-spruce rounded flex flex-grow flex-col relative justify-center text-center py-4 mt-4">
      <div className="text-primaryText flex flex-shrink-0 justify-evenly text-left">
        <div className="flex flex-col text-[15px] leading-[1.4] underline">
          <span>
            <p>Our Story</p>
            <p>Our Resources</p>
            <p>Contact Us</p>
            <p>My Page</p>
          </span>
        </div>

        <div className="flex flex-col text-[15px] leading-[1.4] underline">
          {/* <span>
            <p>Our Story</p>
            <p>Our Resources</p>
            <p>Contact Us</p>
            <p>My Page</p>
          </span> */}
        </div>
      </div>

      <div className="text-formSecondaryText flex items-center justify-center gap-x-4 my-4">
        <FaLinkedin className="h-7 w-7 flex-shrink-0" />
        <FaXTwitter className="h-7 w-7 flex-shrink-0" />
        <FaInstagram className="h-7 w-7 flex-shrink-0" />
        <FaYoutube className="h-7 w-7 flex-shrink-0" />
      </div>

      <div className="w-full flex justify-center my-2">
        <div className="w-3/6 h-0.5 bg-primaryText"></div>
      </div>

      <div className="text-primaryText flex items-center justify-center max-h-[22px] leading-[1.4]">
        <p className="text-[10px] leading-[1.4]">
          <span className="text-[15px] mr-1">©</span> 2024 Kind Earth Skincare:
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
