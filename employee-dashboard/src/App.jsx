import React from 'react'
import Navbar from './components/Navbar'
import EmployeeDashboard from './pages/EmployeeDashboard'


const App = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <EmployeeDashboard />
    </div>
  )
}

export default App
