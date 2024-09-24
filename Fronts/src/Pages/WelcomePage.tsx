import Category from "../components/Welcome/Categories";
import Hero from "../components/Welcome/Hero";

const Welcome = () => {
  
  return (
    <>
    <Hero />

<div className="bg-clayAsh">
    <Category title="Search by catergory"/>

    <Category title="Search by criteria"/>
</div>
    </>
);
  };

export default Welcome;
