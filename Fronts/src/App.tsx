import Login from "./Pages/LoginPage.tsx";
import Register from "./Pages/SignupPage.tsx";
import Welcome from "./Pages/WelcomePage.tsx";
import Header from "./components/Shared/Header.tsx";
import Footer from "./components/Shared/Footer.tsx";
import AdminDashboard from "./Pages/AdminDash.tsx";
import bgImage from "./assets/bg.jpeg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen"
        style={{ backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",}}>
          <Header />

          <main className="flex-grow mt-16">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
