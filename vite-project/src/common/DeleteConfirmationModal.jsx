import PropTypes from 'prop-types'
import { Strings } from '../constants/Strings'

const DeleteConfirmationModal = ({ handleDelete, message, handleCancel }) => {
  return (
    <>
      <div className=" mt-2 ">
        <h1 className="font-bold text-xl text-center mb-3">{Strings.confirmDelete}</h1>
        <h1 className="text-center text-gray-500">{message}</h1>
        <div className="text-center">
          <button className="btn-secondary" onClick={handleCancel}>
            {Strings.cancel}
          </button>
          <button className="btn-primary bg-custom-green" onClick={handleDelete}>
            {Strings.confirm}
          </button>
        </div>
      </div>
    </>
  )
}

DeleteConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default DeleteConfirmationModal
