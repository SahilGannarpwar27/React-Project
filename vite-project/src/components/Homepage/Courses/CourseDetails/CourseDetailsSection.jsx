import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { IconPack } from '../../../../constants/IconPack'
import { setIsEditMode } from '../../../../Redux/Slice/CoursesSlice'
import { useState } from 'react'
import DeleteModals from '../../../../common/DeleteModals'

const CourseDetailsSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { currentCourse } = useSelector((state) => state?.courses)

  //Opens modal to delete the course
  const handleDelete = () => {
    setShowModal((prev)=> !prev)
    // dispatch(setShowModal('deleteCourse'))
  }

  //Navigate to edit course
  const handleEditCourse = () => {
    dispatch(setIsEditMode())
    navigate('/courses/add-new-course', { replace: false })
  }
  return (
    <div className="bg-white p-4">
      <div className=" flex justify-between items-center mb-4">
        <span
          className={
            currentCourse?.status === 'Draft'
              ? 'btn-draft'
              : currentCourse?.status === 'Active'
                ? 'btn-active'
                : 'btn-Inactive'
          }
        >
          {currentCourse?.status}
        </span>
        <div className="flex space-x-2">
          <img
            className="size-6 p-1 border border-gray-400 cursor-pointer hover:bg-gray-300"
            src={IconPack.editBlack}
            alt="editCourse"
            onClick={handleEditCourse}
          />
          <img
            className="size-6 p-1 border border-gray-400 cursor-pointer hover:bg-gray-300"
            onClick={handleDelete}
            src={IconPack.deleteRed}
            alt="deleteCourse"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <label htmlFor="title">
          Title
          <p id="title">{currentCourse?.course_title}</p>
        </label>
        <label htmlFor="title">
          Type
          <p id="status">{currentCourse?.status}</p>
        </label>
        <label htmlFor="title">
          Category
          <p id="category">{currentCourse?.category}</p>
        </label>
      </div>
      {showModal && <DeleteModals setDeleteModal = {setShowModal}/>}
    </div>
  )
}

export default CourseDetailsSection
