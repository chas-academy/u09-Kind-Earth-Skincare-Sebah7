// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Search from './components/Shared/SearchBar.tsx'
import Login from './Pages/LoginPage.tsx'
import Register from './Pages/SignupPage.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
 <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
