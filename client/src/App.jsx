import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './screens/Login'
// import Signup from './screens/Signup'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './screens/Dashboard'
import ReceiptsManagement from './screens/ReceiptsManagement'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      {/* <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipt" element={<ReceiptsManagement />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
