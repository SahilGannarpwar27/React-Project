
import { useEffect } from 'react'

import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import DropDown2 from './DropDown2'
import NewModal from '../Module/NewModal'
import { IconPack } from '../../../../constants/IconPack.js'
import { Strings } from '../../../../constants/Strings'
import {setIsEditMode, setShowModal } from '../../../../Redux/Slice/CoursesSlice'


const CourseDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showModalType = useSelector((state) => state.courses.showModalType)
  const course = useSelector((state) => state.courses.currentCourse)

  //Navigate back to coursesList
  const handleBack = () => {
    navigate('/courses', { replace: false })
  }

  //Opens modal to delete the course
  const handleDelete = () => {
    dispatch(setShowModal('deleteCourse'))
  }

  //Navigate to edit course
  const handleEditCourse = () => {
    dispatch(setIsEditMode())
    navigate('/courses/add-new-course', { replace: false })
  }

  useEffect(() => {
    if (!course) {
      navigate('/courses')
    }
  }, [course, navigate])

  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings.courseDetails}</h1>
        <div>
          <button className="btn-secondary" onClick={handleBack}>{Strings.back}</button>
        </div>
      </div>
      {/* Course Details Section */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <span className='btn-draft'>Draft</span>
          <div className='flex space-x-2'>
            <img className='size-6 p-1 border border-gray-400 cursor-pointer hover:bg-gray-300' src={IconPack.editBlack} alt="editCourse" onClick={handleEditCourse} />
            <img className='size-6 p-1 border border-gray-400 cursor-pointer hover:bg-gray-300' onClick={handleDelete} src={IconPack.deleteRed} alt="deleteCourse" />
          </div>
        </div>
        <div className='flex justify-between'>
          <label htmlFor="title">
            Title
            <p id='title'>{course?.course_title}</p>
          </label>
          <label htmlFor="title">
            Type
            <p id='status'>{course?.status}</p>
          </label>
          <label htmlFor="title">
            Category
            <p id='category'>{course?.category}</p>
          </label>
        </div>
      </div>

      {/* Third Div */}

      <div className="bg-white p-4 mt-2">
        <ul className='flex space-x-4' >
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
