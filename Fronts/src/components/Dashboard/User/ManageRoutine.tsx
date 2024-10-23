import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

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
  // const [newRoutineName, setNewRoutineName] = useState("");

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

  // const deleteRoutine = async (routineId: string) => {
  //   try {
  //     await axiosInstance.delete(`/routines/${routineId}`);
  //     setRoutines(routines.filter((routine) => routine._id !== routineId));
  //   } catch (error) {
  //     console.error("Error deleting routine", error);
  //   }
  // };

  // const renameRoutine = async (routineId: string) => {
  //   try {
  //     await axios.put(`/api/routines/${routineId}`, { newName: newRoutineName });
  //     setRoutines(
  //       routines.map((routine) =>
  //         routine._id === routineId ? { ...routine, name: newRoutineName } : routine
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error renaming routine", error);
  //   }
  // };

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
            {/* <button onClick={() => deleteRoutine(routine._id)}>Delete</button> */}
            {/* <input
              type="text"
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
              placeholder="New routine name"
            /> */}
            {/* <button onClick={() => renameRoutine(routine._id)}>Rename</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoutines;
