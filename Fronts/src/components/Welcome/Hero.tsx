import Button from '../Shared/Button';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Shared/SearchBar';
import {motion} from 'framer-motion';
import logoImage from '../../assets/logo.png';

const Hero: React.FC = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/quiz');
  };

  return (
    <>
      <section
        className="w-full h-screen text-white overflow-x-hidden"
        >

{/* Search Area */}
<div 
className='relative top-15 left-1/2 transform -translate-x-1/2 w-3/4 z-[3]'>
  <SearchBar />
</div>

<motion.div
        className="mt-2 flex flex-col items-center justify-center"
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }} 
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <img src={logoImage} className='w-full max-h-[60vh] object-contain' alt="Logo" />
        <h1 className="text-center text-3xl mt-4">
          Kind Humans, Clean Earth, Skincare solutions!
        </h1>
        {/*Button*/}
        <div className="flex justify-center">
          <Button text="Build a routine!" onClick={handleButtonClick}/>

        </div>
      </motion.div>

      </section>
      
    </>
  );
};

export default Hero;
