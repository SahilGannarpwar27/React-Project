import { useDispatch, useSelector } from 'react-redux'
import ModuleList from './ModuleList'
import { addModule, setCurrentModule, setShowModal } from '../../../../Redux/Slice/CoursesSlice'

const ModuleInfo = () => {
  const currentCourse = useSelector((state) => state.courses.currentCourse)
  const currentModule = useSelector((state) => state.courses.currentModule)
  const dispatch = useDispatch()

  const handleAddModule = () => {
    if (currentCourse) {
      dispatch(addModule()) // Pass courseTitle only
    }
  }
  const handleEdit = () => {
    dispatch(setShowModal())
  }

  const handleDelete = () => {}

  const handleModuleClick = (module) => {
    dispatch(setCurrentModule(module))
  }
  console.log(currentCourse)

  return (
    <div className="flex space-x-8 border-b border-gray-500">
      <ul className="flex space-x-8 pb-2 overflow-x-auto min-w-0 scrollbar-hide">
        {currentCourse.modules.map((module) => (
          <li
            className={`flex items-center cursor-pointer ${module.module_id === currentModule.module_id && 'bg-green-200'}`}
            key={module.module_id}
            onClick={() => handleModuleClick(module)}
          >
            <span className="mr-2">{module.module_name}</span>
            <img
              src="/Skillsync-img/edit-module.svg"
              alt="edit-module"
              className="size-4 mr-2 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
              onClick={handleEdit}
            />
            <img
              src="/Skillsync-img/trash-icon.svg"
              alt="trash-icon"
              className="size-4 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
              onClick={handleDelete}
            />
          </li>
        ))}
        {/* {currentCourse.modules.map((module) => (
          <ModuleList courseUsing={currentCourse} key={module.module_id} module={module} />
        ))} */}
      </ul>
      <p className="flex items-center pb-1 cursor-pointer" onClick={handleAddModule}>
        <img src="/Skillsync-img/add-training.svg" alt="add-training" className="mr-2" />
        <span>Add</span>
      </p>
    </div>
  )
}

export default ModuleInfo
