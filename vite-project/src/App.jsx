import { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router'

import ResetPassword from './components/Auth/ResetPassword'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

import Shimmer from './common/Shimmer'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { PATH_ADDNEWCOURSE, PATH_COURSEDETAILS, PATH_COURSES, PATH_DASHBOARD, PATH_LOGIN,PATH_RESETPASSWORD, PATH_SIGNUP, PATH_USERMANAGEMENT } from './constants/RouteConstants'

import './App.css'
import Dashboard from './components/Homepage/Dashboard'
import Courses from './components/Homepage/Courses/Courses'
import UserManagement from './components/Homepage/UserManagement'
import AddNewCourse from './components/Homepage/Courses/AddNewCourse'
import NotFound from './common/NotFound'
import CourseDetails from './components/Homepage/Courses/CourseDetails/CourseDetails'

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
            <Route path={PATH_DASHBOARD} element={<Dashboard />} />
            <Route path={PATH_COURSES} element={<Courses />} />
            <Route path={PATH_ADDNEWCOURSE} element={<AddNewCourse />} />
            <Route path={PATH_COURSEDETAILS} element={<CourseDetails />} />
            <Route path={PATH_USERMANAGEMENT} element={<UserManagement />} />
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
