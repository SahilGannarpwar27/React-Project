import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import DropDown2 from './DropDown2'
import CourseDetailsSection from './CourseDetailsSection.jsx'
import { Strings } from '../../../../constants/Strings'

const CourseDetails = () => {
  const navigate = useNavigate()
  const { isEditMode, currentCourse } = useSelector((state) => state.courses)
  console.log(isEditMode)

  //Navigate back to coursesList
  const handleBack = () => {
    navigate('/courses', { replace: false })
  }

  useEffect(() => {
    if (!currentCourse) {
      navigate('/courses')
    }
  }, [currentCourse, navigate])

  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings.courseDetails}</h1>
        <div>
          <button onClick={handleBack} className="btn-secondary">
            {Strings.back}
          </button>
        </div>
      </div>
      {/* Course Details Section */}
      <CourseDetailsSection />

      {/* Third Div */}

      <div className="bg-white p-4 mt-2">
        <ul className="flex space-x-4">
          <li>Details</li>
          <li>Assignees</li>
        </ul>
        <div className="flex flex-1 pt-4">
          <DropDown2 />
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
