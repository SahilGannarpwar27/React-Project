import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import ModalBackground from './ModalBackground'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { ModalStrings } from '../constants/ModalStrings'
import { PATH_COURSES } from '../constants/RouteConstants'
import { DeleteModalData } from '../constants/DeleteModalData'
import { deleteCourse, deleteLesson, deleteModule, setShowModal } from '../Redux/Slice/CoursesSlice'

const DeleteModals = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showModalType = useSelector((state) => state?.courses?.showModalType)

  const handleCancel = () => {
    dispatch(setShowModal(''))
  }

  const deleteHandlers = {
    [ModalStrings.deleteModule]: () => {
      dispatch(deleteModule())
      dispatch(setShowModal(''))
    },
    [ModalStrings.deleteLesson]: () => {
      dispatch(deleteLesson())
      dispatch(setShowModal(''))
    },
    [ModalStrings.deleteCourse]: () => {
      dispatch(deleteCourse())
      navigate(PATH_COURSES, { replace: true })
      dispatch(setShowModal(''))
    },
  }

  const showModalData = DeleteModalData[showModalType]
  const ModalDeleteFunction = deleteHandlers[showModalType]
  return (
    <>
      <ModalBackground>
        {showModalData && (
          <DeleteConfirmationModal
            message={showModalData.message}
            handleCancel={handleCancel}
            handleDelete={ModalDeleteFunction}
          />
        )}
      </ModalBackground>
    </>
  )
}

export default DeleteModals
