import React from "react";
import Button from "../Shared/Button";

interface Product {
  name: string;
  category: string;
}

interface RecommendationProps {
  mainConcern: string;
  products: Product[];
  onAddToRoutine: () => void;
}

const RecommendationComponent: React.FC<RecommendationProps> = ({ mainConcern, products, onAddToRoutine }) => {

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
      < Button  onClick={onAddToRoutine} 
      type="button" 
      text="Add to routine"
      />
</div>
    </div>
  );
};

export default RecommendationComponent;
