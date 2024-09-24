import heroImage from '../../assets/hero.jpg';
import Button from '../Auth/Button';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Shared/SearchBar';

const Hero = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('../../Pages/QuizPage');
  };

  return (
    <div>
      <section
        className="relative w-screen h-screen text-white flex items-center justify-normal -mt-2 top-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex:10
        }}
      >

        {/* Search Area */}
<div className='absolute top-10 left-1/2 transform -translate-x-1/2 w-3/4 z-[3]'>
  <SearchBar />
</div>

        {/* Text and Button Overlay */}
        <div className="absolute z-[2] text-left text-primaryText p-6">
          <div className="text-[40px] leading-normal mb-6">
            <p>
              <span className="font-bold">Kind </span> Humans
            </p>
            <p>
              Clean <span className="font-bold">Earth</span>
            </p>
            <p>
              <span className="font-bold">Skincare </span> solutions
            </p>
          </div>
          
          <Button text="Build your routine!" onClick={handleButtonClick}/>

        </div>
      </section>
    </div>
  );
};

export default Hero;
