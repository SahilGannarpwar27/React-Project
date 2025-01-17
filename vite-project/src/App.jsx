import { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router'

import ResetPassword from './components/Auth/ResetPassword'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

import Shimmer from './common/Shimmer'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { PATH_LOGIN,PATH_RESETPASSWORD, PATH_SIGNUP } from './constants/RouteConstants'

import './App.css'
import Dashboard from './components/Homepage/Dashboard'
import Courses from './components/Homepage/Courses/Courses'
import UserManagement from './components/Homepage/UserManagement'
import AddNewCourse from './components/Homepage/Courses/AddNewCourse'
import NotFound from './common/NotFound'

function App() {
  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    const bgImage = new Image()
    bgImage.src = '/Skillsync-img/authBackground.svg'
    bgImage.onload = () => {
      setIsloaded(true)
    }
  }, [])

  return (
    <>
      {!isLoaded ? (
        <Shimmer />
      ) : (
        <Routes>
          <Route index element={<SignIn />} />
          <Route path={PATH_LOGIN} element={<SignIn />} />
          <Route path={PATH_RESETPASSWORD} element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/add-new-course" element={<AddNewCourse />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path={PATH_SIGNUP} element={<SignUp />} />
        </Routes>
      )}
      <Toaster />
    </>
  )
}

export default App
