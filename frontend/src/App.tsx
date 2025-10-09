import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
