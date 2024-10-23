import React from 'react';

interface SectionItem {
  image?: string | null;
  content: React.ReactNode;
}

interface AboutSectionProps {
  title: string;
  sections: SectionItem[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, sections }) => {
  return (
    <div className="my-6 p-2">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

{sections.map((section, index) => (
        <div key={index} className="flex items-center mb-4">
          {section.image && (
            <div className="mr-4">
              <img
                src={section.image}
                alt={`Image ${index + 1}`}
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
          )}
          <p className=" text-pink-950 text-xl">{section.content}</p>
        </div>
      ))}
 <div className="w-11/12 h-0.5 bg-primaryText"></div>
    </div>
  );
};

export default AboutSection;
