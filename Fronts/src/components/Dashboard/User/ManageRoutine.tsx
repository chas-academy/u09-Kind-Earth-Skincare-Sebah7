import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../Shared/Button";

interface Product {
  productId: string;
  productName: string;
  reason: string;
}

interface Routine {
  _id: string;
  name: string;
  products: string[];
  result: {
    recommendedProducts: Product[];
  };
}

const ManageRoutines: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
       const fetchRoutines = async () => {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("authToken"); 
      if (userData && token) {
         try {
        const { data } = await axiosInstance.get(`routine/getRoutines`);
        setRoutines(data.routines);
      } catch (error) {
        console.error("Error fetching routines", error);
      }
       }
      };

    fetchRoutines();
  }, []);

  const deleteRoutine = async (routineId: string) => {
    try {
      await axiosInstance.delete(`/routine/${routineId}/delete`);
      setRoutines(routines.filter((routine) => routine._id !== routineId));
      alert("Routine deleted successfully");
    } catch (error) {
      console.error("Error deleting routine", error);
    }
  };

  return (
    <div>
      <h2>My Routines</h2>
      <ul>
        {routines.map((routine) => (
          <li key={routine._id}>
            <strong>The {routine.name} routine</strong>
            <ul>
              {routine.result.recommendedProducts.map((product) => (
                <li key={product.productId}>
                  {product.productName} - {product.reason}
                </li>
              ))}
            </ul>
            <Button onClick={() => deleteRoutine(routine._id)} text="Delete Routine" type="submit"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoutines;
