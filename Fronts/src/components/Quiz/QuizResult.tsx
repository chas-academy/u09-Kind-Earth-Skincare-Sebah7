import React, { useEffect } from "react";
import Button from "../Shared/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import axiosInstance from "../../utils/axiosInstance";

interface Product {
  name: string;
  category: string;
  _id: string;
};

interface RecommendationProps {
  mainConcern: string;
  products: Product[];
  onAddToRoutine: () => void;
}

const RecommendationComponent: React.FC<RecommendationProps> = ({ mainConcern, products, onAddToRoutine }) => {

const { user , loading} = useAuth();
const navigate = useNavigate();

useEffect(() => {
    const previousPage = localStorage.getItem("previousPage");
    if (previousPage && user) {
      localStorage.removeItem("previousPage");
      onAddToRoutine();
    }
  }, [user, onAddToRoutine]);


  const handleAddToRoutine = async (): Promise<void> => {
    
  if (!user) {
    localStorage.setItem("previousPage", window.location.pathname);
    navigate("/login");
    return;
  }
  const productIds = products.map(product => product._id);
  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("authToken"); 
  if (userData && token) {
      const user = JSON.parse(userData);
  try {
    await axiosInstance.post("/users/saveroutine", { productIds },
      { headers: 
        { Authorization: `Bearer ${user.token}`} 
      }
    );
    alert("Products added to routine!");
  } catch (error) {
    console.error("Error saving routine:", error);
    alert("Failed to add products to routine.");
  }
}
}

 if (loading) {
    return <PacmanLoader color="#91b553" />;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Suggested routine for main concern: 
        {mainConcern}</h2>
      <ul className="space-y-4">
        {products.map((product, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <span>{product.category}: {product.name}</span>
          </li>
        ))}
      </ul>

    <div className="text-nowrap w-1/2">
      < Button  
      onClick={handleAddToRoutine} 
      type="button" 
      text="Add to routine"
      />
</div>
    </div>
  );
};

export default RecommendationComponent;