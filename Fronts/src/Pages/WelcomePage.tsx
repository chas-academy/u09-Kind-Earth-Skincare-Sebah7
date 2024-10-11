import { useNavigate } from "react-router-dom";
import Category from "../components/Welcome/Categories";
import Hero from "../components/Welcome/Hero";

const Welcome = () => {
  
  const navigate = useNavigate();

  const handleViewAll = (type: "categories" | "criteria" | "skinTypes" | "skinConcerns") => {
    navigate("/products", { state: { filterType: type } });
  };

  return (
    <>
    <Hero />

<div>
    <Category title="Search by catergory" type="categories" onViewAll={() => handleViewAll("categories")}/>

    <Category title="Search by criteria" type="criteria" onViewAll={() => handleViewAll("criteria")}/>

    <Category title="Search by skin types" type="skinTypes" onViewAll={() => handleViewAll("skinTypes")}/>

    <Category title="Search by skin concerns" type="skinConcerns" onViewAll={() => handleViewAll("skinConcerns")}/>
</div>

    </>
);
  };

export default Welcome;
