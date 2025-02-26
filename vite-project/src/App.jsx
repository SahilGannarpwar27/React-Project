import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import { Toaster } from 'react-hot-toast'
// import { Chart as Chartjs } from 'chart.js/auto'
// import { Bar, Doughnut, Line } from 'react-chartjs-2'

import './App.css'
import Shimmer from './common/Shimmer'
import NotFound from './common/NotFound'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './components/Auth/ResetPassword'
import Dashboard from './components/Homepage/Dashboard'
import Courses from './components/Homepage/Courses/Courses'
import UserManagement from './components/Homepage/UserManagementSection.jsx/UserManagement'
import AddNewCourse from './components/Homepage/Courses/AddNewCourse/AddNewCourse'
import CourseDetails from './components/Homepage/Courses/CourseDetails/CourseDetails'
import { PATH_ADDNEWCOURSE, PATH_COURSEDETAILS, PATH_COURSES, PATH_DASHBOARD, PATH_LOGIN,PATH_RESETPASSWORD, PATH_SIGNUP, PATH_USERMANAGEMENT } from './constants/RouteConstants'

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
