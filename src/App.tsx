
import './App.css'
import Login from './Login'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Dashboard from './Dashboard'
import Completed from './Completed'
import Pending from './Pending'
import { RegisterContext } from './RegisterContext'
import { useContext } from 'react'
function App() {
  const [isRegistered] = useContext(RegisterContext)!;
  return (
    <>
      <Routes>
        <Route path="/login" element={isRegistered ? <Dashboard /> : <Login />} />
        <Route path="/register" element={isRegistered ? <Dashboard /> : <Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </>
  )
}

export default App
