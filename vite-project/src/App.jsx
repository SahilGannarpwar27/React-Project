import { Route, Routes } from 'react-router'

import ResetPassword from './components/ResetPassword'
import SignIn from './components/SignIn'

import './App.css'



function App() {


  return (
    <div className=" overflow-hidden w-full max-h-screen bg-cover bg-center bg-no-repeat bg-[url('/Skillsync-img/authBackground.svg')]">
      <img className="pl-6 pt-3" src="/Skillsync-img/logo.svg" alt="logo" />
      <div className="flex flex-col justify-center min-h-screen">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
