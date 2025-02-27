import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import ModalBackground from './ModalBackground'
import { Strings } from '../constants/Strings'
import { PATH_COURSES } from '../constants/RouteConstants'
import { deleteCourse, deleteLesson, deleteModule } from '../Redux/Slice/CoursesSlice'

const DeleteModals = ({ setDeleteModal, type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCancel = () => {
    setDeleteModal(false)
  }

  const handleDeleteModule = () => {
    dispatch(deleteModule())
    setDeleteModal(false)
  }

  const handleDeleteLesson = () => {
    dispatch(deleteLesson())
    setDeleteModal(false)
  }
  const handleDeleteCourse = () => {
    dispatch(deleteCourse())
    navigate(PATH_COURSES, { replace: true })
    setDeleteModal(false)
  }

  return (
    <>
      <ModalBackground>
        {type === 'module' && (
          <div className=" mt-2 ">
            <h1 className="font-bold text-xl text-center mb-3">{Strings.confirmDelete}</h1>
            <h1 className="text-center text-gray-500">Deleting this module will permanently remove all module data.</h1>
            <div className="text-center">
              <button className="btn-secondary" onClick={handleCancel}>
                {Strings.cancel}
              </button>
              <button className="btn-primary bg-custom-green" onClick={handleDeleteModule}>
                {Strings.confirm}
              </button>
            </div>
          </div>
        )}
        {type === 'lesson' && (
          <div className=" mt-2 ">
            <h1 className="font-bold text-xl text-center mb-3">{Strings.confirmDelete}</h1>
            <h1 className="text-center text-gray-500">Deleting this lesson will permanently remove all lesson data.</h1>
            <div className="text-center">
              <button className="btn-secondary" onClick={handleCancel}>
                {Strings.cancel}
              </button>
              <button className="btn-primary bg-custom-green" onClick={handleDeleteLesson}>
                {Strings.confirm}
              </button>
            </div>
          </div>
        )}
        {type === 'course' && (
          <div className=" mt-2 ">
            <h1 className="font-bold text-xl text-center mb-3">{Strings.confirmDelete}</h1>
            <h1 className="text-center text-gray-500">
              Deleting this course will permanently remove all course data and unassign it from all users.
            </h1>
            <div className="text-center">
              <button className="btn-secondary" onClick={handleCancel}>
                {Strings.cancel}
              </button>
              <button className="btn-primary bg-custom-green" onClick={handleDeleteCourse}>
                {Strings.confirm}
              </button>
            </div>
          </div>
        )}
      </ModalBackground>
    </>
  )
}

DeleteModals.propTypes = {
  setDeleteModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default DeleteModals
