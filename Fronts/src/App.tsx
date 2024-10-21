import Login from "./Pages/LoginPage.tsx";
import Register from "./Pages/SignupPage.tsx";
import Welcome from "./Pages/WelcomePage.tsx";
import Header from "./components/Shared/Header.tsx";
import Footer from "./components/Shared/Footer.tsx";
import AdminDashboard from "./Pages/AdminDash.tsx";
import ModDash from "./Pages/ModDash.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
import bgImage from "./assets/bg.jpeg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactPage from "./Pages/ContactPage.tsx";
import ProductsPage from "./Pages/ProductsPage.tsx";
import ProductDetail from "./Pages/ProductDetail.tsx";
import SearchResultsPage from "./components/Shared/SearchResult.tsx";
import QuizPage from "./Pages/QuizPage.tsx";
import ProtectedRoute from "./components/Dashboard/Routes/ProtectedRoute.tsx";
import UserDash from "./Pages/UserDash.tsx";
import Dashboard from "./Pages/Dashboard.tsx";

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
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} roles={0} />} />
              <Route path="/moderator" element={<ProtectedRoute element={<ModDash />} roles={1} />} />
              <Route path="/user" element={<ProtectedRoute element={<UserDash />} roles={2} />} />
              <Route path="/contact" element={<ContactPage />}/>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={< ProductsPage/>} />
              <Route path="/product/:id" element={<ProductDetail/>} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/quiz" element={< QuizPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
