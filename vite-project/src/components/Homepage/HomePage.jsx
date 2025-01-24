import { Outlet} from 'react-router'

import Header from './Header'
import Sidebar from './Sidebar'


const HomePage = () => {
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
