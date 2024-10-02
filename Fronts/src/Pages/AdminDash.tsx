import ProductForm from '../components/Admin/ProductForm'; // Adjust the path as needed

const AdminDashboard = () => {
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
