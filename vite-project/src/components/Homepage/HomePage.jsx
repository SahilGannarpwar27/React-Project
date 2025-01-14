import { Outlet, useNavigate } from 'react-router'

import Header from './Header'
import Sidebar from './Sidebar'
import { useEffect } from 'react'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/homepage/dashboard')
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Header at the top */}
      <Header />
      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main style={{ backgroundColor: '#f0f8f8' }} className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default HomePage
