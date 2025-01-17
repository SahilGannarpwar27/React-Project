/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { setShowModal } from '../../../../Redux/Slice/CoursesSlice';

const ModuleList = ({ module }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setShowModal());

  }
  const handleDelete = () => {

  }
  return (
    <li className="flex items-center">
      <span className="mr-2">{module.module_name}</span>
      <img src="/Skillsync-img/edit-module.svg" alt="edit-module" className="size-4 mr-2 cursor-pointer" onClick={handleEdit} />
      <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4 cursor-pointer" onClick={handleDelete} />
    </li>
  )
}

export default ModuleList
