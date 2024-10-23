import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerticalTabs from "../components/Dashboard/Tab/TabVertical";
import ManageProfile from "../components/Dashboard/User/ManageProfile";
import ManageRoutines from "../components/Dashboard/User/ManageRoutine";

const UserDash = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      console.log('User data:', user);
      if (user.role !== 2) {
        console.log('User role is not 2, redirecting to not-authorized');
        navigate('/not-authorized');
      }
    }
      else {
      console.log('No user data found, redirecting to login');
      navigate('/login');
    }
  }, [navigate])

   const tabs = [
    { label: 'Manage Routines', content: < ManageRoutines/> },
    { label: 'Manage Account', content: <ManageProfile /> },
  ];

    return (
        <div>
            <h1>UserDash</h1>
            <VerticalTabs tabs={tabs} />
        </div>
    );
}

export default UserDash;