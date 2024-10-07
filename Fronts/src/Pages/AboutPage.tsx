import React from 'react';
import Header from '../components/Shared/Header';  // Assuming these components exist.
import SearchBar from '../components/Shared/SearchBar';
import AboutSection from '../components/About/AboutSection';
import aboutImage from '../assets/about.jpg';
import crueltyfreeImage from '../assets/crueltyfree.jpg';


const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <Header />
      <SearchBar />

    <img src={aboutImage} alt="A person on a spa with cucumber on thier face" 
           className="w-full max-h-[90vh] object-cover box-border px-4 pt-6" 
/>
      <div className="w-full max-w-screen-lg mx-auto px-4 pb-6">
        {/* About Kind Earth Skincare Section */}
        <AboutSection
          title="About Kind Earth Skincare"
          sections={[
            {
              content: `We in Kind Earth Skin Care, believe that caring for your skin should be a joyful and guilt-free experience! In a world overflowing with skincare options, we understand how overwhelming it can be to find products that are not only effective but also align with your values. 

              At Kind Earth Skin Care, our mission is to simplify your skincare journey by providing personalized routines featuring natural, cruelty-free products that are good for both your skin and the planet. We are committed to transparency, sustainability, and integrity, ensuring that every product you discover is BDS-approved and ethically sourced.

              Our unique *Find Routine* feature allows you to take a personalized quiz that assesses your skin's needs and your skincare preferences. Based on your responses, we match you with the ideal routine tailored just for you. Whether you're a skincare novice or a seasoned enthusiast, you can save your routine, explore our curated product listings, and even create your own customized regimen.

              Join us on this journey to nurture your skin with kindness—because beauty shouldn't come at the cost of our planet or our values. Together, we can embrace a more sustainable, mindful approach to skincare.`,
            },
          ]}
        />

        {/* About Our Criteria Section */}
        <AboutSection
          title="About Our Criteria"
          sections={[
            {
              content: "Cruelty-free because word word word...",
              image: crueltyfreeImage,
            },
            {
              content: "Cruelty-free because word word word...",
              image: crueltyfreeImage,
            },
            {
              content: "Cruelty-free because word word word...",
              image: crueltyfreeImage,
            },
          ]}
        />

        {/* About Our Resources Section */}
        <AboutSection
          title="About Our Resources"
          sections={[
            {
              content: "We are words words words...",
              image: null,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AboutPage;
