import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/Dashboard/Admin/ProductForm';
import { useEffect } from 'react';
import VerticalTabs from '../components/Dashboard/Tab/TabVertical';
import UpdateProductForm from '../components/Dashboard/Admin/UpdateProduct';
import DeleteProductForm from '../components/Dashboard/Admin/DeletedProductForm';
import AdminUserManagement from '../components/Dashboard/Admin/RolesManegment';

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

const onUpdate = () => {
    console.log('Product updated successfully');
    };

  const tabs = [
    { label: 'Create Product', content: <ProductForm /> },
    { label: 'Update Product', content: <UpdateProductForm onUpdate={onUpdate} /> },
    { label: 'Delete Product', content: < DeleteProductForm/> },
    { label: 'User Roles', content: <AdminUserManagement /> },
  ];
  
  return (
    <div>
      <h1>Admin Dashboard</h1>            
            <VerticalTabs tabs={tabs} />
    </div>
  );
};

export default AdminDashboard;
