
import './App.css'
import Login from './Login'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Dashboard from './Dashboard'
import Completed from './Completed'
import Pending from './Pending'
function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </>
  )
}

export default App
