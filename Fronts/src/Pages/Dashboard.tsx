import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PacmanLoader } from "react-spinners";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
  return <PacmanLoader color="#91b553" />;
}

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (Number(user.role)) {
    case 0:
      return <Navigate to="/admin" />;
    case 1:
      return <Navigate to="/moderator" />;
    default:
      return <Navigate to="/user" />;
  }

  
};

export default Dashboard;
