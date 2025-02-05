import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import DropDown2 from './DropDown2'
import NewModal from '../Module/NewModal'
import { Strings } from '../../../../constants/Strings'
import CourseDetailsSection from './CourseDetailsSection.jsx'
import ButtonField from '../../../../common/ButtonField.jsx'

const CourseDetails = () => {
  const navigate = useNavigate()
  const { isEditMode, showModalType, currentCourse } = useSelector((state) => state.courses)
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
          <ButtonField onClickFunction={handleBack} buttonStyle="btn-secondary" strings={Strings.back} />
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
          {/* <DropDown /> */}
          <DropDown2 />
        </div>
      </div>
      {showModalType !== '' && <NewModal />}
    </div>
  )
}

export default CourseDetails
