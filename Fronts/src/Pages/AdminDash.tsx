import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/Dashboard/Admin/ProductForm';
import { useEffect } from 'react';

const AdminDashboard = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role !== 0) {
        navigate('/not-authorized');
      }
    }
      else {
      navigate('/login');
    }
  }, [navigate])
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="product-management">
        <h2>Create New Product</h2>
        <ProductForm />
      </div>
      {/* Add more admin functionalities like product list, update, delete, etc. */}
    </div>
  );
};

export default AdminDashboard;
